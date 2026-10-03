const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

// -------------------------------------------------------------
// Конфігурація (токен бота, chat_id, логін/пароль адмінки)
// -------------------------------------------------------------
let config;
try {
    config = require('./config');
} catch (e) {
    console.warn('⚠ Файл config.js не знайдено. Скопіюй config.example.js у config.js і заповни своїми даними.');
    config = require('./config.example');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Rate-limiting нижче рахує запити по req.ip. Якщо сайт стоїть за
// реверс-проксі/балансувальником (nginx, Render, Railway тощо),
// без цього рядка всі відвідувачі бачитимуться сервером як одна й та
// сама IP (проксі), і ліміт спрацює на всіх одразу від дій одного
// зловмисника. Розкоментуй, якщо деплоїш за проксі:
// app.set('trust proxy', 1);

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' })); // публічним формам не потрібні великі тіла
app.use(express.static('public'));

// -------------------------------------------------------------
// Rate limiting — захист від спаму запитів з однієї IP.
// Просте рішення на Map в пам'яті процесу: для одного невеликого
// магазину на одному сервері цього достатньо і не додає залежностей.
// Якщо колись буде кілька інстансів сервера за балансувальником —
// варто перенести це на Redis, але для одного процесу воно й не потрібне.
// -------------------------------------------------------------
function createHitCounter({ windowMs, max }) {
    const hits = new Map(); // ключ (IP) -> масив таймстемпів спроб

    // Періодично прибираємо застарілі записи, щоб Map не росла вічно
    const cleanupTimer = setInterval(() => {
        const now = Date.now();
        for (const [key, timestamps] of hits) {
            const fresh = timestamps.filter(t => now - t < windowMs);
            if (fresh.length) hits.set(key, fresh);
            else hits.delete(key);
        }
    }, windowMs);
    cleanupTimer.unref(); // не тримає процес живим заради самого таймера

    return {
        // Скільки секунд лишилось до розблокування (0, якщо ще не заблоковано)
        isLimited(key) {
            const now = Date.now();
            const timestamps = (hits.get(key) || []).filter(t => now - t < windowMs);
            hits.set(key, timestamps);
            return timestamps.length >= max;
        },
        // Зафіксувати спробу (виклик рахується в ліміт)
        hit(key) {
            const now = Date.now();
            const timestamps = (hits.get(key) || []).filter(t => now - t < windowMs);
            timestamps.push(now);
            hits.set(key, timestamps);
        },
        retryAfterSeconds(key) {
            const timestamps = hits.get(key) || [];
            if (!timestamps.length) return 0;
            return Math.max(0, Math.ceil((timestamps[0] + windowMs - Date.now()) / 1000));
        },
    };
}

// Ліміт на відправку форм (замовлення + Trade-In): 10 спроб / 10 хв з однієї IP.
// Рахуємо кожну спробу (навіть невалідну), щоб і флуд сміттям теж гасився.
const formSubmitLimiter = createHitCounter({ windowMs: 10 * 60 * 1000, max: 10 });

function rateLimitForms(req, res, next) {
    const key = req.ip;
    if (formSubmitLimiter.isLimited(key)) {
        res.set('Retry-After', String(formSubmitLimiter.retryAfterSeconds(key)));
        return res.status(429).json({
            success: false,
            message: 'Забагато запитів. Спробуйте ще раз через кілька хвилин.',
        });
    }
    formSubmitLimiter.hit(key);
    next();
}

// Ліміт на НЕВДАЛІ спроби входу в адмінку: 10 спроб / 15 хв з однієї IP.
// Рахуємо тільки провалені спроби, тому звичайне користування адмінкою
// (яка сама опитує сервер раз на 30 сек) ніколи не впирається в ліміт.
const adminAuthLimiter = createHitCounter({ windowMs: 15 * 60 * 1000, max: 10 });

// Ініціалізація бази даних (файл shop.db створиться сам)
const db = new sqlite3.Database('./shop.db', (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Успішно підключено до бази даних SQLite.');
    }
});

// -------------------------------------------------------------
// Створення таблиць + міграція (додаємо processed, якщо його ще нема)
// -------------------------------------------------------------
function ensureColumn(table, column, definition) {
    db.all(`PRAGMA table_info(${table})`, [], (err, rows) => {
        if (err) return console.error(`Помилка перевірки колонок ${table}:`, err.message);
        const exists = rows.some(r => r.name === column);
        if (!exists) {
            db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (alterErr) => {
                if (alterErr) console.error(`Помилка додавання колонки ${column} в ${table}:`, alterErr.message);
                else console.log(`[БД] Додано колонку "${column}" у таблицю "${table}".`);
            });
        }
    });
}

db.serialize(() => {
    // Таблиця для звичайних замовлень з каталогу
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        model TEXT,
        price TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Таблиця для заявок Trade-In
    db.run(`CREATE TABLE IF NOT EXISTS tradeins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        give_model TEXT,
        get_model TEXT,
        topup TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Міграція: позначка "оброблено" для адмінки (0 = нова, 1 = оброблена)
    ensureColumn('orders', 'processed', 'INTEGER DEFAULT 0');
    ensureColumn('tradeins', 'processed', 'INTEGER DEFAULT 0');
});

// -------------------------------------------------------------
// Telegram-сповіщення
// -------------------------------------------------------------
function sendTelegramMessage(text) {
    const token = config.TELEGRAM_BOT_TOKEN;
    const chatId = config.TELEGRAM_CHAT_ID;

    if (!token || token.includes('PASTE_YOUR') || !chatId || String(chatId).includes('PASTE_YOUR')) {
        console.warn('⚠ Telegram не налаштований (заповни config.js) — сповіщення не надіслано.');
        return;
    }

    const payload = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
    });

    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
        },
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
            if (res.statusCode !== 200) {
                console.error('Telegram API помилка:', res.statusCode, body);
            }
        });
    });

    req.on('error', (err) => {
        console.error('Помилка надсилання в Telegram:', err.message);
    });

    req.write(payload);
    req.end();
}

function escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// -------------------------------------------------------------
// Валідація вхідних даних (та сама логіка, що й у фронтенді,
// але тепер обов'язкова — бекенд ніколи не довіряє клієнту)
// -------------------------------------------------------------
const PHONE_REGEX = /^\+380\d{9}$/;

// ПІБ: мінімум 2 слова (прізвище + ім'я), без порожніх токенів
function isValidName(name) {
    if (typeof name !== 'string') return false;
    const words = name.trim().split(/\s+/).filter(Boolean);
    return words.length >= 2 && name.trim().length <= 100;
}

// Телефон: +380 і рівно 9 цифр після нього
function isValidPhone(phone) {
    return typeof phone === 'string' && PHONE_REGEX.test(phone.trim());
}

// Будь-яке інше обов'язкове текстове поле (модель, ціна тощо) —
// не порожнє, не аномально довге (захист від сміттєвих запитів)
function isValidText(value, maxLen = 300) {
    return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLen;
}

// Перевіряє список полів запиту за схемою { поле: 'name'|'phone'|'text' }
// Повертає масив помилок людською мовою (порожній масив = все ок)
function validateFields(body, schema) {
    const errors = [];
    for (const [field, kind] of Object.entries(schema)) {
        const value = body[field];
        const ok = kind === 'name' ? isValidName(value)
                 : kind === 'phone' ? isValidPhone(value)
                 : isValidText(value);
        if (!ok) errors.push(field);
    }
    return errors;
}

// -------------------------------------------------------------
// Ендпоінт для збереження покупок з каталогу
// -------------------------------------------------------------
app.post('/api/order', rateLimitForms, (req, res) => {
    const { name, phone, model, price } = req.body || {};

    const invalidFields = validateFields(req.body || {}, {
        name: 'name',
        phone: 'phone',
        model: 'text',
        price: 'text',
    });

    if (invalidFields.length) {
        return res.status(400).json({
            success: false,
            message: 'Некоректні дані замовлення.',
            fields: invalidFields,
        });
    }

    const cleanName  = name.trim();
    const cleanPhone = phone.trim();
    const cleanModel = model.trim();
    const cleanPrice = price.trim();

    const sql = `INSERT INTO orders (name, phone, model, price) VALUES (?, ?, ?, ?)`;
    db.run(sql, [cleanName, cleanPhone, cleanModel, cleanPrice], function (err) {
        if (err) {
            console.error('Помилка запису замовлення:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Замовлення №${this.lastID} від ${cleanPhone} збережено!`);

        sendTelegramMessage(
            `🛒 <b>Нове замовлення №${this.lastID}</b>\n` +
            `👤 Ім'я: ${escapeHtml(cleanName)}\n` +
            `📞 Телефон: ${escapeHtml(cleanPhone)}\n` +
            `📱 Модель: ${escapeHtml(cleanModel)}\n` +
            `💰 Ціна: ${escapeHtml(cleanPrice)}`
        );

        res.json({ success: true, message: "Замовлення успішно записано в БД!" });
    });
});

// -------------------------------------------------------------
// Ендпоінт для збереження заявок Trade-In
// -------------------------------------------------------------
app.post('/api/trade-in', rateLimitForms, (req, res) => {
    const { name, phone, giveModel, getModel, topup } = req.body || {};

    const invalidFields = validateFields(req.body || {}, {
        name: 'name',
        phone: 'phone',
        giveModel: 'text',
        getModel: 'text',
        topup: 'text',
    });

    if (invalidFields.length) {
        return res.status(400).json({
            success: false,
            message: 'Некоректні дані заявки Trade-In.',
            fields: invalidFields,
        });
    }

    const cleanName      = name.trim();
    const cleanPhone     = phone.trim();
    const cleanGiveModel = giveModel.trim();
    const cleanGetModel  = getModel.trim();
    const cleanTopup     = topup.trim();

    const sql = `INSERT INTO tradeins (name, phone, give_model, get_model, topup) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [cleanName, cleanPhone, cleanGiveModel, cleanGetModel, cleanTopup], function (err) {
        if (err) {
            console.error('Помилка запису Trade-In:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Заявка Trade-In №${this.lastID} від ${cleanPhone} збережена!`);

        sendTelegramMessage(
            `🔄 <b>Нова заявка Trade-In №${this.lastID}</b>\n` +
            `👤 Ім'я: ${escapeHtml(cleanName)}\n` +
            `📞 Телефон: ${escapeHtml(cleanPhone)}\n` +
            `📤 Здає: ${escapeHtml(cleanGiveModel)}\n` +
            `📥 Хоче отримати: ${escapeHtml(cleanGetModel)}\n` +
            `💰 Доплата: ${escapeHtml(cleanTopup)}`
        );

        res.json({ success: true, message: "Обмін успішно записано в БД!" });
    });
});

// -------------------------------------------------------------
// АДМІНКА — захист
//
// Шари захисту (від зовнішнього до внутрішнього):
//  1. Логін/пароль (HTTP Basic Auth) + ліміт невдалих спроб,
//     порівняння у постійний час (без витоку через таймінг).
//  2. Захист від CSRF: Basic Auth браузер прикріплює автоматично,
//     тому шкідливий сайт міг би «від імені адміна» очистити базу.
//     Тепер кожен POST мусить мати той самий origin І секретний
//     токен, який отримує лише сторінка адмінки.
//  3. Content-Security-Policy зі скриптами тільки за nonce: навіть
//     якщо в таблицю якось потрапить чужий HTML, браузер його
//     не виконає. Плюс дані екрануються на виході (admin.html).
//  4. Заголовки: no-store, заборона iframe, nosniff тощо.
// -------------------------------------------------------------

// Порівняння рядків у постійний час (через хеші однакової довжини)
function safeEqual(a, b) {
    const ha = crypto.createHash('sha256').update(String(a)).digest();
    const hb = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(ha, hb);
}

// Заглушки з config.example.js не вважаємо паролем
const PLACEHOLDER_PASSWORDS = ['', 'change_me', 'change_me_now', 'PASTE_YOUR_PASSWORD_HERE', 'admin', 'password', '12345678'];
const adminConfigured =
    typeof config.ADMIN_USERNAME === 'string' && config.ADMIN_USERNAME.length > 0 &&
    typeof config.ADMIN_PASSWORD === 'string' &&
    !PLACEHOLDER_PASSWORDS.includes(config.ADMIN_PASSWORD);

if (!adminConfigured) {
    console.warn('⚠ Адмінку ВИМКНЕНО: у config.js не задано власний ADMIN_PASSWORD (або лишилась заглушка).');
} else if (config.ADMIN_PASSWORD.length < 10) {
    console.warn('⚠ ADMIN_PASSWORD коротший за 10 символів — краще довша фраза.');
}

// Секретний токен проти CSRF: новий на кожен запуск сервера.
// Віддається ТІЛЬКИ в HTML сторінки /admin (після логіну); чужий
// сайт прочитати цю відповідь не може (same-origin policy).
const CSRF_TOKEN = crypto.randomBytes(32).toString('hex');

function adminSecurityHeaders(req, res, next) {
    res.set({
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Cross-Origin-Resource-Policy': 'same-origin',
    });
    next();
}

function requireAdminAuth(req, res, next) {
    if (!adminConfigured) {
        return res.status(503).send('Адмінку вимкнено: задай власний ADMIN_PASSWORD у config.js і перезапусти сервер.');
    }

    const ip = req.ip;

    if (adminAuthLimiter.isLimited(ip)) {
        res.set('Retry-After', String(adminAuthLimiter.retryAfterSeconds(ip)));
        return res.status(429).json({
            success: false,
            message: 'Забагато невдалих спроб входу. Спробуйте через 15 хвилин.',
        });
    }

    const header = req.headers.authorization || '';
    const [scheme, encoded] = header.split(' ');

    if (scheme === 'Basic' && encoded) {
        const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
        const sepIndex = decoded.indexOf(':');
        if (sepIndex >= 0) {
            const userOk = safeEqual(decoded.slice(0, sepIndex), config.ADMIN_USERNAME);
            const passOk = safeEqual(decoded.slice(sepIndex + 1), config.ADMIN_PASSWORD);
            if (userOk && passOk) return next();
        }
    }

    // Рахуємо в ліміт тільки невдалу спробу — правильний логін ніколи сюди не доходить
    adminAuthLimiter.hit(ip);

    res.set('WWW-Authenticate', 'Basic realm="AppleX Admin"');
    res.status(401).send('Потрібна авторизація для доступу до адмінки.');
}

// CSRF: всі «змінюючі» запити до адмінки
function csrfProtect(req, res, next) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

    const reject = (why) => {
        console.warn(`[CSRF] відхилено (${why}): ${req.method} ${req.originalUrl}`);
        return res.status(403).json({
            success: false,
            message: 'Запит відхилено (захист CSRF). Оновіть сторінку адмінки та спробуйте ще раз.',
        });
    };

    // 1) Сучасні браузери самі повідомляють, звідки прийшов запит
    const site = req.get('sec-fetch-site');
    if (site && site !== 'same-origin' && site !== 'none') return reject(`sec-fetch-site=${site}`);

    // 2) Origin має збігатися з нашим хостом (порівнюємо тільки host,
    //    щоб не ламатись за HTTPS-проксі, де схема всередині інша)
    const origin = req.get('origin');
    if (origin) {
        let originHost;
        try { originHost = new URL(origin).host; } catch { return reject('некоректний Origin'); }
        if (originHost !== req.get('host')) return reject(`Origin=${origin}`);
    }

    // 3) Секретний токен зі сторінки адмінки
    if (!safeEqual(req.get('x-csrf-token') || '', CSRF_TOKEN)) return reject('невірний токен');

    next();
}

// Захищаємо всі маршрути адмінки (порядок важливий: спершу логін)
app.use(['/admin', '/api/admin'], adminSecurityHeaders, requireAdminAuth);
app.use('/api/admin', csrfProtect);

// Сторінка адмінки: підставляємо nonce для CSP і токен CSRF
app.get('/admin', (req, res) => {
    fs.readFile(path.join(__dirname, 'admin', 'admin.html'), 'utf8', (err, html) => {
        if (err) return res.status(500).send('Не вдалося завантажити адмінку.');
        const nonce = crypto.randomBytes(16).toString('base64');
        res.set({
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Security-Policy': [
                "default-src 'none'",
                `script-src 'nonce-${nonce}'`,
                `style-src 'nonce-${nonce}'`,
                "connect-src 'self'",
                "img-src 'self' data:",
                "base-uri 'none'",
                "form-action 'none'",
                "frame-ancestors 'none'",
            ].join('; '),
        });
        res.send(html.split('__CSP_NONCE__').join(nonce).split('__CSRF_TOKEN__').join(CSRF_TOKEN));
    });
});

// Допустимі таблиці для спільних ендпоінтів (білий список — у SQL
// підставляється ТІЛЬКИ значення звідси, ніколи рядок із запиту)
const ADMIN_TABLES = { orders: 'orders', tradeins: 'tradeins' };

function resolveTable(req, res, next) {
    const table = ADMIN_TABLES[req.params.kind];
    if (!table) return res.status(404).json({ success: false, message: 'Не знайдено' });
    req.table = table;
    next();
}

// Список замовлень / заявок Trade-In
app.get('/api/admin/:kind', resolveTable, (req, res) => {
    db.all(`SELECT * FROM ${req.table} ORDER BY created_at DESC, id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: 'Помилка БД' });
        res.json({ success: true, data: rows });
    });
});

// Перемкнути статус «оброблено»
app.post('/api/admin/:kind/:id/toggle', resolveTable, (req, res) => {
    if (!/^\d{1,12}$/.test(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Некоректний id' });
    }
    const id = Number(req.params.id);
    db.run(`UPDATE ${req.table} SET processed = CASE WHEN processed = 1 THEN 0 ELSE 1 END WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ success: false, message: 'Помилка БД' });
        if (this.changes === 0) return res.status(404).json({ success: false, message: 'Не знайдено' });
        db.get(`SELECT processed FROM ${req.table} WHERE id = ?`, [id], (getErr, row) => {
            if (getErr || !row) return res.status(500).json({ success: false, message: 'Помилка БД' });
            res.json({ success: true, processed: row.processed });
        });
    });
});

// Очистити всі записи таблиці
app.post('/api/admin/:kind/clear', resolveTable, (req, res) => {
    db.run(`DELETE FROM ${req.table}`, [], (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Помилка БД' });
        console.log(`[БД] Таблицю "${req.table}" очищено через адмінку.`);
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер AppleX працює на http://localhost:${PORT}`);
    console.log(`Адмінка доступна на http://localhost:${PORT}/admin`);
});

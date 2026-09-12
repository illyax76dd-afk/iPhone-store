const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const https = require('https');

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

app.use(express.json());
app.use(express.static('public'));

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
// Ендпоінт для збереження покупок з каталогу
// -------------------------------------------------------------
app.post('/api/order', (req, res) => {
    const { name, phone, model, price } = req.body;

    const sql = `INSERT INTO orders (name, phone, model, price) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, phone, model, price], function (err) {
        if (err) {
            console.error('Помилка запису замовлення:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Замовлення №${this.lastID} від ${phone} збережено!`);

        sendTelegramMessage(
            `🛒 <b>Нове замовлення №${this.lastID}</b>\n` +
            `👤 Ім'я: ${escapeHtml(name)}\n` +
            `📞 Телефон: ${escapeHtml(phone)}\n` +
            `📱 Модель: ${escapeHtml(model)}\n` +
            `💰 Ціна: ${escapeHtml(price)}`
        );

        res.json({ success: true, message: "Замовлення успішно записано в БД!" });
    });
});

// -------------------------------------------------------------
// Ендпоінт для збереження заявок Trade-In
// -------------------------------------------------------------
app.post('/api/trade-in', (req, res) => {
    const { name, phone, giveModel, getModel, topup } = req.body;

    const sql = `INSERT INTO tradeins (name, phone, give_model, get_model, topup) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, phone, giveModel, getModel, topup], function (err) {
        if (err) {
            console.error('Помилка запису Trade-In:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Заявка Trade-In №${this.lastID} від ${phone} збережена!`);

        sendTelegramMessage(
            `🔄 <b>Нова заявка Trade-In №${this.lastID}</b>\n` +
            `👤 Ім'я: ${escapeHtml(name)}\n` +
            `📞 Телефон: ${escapeHtml(phone)}\n` +
            `📤 Здає: ${escapeHtml(giveModel)}\n` +
            `📥 Хоче отримати: ${escapeHtml(getModel)}\n` +
            `💰 Доплата: ${escapeHtml(topup)}`
        );

        res.json({ success: true, message: "Обмін успішно записано в БД!" });
    });
});

// -------------------------------------------------------------
// АДМІНКА — захист логіном/паролем (HTTP Basic Auth)
// -------------------------------------------------------------
function requireAdminAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const [scheme, encoded] = header.split(' ');

    if (scheme === 'Basic' && encoded) {
        const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
        const sepIndex = decoded.indexOf(':');
        const user = decoded.slice(0, sepIndex);
        const pass = decoded.slice(sepIndex + 1);

        if (user === config.ADMIN_USERNAME && pass === config.ADMIN_PASSWORD) {
            return next();
        }
    }

    res.set('WWW-Authenticate', 'Basic realm="AppleX Admin"');
    res.status(401).send('Потрібна авторизація для доступу до адмінки.');
}

// Захищаємо всі маршрути адмінки одним middleware
app.use('/admin', requireAdminAuth);
app.use('/api/admin', requireAdminAuth);

// Сама сторінка адмінки (public-html/admin.html, окремо від публічного каталогу)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Список замовлень
app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: 'Помилка БД' });
        res.json({ success: true, data: rows });
    });
});

// Список заявок Trade-In
app.get('/api/admin/tradeins', (req, res) => {
    db.all(`SELECT * FROM tradeins ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: 'Помилка БД' });
        res.json({ success: true, data: rows });
    });
});

// Перемкнути статус "оброблено" для замовлення
app.post('/api/admin/orders/:id/toggle', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT processed FROM orders WHERE id = ?`, [id], (err, row) => {
        if (err || !row) return res.status(404).json({ success: false, message: 'Не знайдено' });
        const newVal = row.processed ? 0 : 1;
        db.run(`UPDATE orders SET processed = ? WHERE id = ?`, [newVal, id], (updErr) => {
            if (updErr) return res.status(500).json({ success: false, message: 'Помилка БД' });
            res.json({ success: true, processed: newVal });
        });
    });
});

// Перемкнути статус "оброблено" для Trade-In заявки
app.post('/api/admin/tradeins/:id/toggle', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT processed FROM tradeins WHERE id = ?`, [id], (err, row) => {
        if (err || !row) return res.status(404).json({ success: false, message: 'Не знайдено' });
        const newVal = row.processed ? 0 : 1;
        db.run(`UPDATE tradeins SET processed = ? WHERE id = ?`, [newVal, id], (updErr) => {
            if (updErr) return res.status(500).json({ success: false, message: 'Помилка БД' });
            res.json({ success: true, processed: newVal });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер AppleX працює на http://localhost:${PORT}`);
    console.log(`Адмінка доступна на http://localhost:${PORT}/admin`);
});

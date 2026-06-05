const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
// Переконайтеся, що ваші HTML файли лежать у папці public
app.use(express.static('public')); 

// Ініціалізація бази даних (файл shop.db створиться сам)
const db = new sqlite3.Database('./shop.db', (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Успішно підключено до бази даних SQLite.');
    }
});

// Створення таблиць, якщо вони ще не створені
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
});

// Ендпоінт для збереження покупок з каталогу
app.post('/api/order', (req, res) => {
    const { name, phone, model, price } = req.body;
    
    const sql = `INSERT INTO orders (name, phone, model, price) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, phone, model, price], function(err) {
        if (err) {
            console.error('Помилка запису замовлення:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Замовлення №${this.lastID} від ${phone} збережено!`);
        res.json({ success: true, message: "Замовлення успішно записано в БД!" });
    });
});

// Ендпоінт для збереження заявок Trade-In
app.post('/api/trade-in', (req, res) => {
    const { name, phone, giveModel, getModel, topup } = req.body;
    
    const sql = `INSERT INTO tradeins (name, phone, give_model, get_model, topup) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, phone, giveModel, getModel, topup], function(err) {
        if (err) {
            console.error('Помилка запису Trade-In:', err.message);
            return res.status(500).json({ success: false, message: "Помилка БД" });
        }
        console.log(`[БД] Заявка Trade-In №${this.lastID} від ${phone} збережена!`);
        res.json({ success: true, message: "Обмін успішно записано в БД!" });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер iFranko працює на http://localhost:${PORT}`);
});
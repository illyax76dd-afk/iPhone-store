const express = require('express');
const app = express();
const PORT = 3000;

// Дозволяємо серверу читати JSON з фронтенду
app.use(express.json());
// Роздаємо ваші статичні файли (html, css, js) з папки public
app.use(express.static('public'));

// Ендпоінт для отримання заявок на покупку
app.post('/api/order', (req, res) => {
    const { name, phone, model, price } = req.body;
    console.log(`Нове замовлення! Ім'я: ${name}, Тел: ${phone}, Модель: ${model}, Ціна: ${price}`);
    res.json({ success: true, message: "Замовлення прийнято!" });
});

// Ендпоінт для Trade-In заявок
app.post('/api/trade-in', (req, res) => {
    const { name, phone, giveModel, getModel, topup } = req.body;
    console.log(`Новий Trade-In! Віддає: ${giveModel}, Хоче: ${getModel}, Доплата: ${topup}`);
    res.json({ success: true, message: "Заявку на обмін прийнято!" });
});

app.listen(PORT, () => {
    console.log(`Сервер iFranko працює на http://localhost:${PORT}`);
});
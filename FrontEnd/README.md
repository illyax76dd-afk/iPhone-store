# iFranko — Vanilla HTML/CSS/JS

Це статична версія сайту магазину iPhone без React і TypeScript.

## Що є
- `index.html` — головна
- `catalog.html` — каталог з фільтром **Стан**
- `trade-in.html` — сторінка Trade-In
- `styles.css` — спільні стилі
- `script.js` — фільтри, параметри URL і Trade-In калькулятор

## Логіка
- Кнопка **Нові iPhone** відкриває `catalog.html?status=new`
- Кнопка **Вживані (Б/У)** відкриває `catalog.html?status=used`
- Кнопка **Оцінити Trade-In** веде на сторінку Trade-In
- У каталозі є фільтр **Стан**: `Новий` / `Вживаний (Б/У)`

## Запуск
Відкрий `index.html` у браузері або запусти через будь-який local server.

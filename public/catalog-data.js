// =============================================================
// AppleX — catalog-data.js
//
// ЄДИНЕ ДЖЕРЕЛО ПРАВДИ по товарах: модель, пам'ять, колір, ціна,
// стан, рік, фото, характеристики, описи.
//
// І каталог (script.js), і Trade-In (trade-in.html) підключають
// цей файл ПЕРШИМ і читають дані звідси. Раніше в них було по
// окремій копії цих даних (PRODUCTS у script.js та MODELS у
// trade-in.html) з різними цінами для однакових моделей — це і
// виправлено винесенням усього сюди.
//
// Єдине, що лишається "своїм" дл Trade-In — TRADE_IN_BUYBACK_BASE
// нижче: це не ціна продажу, а окрема бізнес-величина (скільки
// магазин платить за викуп старого телефону), її нізвідки більше
// не вивести.
// =============================================================

// -------------------------------------------------------------
// ЗОБРАЖЕННЯ МОДЕЛЕЙ (GSMArena CDN — офіційні прес-фото)
// Використовуються в каталозі та Trade-In
// -------------------------------------------------------------
const MODEL_IMAGES = {
  // iPhone Duo
  "iPhone Duo": "img/duo.png",
  // iPhone 18 серія
  "iPhone 18 Pro Max": "img/18-pro-max.png",
  "iPhone 18 Pro": "img/18-pro.png",
  // iPhone 17 серія
  "iPhone 17 Pro Max": "img/17-pro-max.jpg",
  "iPhone 17 Pro": "img/17-pro.jpg",
  "iPhone 17 Air": "img/17-air.jpg",
  "iPhone 17": "img/17.jpg",
  // iPhone 16 серія
  "iPhone 16 Pro Max": "img/16-pro-max.jpg",
  "iPhone 16 Pro": "img/16-pro.jpg",
  "iPhone 16 Plus": "img/16-plus.jpg",
  "iPhone 16": "img/16.jpg",
  // iPhone 15 серія
  "iPhone 15 Pro Max": "img/15-pro-max.jpg",
  "iPhone 15 Pro": "img/15-pro.jpg",
  "iPhone 15 Plus": "img/15-plus.jpg",
  "iPhone 15": "img/15.jpg",
  // iPhone 14 серія
  "iPhone 14 Pro": "img/14-pro.jpg",
  "iPhone 14": "img/14.jpg",
  // iPhone 13 серія
  "iPhone 13 Pro": "img/13-pro.jpg",
  "iPhone 13": "img/13.jpg",
  // iPhone 12 серія
  "iPhone 12 Pro": "img/12-pro.jpg",
  "iPhone 12": "img/12.jpg",
  // інші моделі
  "iPhone 11": "img/11.jpg",
  "iPhone 17e": "img/17e.jpg",
  "iPhone SE 2022": "img/se-2022.jpg",
};

// -------------------------------------------------------------
// КАТАЛОГ ТОВАРІВ
// condition: "Новий" або "Вживаний (Б/У)"
// -------------------------------------------------------------
const PRODUCTS = [
  // ── iPhone Duo серія (2026) ──────────────────────────────────
    {
    id: 38,
    model: "iPhone Duo",
    storage: "2 TB",
    color: "Night Sky",
    price: 187999,
    condition: "Новий",
    year: 2026,
    sim: "eSIM",
    accent: "#c4c4ce"
  },
    // ── iPhone 18 серія (2026) ──────────────────────────────────
  {
    id: 36,
    model: "iPhone 18 Pro Max",
    storage: "1 TB",
    color: "Burgundy",
    price: 123999,
    condition: "Новий",
    year: 2026,
    sim: "eSIM",
    accent: "#c4c4ce"
  },
  {
    id: 37,
    model: "iPhone 18 Pro",
    storage: "1 TB",
    color: "Glacier Blue",
    price: 117999,
    condition: "Новий",
    year: 2026,
    sim: "eSIM",
    accent: "#c4c4ce"
  },
   // ── iPhone 17 серія (2025) ──────────────────────────────────
  {
    id: 17,
    model: "iPhone 17 Pro Max",
    storage: "1 TB",
    color: "Silver",
    price: 91999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#c4c4ce"
  },
  {
    id: 18,
    model: "iPhone 17 Pro Max",
    storage: "512 GB",
    color: "Deep Blue",
    price: 81999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#0d2d52"
  },
  {
    id: 26,
    model: "iPhone 17 Pro",
    storage: "256 GB",
    color: "Cosmic Orange",
    price: 61999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#c8702a"
  },
  {
    id: 20,
    model: "iPhone 17 Air",
    storage: "256 GB",
    color: "Sky Blue",
    price: 57999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#7ab8d4"
  },
  {
    id: 21,
    model: "iPhone 17",
    storage: "128 GB",
    color: "Black",
    price: 44999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#1a1a1a"
  },
  {
    id: 22,
    model: "iPhone 17",
    storage: "256 GB",
    color: "Sage",
    price: 50999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#7a9a7a"
  },
  {
    id: 30,
    model: "iPhone 17e",
    storage: "128 GB",
    color: "Black",
    price: 34999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#1a1a1a"
  },
  {
    id: 31,
    model: "iPhone 17e",
    storage: "256 GB",
    color: "Soft Pink",
    price: 40999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#e8a8a8"
  },

  // ── iPhone 16 серія (2024) ──────────────────────────────────
  {
    id: 1,
    model: "iPhone 16 Pro Max",
    storage: "256 GB",
    color: "Black Titanium",
    price: 56999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#3a3a3c"
  },
  {
    id: 2,
    model: "iPhone 16 Pro",
    storage: "128 GB",
    color: "Desert Titanium",
    price: 48999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#ffb15a"
  },
  {
    id: 3,
    model: "iPhone 16",
    storage: "128 GB",
    color: "Ultramarine",
    price: 37999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#8b5cf6"
  },
  {
    id: 32,
    model: "iPhone 16 Plus",
    storage: "128 GB",
    color: "Black",
    price: 42999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#1a1a1a"
  },
  {
    id: 33,
    model: "iPhone 16 Plus",
    storage: "256 GB",
    color: "Ultramarine",
    price: 48999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#5a6aab"
  },

  // ── iPhone 15 серія (2023) ──────────────────────────────────
  {
    id: 4,
    model: "iPhone 15 Pro Max",
    storage: "256 GB",
    color: "Natural Titanium",
    price: 44999,
    condition: "Новий",
    year: 2023,
    sim: "SIM + eSIM",
    accent: "#f59e0b"
  },
  {
    id: 5,
    model: "iPhone 15",
    storage: "128 GB",
    color: "Pink",
    price: 29999,
    condition: "Новий",
    year: 2023,
    sim: "SIM + eSIM",
    accent: "#ec4899"
  },
  {
    id: 34,
    model: "iPhone 15 Plus",
    storage: "128 GB",
    color: "Yellow",
    price: 32999,
    condition: "Новий",
    year: 2023,
    sim: "SIM + eSIM",
    accent: "#eab308"
  },
  {
    id: 35,
    model: "iPhone 15 Plus",
    storage: "256 GB",
    color: "Blue",
    price: 37999,
    condition: "Вживаний (Б/У)",
    year: 2023,
    sim: "SIM + eSIM",
    accent: "#3b82f6"
  },

  // ── iPhone 14 серія (2022) ──────────────────────────────────
  {
    id: 6,
    model: "iPhone 14",
    storage: "128 GB",
    color: "Midnight",
    price: 21999,
    condition: "Новий",
    year: 2022,
    sim: "SIM + eSIM",
    accent: "#0f766e"
  },
  {
    id: 7,
    model: "iPhone 14 Pro",
    storage: "128 GB",
    color: "Space Black",
    price: 26999,
    condition: "Вживаний (Б/У)",
    year: 2022,
    sim: "SIM + eSIM",
    accent: "#64748b"
  },
  {
    id: 8,
    model: "iPhone 14",
    storage: "256 GB",
    color: "Starlight",
    price: 25999,
    condition: "Вживаний (Б/У)",
    year: 2022,
    sim: "SIM + eSIM",
    accent: "#94a3b8"
  },

  // ── iPhone 13 серія (2021) ──────────────────────────────────
  {
    id: 9,
    model: "iPhone 13 Pro",
    storage: "128 GB",
    color: "Sierra Blue",
    price: 20999,
    condition: "Вживаний (Б/У)",
    year: 2021,
    sim: "SIM + eSIM",
    accent: "#3b82f6"
  },
  {
    id: 10,
    model: "iPhone 13",
    storage: "128 GB",
    color: "Midnight",
    price: 15999,
    condition: "Вживаний (Б/У)",
    year: 2021,
    sim: "SIM + eSIM",
    accent: "#334155"
  },

  // ── iPhone 12 серія (2020) ──────────────────────────────────
  {
    id: 11,
    model: "iPhone 12 Pro",
    storage: "128 GB",
    color: "Pacific Blue",
    price: 12999,
    condition: "Вживаний (Б/У)",
    year: 2020,
    sim: "SIM + eSIM",
    accent: "#0ea5e9"
  },
  {
    id: 12,
    model: "iPhone 12",
    storage: "64 GB",
    color: "Black",
    price: 10499,
    condition: "Вживаний (Б/У)",
    year: 2020,
    sim: "SIM + eSIM",
    accent: "#52525b"
  },

  // ── Інші моделі ─────────────────────────────────────────────
  {
    id: 13,
    model: "iPhone 11",
    storage: "64 GB",
    color: "Purple",
    price: 8499,
    condition: "Вживаний (Б/У)",
    year: 2019,
    sim: "SIM + eSIM",
    accent: "#a855f7"
  },
  {
    id: 14,
    model: "iPhone SE 2022",
    storage: "64 GB",
    color: "Red",
    price: 7999,
    condition: "Вживаний (Б/У)",
    year: 2022,
    sim: "SIM + eSIM",
    accent: "#ef4444"
  },
];

// Порядок сортування моделей у каталозі (від новіших до старших)
const modelOrder = [
  "iPhone Duo",
  "iphone 18 Pro Max", "iphone 18 Pro",
  "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17", "iPhone 17e",
  "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro", "iPhone 14",
  "iPhone 13 Pro", "iPhone 13",
  "iPhone 12 Pro", "iPhone 12",
  "iPhone 11", "iPhone SE 2022"
];
function getModelVariants(baseModel) {
  return PRODUCTS.filter(p => p.model === baseModel);
}

// Color name → CSS color
const COLOR_MAP = {
  // Neutrals / Classics
  'Black': '#1a1a1a', 'Midnight': '#1c2030', 'Space Black': '#1c1c1e',
  'Black Titanium': '#3a3a3c', 'Natural Titanium': '#b8a898',
  'White': '#f5f5f7', 'White Titanium': '#ece9e4', 'Starlight': '#d4d0c8',
  'Cloud White': '#f0ede8',

  // Silver / Gold
  'Silver': '#c4c4ce',           // iPhone 17 Pro — алюмінієве срібло
  'Desert Titanium': '#c8956c',
  'Light Gold': '#c9a87c',       // iPhone 17 Air
  'Gold': '#c9a84c', 'Graphite': '#4a4a4a',

  // Blues
  'Deep Blue': '#0d2d52',        // iPhone 17 Pro — дуже темно-синій
  'Blue': '#3b82f6', 'Ultramarine': '#4a5bab', 'Pacific Blue': '#0ea5e9',
  'Sierra Blue': '#7eb8d4', 'Sky Blue': '#7ab8d4', 'Blue Titanium': '#5b8db8',
  'Mist Blue': '#7faec2',        // iPhone 17

  // Reds / Pinks
  'Pink': '#f4a9c0', 'Product Red': '#d32f2f', 'Red': '#ef4444',
  'Soft Pink': '#eaacac',        // iPhone 17e

  // Purples
  'Lavender': '#b8a9c9',         // iPhone 17
  'Purple': '#a855f7', 'Deep Purple': '#6d28a7',

  // Greens / Teals
  'Sage': '#7a9a7a',             // iPhone 17
  'Green': '#22c55e', 'Teal': '#14b8a6',

  // Oranges / Yellows
  'Cosmic Orange': '#d4682a',    // iPhone 17 Pro / Pro Max — насичений оранж
  'Yellow': '#eab308',
};

const MODEL_COLORS = {
  // ── iPhone 18 серія (2026)
  'iPhone 18 Pro Max': ['Burgundy', 'Glacier Blue', 'Black', 'Silver'],
  'iPhone 18 Pro':     ['Burgundy', 'Glacier Blue', 'Black', 'Silver'],

  // ── iPhone 17 серія (2025–2026)
  // 3 кольори: Cosmic Orange, Deep Blue, Silver (алюмінієвий корпус)
  'iPhone 17 Pro Max': ['Cosmic Orange', 'Deep Blue', 'Silver'],
  'iPhone 17 Pro':     ['Cosmic Orange', 'Deep Blue', 'Silver'],

  // 4 кольори: Sky Blue, Light Gold, Cloud White, Space Black
  'iPhone 17 Air': ['Sky Blue', 'Light Gold', 'Cloud White', 'Space Black'],

  // 5 кольорів: Black, White, Lavender, Mist Blue, Sage
  'iPhone 17': ['Black', 'White', 'Lavender', 'Mist Blue', 'Sage'],

  // 3 кольори: Black, White, Soft Pink
  'iPhone 17e': ['Black', 'White', 'Soft Pink'],

  // ── iPhone 16 серія (2024) ──
  'iPhone 16 Pro Max': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
  'iPhone 16 Pro':     ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
  'iPhone 16 Plus':    ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 16':         ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],

  // ── iPhone 15 серія (2023) ──
  'iPhone 15 Pro Max': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Blue Titanium'],
  'iPhone 15 Pro':     ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Blue Titanium'],
  'iPhone 15 Plus':    ['Black', 'Pink', 'Yellow', 'Green', 'Blue'],
  'iPhone 15':         ['Black', 'Pink', 'Yellow', 'Green', 'Blue'],

  // ── iPhone 14 серія (2022) ──
  'iPhone 14 Pro': ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
  'iPhone 14':     ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red', 'Yellow'],

  // ── iPhone 13 серія (2021) ──
  'iPhone 13 Pro': ['Sierra Blue', 'Silver', 'Gold', 'Graphite'],
  'iPhone 13':     ['Midnight', 'Starlight', 'Blue', 'Pink', 'Green', 'Red'],

  // ── iPhone 12 серія (2020) ──
  'iPhone 12 Pro': ['Pacific Blue', 'Silver', 'Gold', 'Graphite'],
  'iPhone 12':     ['Black', 'White', 'Blue', 'Green', 'Red', 'Purple', 'Yellow'],

  // ── Старші моделі ──
  'iPhone 11':    ['Black', 'White', 'Purple', 'Yellow', 'Green', 'Red'],
  'iPhone SE 2022': ['Midnight', 'Starlight', 'Red'],
};

// All available storage options per model
const MODEL_STORAGES = {
  'iPhone 18 Pro Max': ['256 GB', '512 GB', '1 TB', '2 TB'],
  'iPhone 18 Pro': ['256 GB', '512 GB', '1 TB', '2 TB'],
  'iPhone 17 Pro Max': ['256 GB', '512 GB', '1 TB', '2 TB'],
  'iPhone 17 Pro': ['256 GB', '512 GB', '1 TB'],
  'iPhone 17 Air': ['128 GB', '256 GB', '512 GB'],
  'iPhone 17': ['128 GB', '256 GB', '512 GB'],
  'iPhone 17e': ['128 GB', '256 GB'],
  'iPhone 16 Pro Max': ['256 GB', '512 GB', '1 TB'],
  'iPhone 16 Pro': ['128 GB', '256 GB', '512 GB', '1 TB'],
  'iPhone 16 Plus': ['128 GB', '256 GB', '512 GB'],
  'iPhone 16': ['128 GB', '256 GB', '512 GB'],
  'iPhone 15 Pro Max': ['256 GB', '512 GB', '1 TB'],
  'iPhone 15 Pro': ['128 GB', '256 GB', '512 GB', '1 TB'],
  'iPhone 15 Plus': ['128 GB', '256 GB', '512 GB'],
  'iPhone 15': ['128 GB', '256 GB', '512 GB'],
  'iPhone 14 Pro': ['128 GB', '256 GB', '512 GB', '1 TB'],
  'iPhone 14': ['128 GB', '256 GB', '512 GB'],
  'iPhone 13 Pro': ['128 GB', '256 GB', '512 GB', '1 TB'],
  'iPhone 13': ['128 GB', '256 GB', '512 GB'],
  'iPhone 12 Pro': ['128 GB', '256 GB', '512 GB'],
  'iPhone 12': ['64 GB', '128 GB', '256 GB'],
  'iPhone 11': ['64 GB', '128 GB', '256 GB'],
  'iPhone SE 2022': ['64 GB', '128 GB', '256 GB'],
};

// Точні ціни (ринок України, травень 2026, ₴)
// Використовується в модалці при зміні пам'яті або SIM
const PRICE_TABLE = {

  'iPhone 18 Pro Max': {
    '256 GB': 84999,
    '512 GB': 97999,
    '1 TB':   123999,
    '2 TB':   164999,
  },
    'iPhone 18 Pro': {
    '256 GB': 77999,
    '512 GB': 90999,
    '1 TB':   117999,
    '2 TB':   157999,
  },
  'iPhone 17 Pro Max': {
    '256 GB': 71999,
    '512 GB': 81999,
    '1 TB':   91999,
    '2 TB':   101999,
  },
  'iPhone 17 Pro': {     
    '256 GB': 61999,
    '512 GB': 71999,
    '1 TB':   81999,
  },
  'iPhone 17 Air': {
    '128 GB': 51999,
    '256 GB': 57999,
    '512 GB': 66999,
  },
  'iPhone 17': {
    '128 GB': 44999,
    '256 GB': 50999,
    '512 GB': 58999,
  },
  'iPhone 17e': {
    '128 GB': 34999,
    '256 GB': 40999,
  },
  'iPhone 16 Pro Max': {
    '256 GB': 56999,
    '512 GB': 64999,
    '1 TB':   74999,
  },
  'iPhone 16 Pro': {
    '128 GB': 48999,
    '256 GB': 54999,
    '512 GB': 62999,
    '1 TB':   72999,
  },
  'iPhone 16 Plus': {
    '128 GB': 42999,
    '256 GB': 48999,
    '512 GB': 56999,
  },
  'iPhone 16': {
    '128 GB': 37999,
    '256 GB': 43999,
    '512 GB': 51999,
  },
  'iPhone 15 Pro Max': {
    '256 GB': 44999,
    '512 GB': 52999,
    '1 TB':   61999,
  },
  'iPhone 15 Pro': {
    '128 GB': 38999,
    '256 GB': 44999,
    '512 GB': 51999,
    '1 TB':   59999,
  },
  'iPhone 15 Plus': {
    '128 GB': 32999,
    '256 GB': 37999,
    '512 GB': 44999,
  },
  'iPhone 15': {
    '128 GB': 29999,
    '256 GB': 34999,
    '512 GB': 40999,
  },
  'iPhone 14 Pro': {
    '128 GB': 26999,
    '256 GB': 30999,
    '512 GB': 35999,
    '1 TB':   41999,
  },
  'iPhone 14': {
    '128 GB': 21999,
    '256 GB': 25999,
    '512 GB': 29999,
  },
  'iPhone 13 Pro': {
    '128 GB': 20999,
    '256 GB': 24499,
    '512 GB': 28499,
    '1 TB':   33499,
  },
  'iPhone 13': {
    '128 GB': 15999,
    '256 GB': 18999,
    '512 GB': 22999,
  },
  'iPhone 12 Pro': {
    '128 GB': 12999,
    '256 GB': 15499,
    '512 GB': 17999,
  },
  'iPhone 12': {
    '64 GB':  10499,
    '128 GB': 12499,
    '256 GB': 14999,
  },
  'iPhone 11': {
    '64 GB':  8499,
    '128 GB': 10499,
    '256 GB': 12999,
  },
  'iPhone SE 2022': {
    '64 GB':  7999,
    '128 GB': 9999,
    '256 GB': 12499,
  },
};
const MODEL_DESCRIPTIONS = {
  'iPhone 18 Pro Max': 'Флагман 2026 року з новим чипом A20 Pro, передовою камерою 48 Мп (зі змінною діафрагмою) і екраном 6.9" ProMotion 120 Гц. Титановий корпус, підекранний Face ID. До 41 год відео без підзарядки.',
  'iPhone 18 Pro': 'A20 Pro, потрійна камера 48 Мп зі змінною діафрагмою, екран 6.3" ProMotion. Преміум у компактному форматі з ультратонкими рамками та системою підекранного Face ID.',
  'iPhone 17 Pro Max': 'Флагман 2025 року з чипом A19 Pro, камерою 48 Мп і екраном 6.9" ProMotion 120 Гц. Титановий корпус. До 39 год відео без підзарядки.',
  'iPhone 17 Pro': 'A19 Pro, потрійна камера 48 Мп, екран 6.3" ProMotion. Преміум у компактному форматі з ультратонкими рамками.',
  'iPhone 17 Air': 'Найтонший iPhone в історії — 5.5 мм. Чип A19, великий 6.6" дисплей, eSIM. Ідеально для тих, хто цінує легкість.',
  'iPhone 17': 'A19, Dynamic Island, камера 48 Мп. Найдоступніший спосіб отримати флагманські технології 2025 року.',
  'iPhone 17e': 'A19, OLED 6.1", камера 48 Мп та підтримка Apple Intelligence за найдоступнішою ціною лінійки 17. Компактний і швидкий.',
  'iPhone 16 Pro Max': 'A18 Pro, камера 48 Мп з 5× зумом, екран 6.9" ProMotion. Найпотужніший iPhone лінійки 2024.',
  'iPhone 16 Pro': 'A18 Pro, 48 Мп, новий Action Button і Camera Control. Ідеальний баланс розміру та можливостей.',
  'iPhone 16 Plus': 'A18, великий 6.7" екран, тривала батарея. Відмінний вибір для тих, хто любить простір.',
  'iPhone 16': 'A18, Dynamic Island, камера 48 Мп. Перший iPhone з підтримкою Apple Intelligence.',
  'iPhone 15 Pro Max': 'Титановий корпус, A17 Pro, оптичний зум 5×. Флагман 2023 — зараз за вигідною ціною.',
  'iPhone 15 Pro': 'A17 Pro, 48 Мп, Action Button. Преміальні технології у зручному форматі.',
  'iPhone 15 Plus': 'A16 Bionic, великий 6.7" OLED, Dynamic Island і USB-C. Більше екрану — більше задоволення за розумні гроші.',
  'iPhone 15': 'Dynamic Island, USB-C, A16 Bionic. Сучасний дизайн за доступною ціною.',
  'iPhone 14 Pro': 'Always-On дисплей, Dynamic Island, A16 Bionic. Перевірений час флагман — чудовий вибір б/у.',
  'iPhone 14': 'A15 Bionic, акселерометр при ДТП, Emergency SOS. Надійний вибір на кожен день.',
  'iPhone 13 Pro': 'ProMotion 120 Гц, 3× телеоб\'єктив, A15 Bionic. Ідеальний баланс ціни та можливостей.',
  'iPhone 13': 'A15 Bionic, Cinematic Mode, збільшена батарея. Популярний вибір б/у-ринку.',
  'iPhone 12 Pro': '5G, LiDAR, 3 камери, A14 Bionic. Відмінна продуктивність за приємною ціною.',
  'iPhone 12': '5G, A14 Bionic, OLED Super Retina. Компактний та потужний варіант.',
  'iPhone 11': 'Подвійна камера, A13 Bionic, нічний режим. Бюджетний варіант з хорошою камерою.',
  'iPhone SE 2022': 'Найдоступніший iPhone з чипом A15 Bionic і сканером відбитків. Компактний та швидкий.',
};

// Specs per model
const MODEL_SPECS = {
 
  'iPhone 18 Pro Max': [['Чип', 'A20 Pro'], ['Дисплей', '6.9" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Фронтальна', '24 Мп TrueDepth'], ['Батарея', 'До 41 год відео'], ['Корпус', 'Титан Grade 5'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 18 Pro': [['Чип', 'A20 Pro'], ['Дисплей', '6.3" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Батарея', 'До 33 год відео'], ['Корпус', 'Титан'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17 Pro Max': [['Чип', 'A19 Pro'], ['Дисплей', '6.9" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Фронтальна', '24 Мп TrueDepth'], ['Батарея', 'До 39 год відео'], ['Корпус', 'Титан Grade 5'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17 Pro': [['Чип', 'A19 Pro'], ['Дисплей', '6.3" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Батарея', 'До 33 год відео'], ['Корпус', 'Титан'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17 Air': [['Чип', 'A19'], ['Дисплей', '6.6" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Товщина', '5.5 мм'], ['Батарея', 'До 26 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17': [['Чип', 'A19'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Батарея', 'До 22 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17e': [['Чип', 'A19'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Батарея', 'До 20 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 16 Pro Max': [['Чип', 'A18 Pro'], ['Дисплей', '6.9" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Зум', '5× оптичний'], ['Батарея', 'До 33 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 16 Pro': [['Чип', 'A18 Pro'], ['Дисплей', '6.3" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Батарея', 'До 27 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 16 Plus': [['Чип', 'A18'], ['Дисплей', '6.7" OLED 60 Гц'], ['Камера', '48 Мп + 12 Мп'], ['Батарея', 'До 27 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 16': [['Чип', 'A18'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп + 12 Мп'], ['Батарея', 'До 22 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 15 Pro Max': [['Чип', 'A17 Pro'], ['Дисплей', '6.7" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 12 Мп + 12 Мп'], ['Зум', '5× оптичний'], ['Корпус', 'Титан'], ['Батарея', 'До 29 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 26']],
  'iPhone 15 Pro': [['Чип', 'A17 Pro'], ['Дисплей', '6.1" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 12 Мп + 12 Мп'], ['Корпус', 'Титан'], ['Батарея', 'До 23 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 26']],
  'iPhone 15 Plus': [['Чип', 'A16 Bionic'], ['Дисплей', '6.7" OLED 60 Гц'], ['Камера', '48 Мп + 12 Мп'], ['Батарея', 'До 26 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 26']],
  'iPhone 15': [['Чип', 'A16 Bionic'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп + 12 Мп'], ['Батарея', 'До 20 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 26']],
  'iPhone 14 Pro': [['Чип', 'A16 Bionic'], ['Дисплей', '6.1" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 12 Мп + 12 Мп'], ['Always-On', 'Так'], ['Батарея', 'До 23 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 14': [['Чип', 'A15 Bionic'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '12 Мп + 12 Мп'], ['Батарея', 'До 20 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 13 Pro': [['Чип', 'A15 Bionic'], ['Дисплей', '6.1" OLED ProMotion 120 Гц'], ['Камера', '12 Мп + 12 Мп + 12 Мп'], ['Зум', '3× оптичний'], ['Батарея', 'До 22 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 13': [['Чип', 'A15 Bionic'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '12 Мп + 12 Мп'], ['Батарея', 'До 26 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 12 Pro': [['Чип', 'A14 Bionic'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '12 Мп + 12 Мп + 12 Мп'], ['LiDAR', 'Так'], ['5G', 'Так'], ['Батарея', 'До 17 год відео'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 12': [['Чип', 'A14 Bionic'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '12 Мп + 12 Мп'], ['5G', 'Так'], ['Батарея', 'До 17 год відео'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone 11': [['Чип', 'A13 Bionic'], ['Дисплей', '6.1" IPS LCD'], ['Камера', '12 Мп + 12 Мп'], ['Батарея', 'До 17 год відео'], ['Захист', 'IP68'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
  'iPhone SE 2022': [['Чип', 'A15 Bionic'], ['Дисплей', '4.7" IPS LCD'], ['Камера', '12 Мп основна'], ['Touch ID', 'Так'], ['Батарея', 'До 15 год відео'], ['5G', 'Так'], ['SIM', 'SIM + eSIM'], ['OS', 'iOS 18']],
};

// -------------------------------------------------------------
// СПІЛЬНІ ХЕЛПЕРИ ЦІНОУТВОРЕННЯ
// Використовуються і каталогом (модалка товару), і Trade-In
// (крок вибору нового iPhone), щоб цифри ніколи не розходились.
// -------------------------------------------------------------

// Умовна надбавка ціни за обсяг пам'яті — на випадок, якщо для
// конкретного (модель + обсяг) немає точного запису ні в PRICE_TABLE,
// ні в PRODUCTS, і ціну доводиться екстраполювати від сусіднього обсягу.
const STORAGE_STEP = {
  '64 GB': 0, '128 GB': 1500, '256 GB': 5000,
  '512 GB': 9000, '1 TB': 14000, '2 TB': 20000
};

function storageStepDelta(fromStorage, toStorage) {
  return (STORAGE_STEP[toStorage] || 0) - (STORAGE_STEP[fromStorage] || 0);
}

// Ціна моделі в обраному стані ('new' | 'used') і обсязі пам'яті.
// Порядок пошуку: 1) точний товар у PRODUCTS  2) PRICE_TABLE (тільки
// для нових)  3) екстраполяція від найближчого відомого варіанта.
// Повертає null, якщо модель у цьому стані взагалі не продається.
function getCatalogPrice(modelName, storage, condition) {
  const wantCond = condition === 'used' ? 'Вживаний (Б/У)' : 'Новий';
  const variants = PRODUCTS.filter(p => p.model === modelName);

  const exact = variants.find(p => p.storage === storage && p.condition === wantCond);
  if (exact) return exact.price;

  if (condition !== 'used' && PRICE_TABLE[modelName] && PRICE_TABLE[modelName][storage]) {
    return PRICE_TABLE[modelName][storage];
  }

  const anyOfCond = variants.find(p => p.condition === wantCond);
  if (anyOfCond) {
    return Math.max(0, anyOfCond.price + storageStepDelta(anyOfCond.storage, storage));
  }

  return null;
}

// Які стани (новий/б/у) реально продаються для моделі
function getModelConditions(modelName) {
  const variants = PRODUCTS.filter(p => p.model === modelName);
  const conds = [];
  if (variants.some(p => p.condition === 'Новий'))          conds.push({ key: 'new',  label: 'Новий' });
  if (variants.some(p => p.condition === 'Вживаний (Б/У)')) conds.push({ key: 'used', label: 'Вживаний (Б/У)' });
  if (!conds.length) conds.push({ key: 'new', label: 'Новий' });
  return conds;
}

// -------------------------------------------------------------
// TRADE-IN — адаптер для wizard'а в trade-in.html
// -------------------------------------------------------------

// Базова оцінка ВИКУПУ старого iPhone (скільки МИ платимо клієнту).
// Це не ціна продажу з каталогу — окрема бізнес-величина, тому вона
// не виводиться з PRODUCTS/PRICE_TABLE і задається тут прямо.
const TRADE_IN_BUYBACK_BASE = {
  'iPhone 17 Pro Max': 48000, 'iPhone 17 Pro': 42000, 'iPhone 17 Air': 36000, 'iPhone 17': 32000, 'iPhone 17e': 25000,
  'iPhone 16 Pro Max': 36000, 'iPhone 16 Pro': 32000, 'iPhone 16 Plus': 28500, 'iPhone 16': 26000,
  'iPhone 15 Pro Max': 30000, 'iPhone 15 Pro': 26000, 'iPhone 15 Plus': 22000, 'iPhone 15': 20000,
  'iPhone 14 Pro': 22000, 'iPhone 14': 16000,
  'iPhone 13 Pro': 17000, 'iPhone 13': 14000,
  'iPhone 12 Pro': 12000, 'iPhone 12': 10000,
  'iPhone 11': 8000, 'iPhone SE 2022': 6500,
};

// Будує список моделей у форматі, який очікує wizard trade-in.html
// ({name, year, storages, colors:[{n,c}], sims, tradeBase, buyPrice, usedPrice}),
// але кожне поле виводиться з PRODUCTS/MODEL_*/PRICE_TABLE вище,
// а не дублюється власними цифрами.
function buildTradeInModels() {
  return modelOrder.map(name => {
    const variants = PRODUCTS.filter(p => p.model === name);
    if (!variants.length) return null;

    const colorNames = MODEL_COLORS[name] || [...new Set(variants.map(v => v.color))];
    const colors  = colorNames.map(cName => ({ n: cName, c: COLOR_MAP[cName] || '#888' }));
    const sims    = [...new Set(variants.map(v => v.sim))];
    const storages = MODEL_STORAGES[name] || [...new Set(variants.map(v => v.storage))];

    const conds    = getModelConditions(name);
    const hasNew   = conds.some(c => c.key === 'new'  && variants.some(v => v.condition === 'Новий'));
    const hasUsed  = conds.some(c => c.key === 'used' && variants.some(v => v.condition === 'Вживаний (Б/У)'));

    return {
      name,
      year: variants[0].year,
      storages, colors, sims,
      tradeBase: TRADE_IN_BUYBACK_BASE[name] ?? 0,
      buyPrice:  hasNew  ? getCatalogPrice(name, storages[0], 'new')  : null,
      usedPrice: hasUsed ? getCatalogPrice(name, storages[0], 'used') : null,
    };
  }).filter(Boolean);
}

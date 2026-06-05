// =============================================================
// iFranko — script.js
// Каталог iPhone, фільтри та Trade-In калькулятор
// =============================================================

// -------------------------------------------------------------
// ЗОБРАЖЕННЯ МОДЕЛЕЙ (GSMArena CDN — офіційні прес-фото)
// Використовуються в каталозі та Trade-In
// -------------------------------------------------------------
const MODEL_IMAGES = {
  "iPhone 17 Pro Max": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro-max.jpg",
  "iPhone 17 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro.jpg",
  "iPhone 17 Air": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-air.jpg",
  "iPhone 17": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17.jpg",
  "iPhone 16 Pro Max": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg",
  "iPhone 16 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg",
  "iPhone 16 Plus": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg",
  "iPhone 16": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
  "iPhone 15 Pro Max": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
  "iPhone 15 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
  "iPhone 15 Plus": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg",
  "iPhone 15": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
  "iPhone 14 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg",
  "iPhone 14": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg",
  "iPhone 13 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg",
  "iPhone 13": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
  "iPhone 12 Pro": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg",
  "iPhone 12": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
  "iPhone 11": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
  "iPhone 17e": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17e.jpg",
  "iPhone SE 2022": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2022-.jpg",
};

// -------------------------------------------------------------
// КАТАЛОГ ТОВАРІВ
// condition: "Новий" або "Вживаний (Б/У)"
// -------------------------------------------------------------
const PRODUCTS = [
  // ── iPhone 17 серія (2025) ──────────────────────────────────
  {
    id: 17,
    model: "iPhone 17 Pro Max",
    storage: "1 TB",
    color: "Desert Titanium",
    price: 91999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#c8956c"
  },
  {
    id: 18,
    model: "iPhone 17 Pro Max",
    storage: "512 GB",
    color: "Black Titanium",
    price: 81999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#2c2c2e"
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
    storage: "128 GB",
    color: "Sky Blue",
    price: 51999,
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
    color: "Teal",
    price: 40999,
    condition: "Новий",
    year: 2025,
    sim: "eSIM",
    accent: "#14b8a6"
  },

  // ── iPhone 16 серія (2024) ──────────────────────────────────
  {
    id: 1,
    model: "iPhone 16 Pro Max",
    storage: "256 GB",
    color: "Titanium Black",
    price: 56999,
    condition: "Новий",
    year: 2024,
    sim: "eSIM",
    accent: "#ff8a1f"
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
  "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17", "iPhone 17e",
  "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
  "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
  "iPhone 14 Pro", "iPhone 14",
  "iPhone 13 Pro", "iPhone 13",
  "iPhone 12 Pro", "iPhone 12",
  "iPhone 11", "iPhone SE 2022"
];

const nf = new Intl.NumberFormat('uk-UA');
const price = value => `${nf.format(value)} ₴`;

// Читає параметр з URL (напр. ?status=new)
function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

// Підсвічує активний пункт меню
function setActiveNav() {
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('href') === location.pathname.split('/').pop())
      link.classList.add('active');
  });
}

// Прив'язує кнопки на головній (data-condition-link / data-trade-link)
function bindHeroButtons() {
  document.querySelectorAll('[data-condition-link]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.href = `catalog.html?status=${btn.dataset.conditionLink}`;
    });
  });
  document.querySelectorAll('[data-trade-link]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.href = 'trade-in.html';
    });
  });
}

// -------------------------------------------------------------
// КАТАЛОГ — фільтри, пошук, рендер карток з реальними фото
// -------------------------------------------------------------
function buildCatalog() {
  const grid = document.querySelector('[data-products]');
  if (!grid) return;

  const search = document.querySelector('#search');
  const conditionBtns = [...document.querySelectorAll('[data-condition]')];
  const modelBtns = [...document.querySelectorAll('[data-model]')];
  const resetBtn = document.querySelector('[data-reset]');
  const countEl = document.querySelector('[data-count]');
  const summaryEl = document.querySelector('[data-summary]');
  const emptyEl = document.querySelector('[data-empty]');

  const state = {
    status: qs('status') || 'all',
    search: '',
    model: 'all'
  };
  if (state.status === 'new') state.status = 'Новий';
  if (state.status === 'used') state.status = 'Вживаний (Б/У)';

  function render() {
    // Оновлюємо активні кнопки фільтрів
    conditionBtns.forEach(btn => btn.classList.toggle('active',
        btn.dataset.condition === state.status ||
        (state.status === 'all' && btn.dataset.condition === 'all')));
    modelBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.model === state.model));

    // Фільтрація та сортування
    const filtered = PRODUCTS
        .filter(p => {
          const byCondition = state.status === 'all' || p.condition === state.status;
          const bySearch = !state.search ||
              `${p.model} ${p.storage} ${p.color}`.toLowerCase().includes(state.search.toLowerCase());
          const byModel = state.model === 'all' || p.model === state.model;
          return byCondition && bySearch && byModel;
        })
        .sort((a, b) =>
            modelOrder.indexOf(a.model) - modelOrder.indexOf(b.model) || b.price - a.price
        );

    countEl.textContent = filtered.length;
    summaryEl.textContent = `${state.status === 'all' ? 'Всі товари' : state.status} · ${state.model === 'all' ? 'усі моделі' : state.model}`;

    // Рендер карток — з реальним фото або градієнтом як fallback
    grid.innerHTML = filtered.map(p => {
      const imgUrl = MODEL_IMAGES[p.model];
      const visual = imgUrl
          ? `<div class="product-visual product-visual--photo">
             <img src="${imgUrl}" alt="${p.model}" loading="lazy" onerror="this.parentElement.classList.remove('product-visual--photo');this.remove()">
           </div>`
          : `<div class="product-visual" style="background:radial-gradient(circle at 50% 20%,rgba(255,255,255,.18),transparent 22%),linear-gradient(135deg,${p.accent},rgba(17,24,39,.55))"></div>`;
      return `
      <article class="product-card panel">
        <span class="condition ${p.condition === 'Новий' ? 'new' : 'used'}">${p.condition}</span>
        ${visual}
        <h3>${p.model}</h3>
        <p class="meta">${p.storage} · ${p.color}</p>
        <div class="mini">
          <span>${p.year} рік</span>
          <span>${p.sim}</span>
        </div>
        <div class="price">${price(p.price)}</div>
        <button class="btn primary" type="button">Купити</button>
      </article>`;
    }).join('');

    emptyEl.style.display = filtered.length ? 'none' : 'block';
  }

  search?.addEventListener('input', e => {
    state.search = e.target.value.trim();
    render();
  });

  conditionBtns.forEach(btn => btn.addEventListener('click', () => {
    state.status = btn.dataset.condition;
    const url = new URL(location.href);
    if (state.status === 'all') url.searchParams.delete('status');
    else url.searchParams.set('status', state.status === 'Новий' ? 'new' : 'used');
    history.replaceState({}, '', url);
    render();
  }));

  modelBtns.forEach(btn => btn.addEventListener('click', () => {
    state.model = btn.dataset.model;
    render();
  }));

  resetBtn?.addEventListener('click', () => {
    state.status = 'all';
    state.search = '';
    state.model = 'all';
    search.value = '';
    history.replaceState({}, '', location.pathname);
    render();
  });

  render();
}

// -------------------------------------------------------------
// TRADE-IN КАЛЬКУЛЯТОР (проста стара версія — для сумісності)
// Основний wizard знаходиться в trade-in.html
// -------------------------------------------------------------
function buildTradeInEstimator() {
  const box = document.querySelector('[data-estimate]');
  if (!box) return;
  const modelSelect = document.querySelector('#tradeModel');
  const conditionSelect = document.querySelector('#tradeCondition');
  const storageSelect = document.querySelector('#tradeStorage');
  const button = document.querySelector('[data-calc]');
  const result = document.querySelector('[data-result]');
  const hint = document.querySelector('[data-hint]');

  const baseValues = {
    'iPhone 17 Pro Max': 48000, 'iPhone 17 Pro': 42000, 'iPhone 17 Air': 36000, 'iPhone 17': 32000, 'iPhone 17e': 25000,
    'iPhone 16 Pro Max': 36000, 'iPhone 16 Pro': 32000, 'iPhone 16 Plus': 28500, 'iPhone 16': 26000,
    'iPhone 15 Pro Max': 30000, 'iPhone 15 Plus': 22000, 'iPhone 15': 20000,
    'iPhone 14 Pro': 22000, 'iPhone 14': 18000,
    'iPhone 13 Pro': 17000, 'iPhone 13': 14000,
    'iPhone 12 Pro': 12000, 'iPhone 12': 10000,
    'iPhone 11': 8000, 'iPhone SE 2022': 6500
  };

  function calc() {
    const model = modelSelect.value, condition = conditionSelect.value, storage = storageSelect.value;
    let value = baseValues[model] || 8000;
    if (storage === '128 GB') value += 1500;
    if (storage === '256 GB') value += 3500;
    if (storage === '512 GB') value += 5500;
    if (storage === '1 TB') value += 9000;
    if (condition === 'Добрий') value *= 0.88;
    if (condition === 'Є сліди використання') value *= 0.75;
    const min = Math.round(value * 0.9), max = Math.round(value * 1.06);
    result.innerHTML = `<div class="result"><div class="small">Орієнтовна оцінка</div><div class="big">${nf.format(min)}–${nf.format(max)} ₴</div><div class="small">Під ${model} (${storage}), стан: ${condition.toLowerCase()}.</div></div>`;
    hint.textContent = 'Оцінка орієнтовна. Фінальна сума залежить від діагностики, батареї та зовнішнього стану.';
  }

  button?.addEventListener('click', calc);
  [modelSelect, conditionSelect, storageSelect].forEach(el => el?.addEventListener('change', calc));
  calc();
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  bindHeroButtons();
  buildCatalog();
  buildTradeInEstimator();
});

// =============================================================
// PRODUCT MODAL — iFranko
// =============================================================

// Grouped products by model for selector options
function getModelVariants(baseModel) {
  return PRODUCTS.filter(p => p.model === baseModel);
}

// Color name → CSS color
const COLOR_MAP = {
  'Black': '#1a1a1a', 'Midnight': '#1c2030', 'Space Black': '#2c2c2e',
  'Titanium Black': '#3a3a3c', 'Desert Titanium': '#c8956c', 'Natural Titanium': '#b8a898',
  'White': '#f5f5f7', 'White Titanium': '#ece9e4', 'Starlight': '#d4d0c8', 'Silver': '#e0e0e2',
  'Pink': '#f4a9c0', 'Product Red': '#d32f2f', 'Red': '#ef4444',
  'Blue': '#3b82f6', 'Ultramarine': '#8b5cf6', 'Pacific Blue': '#0ea5e9',
  'Sierra Blue': '#7eb8d4', 'Sky Blue': '#7ab8d4', 'Deep Blue': '#1e3a5f', 'Blue Titanium': '#5b8db8',
  'Purple': '#a855f7', 'Deep Purple': '#6d28a7', 'Cosmic Orange': '#c8702a', 'Sage': '#7a9a7a',
  'Yellow': '#eab308', 'Green': '#22c55e', 'Teal': '#14b8a6',
  'Gold': '#c9a84c', 'Graphite': '#4a4a4a',
};

// All official colors per model
const MODEL_COLORS = {
  'iPhone 17 Pro Max': ['Desert Titanium', 'Black Titanium', 'White Titanium', 'Natural Titanium', 'Cosmic Orange'],
  'iPhone 17 Pro': ['Desert Titanium', 'Black Titanium', 'White Titanium', 'Natural Titanium', 'Cosmic Orange'],
  'iPhone 17 Air': ['Sky Blue', 'Starlight', 'Black', 'White', 'Pink'],
  'iPhone 17': ['Black', 'White', 'Pink', 'Teal', 'Blue', 'Yellow'],
  'iPhone 17e': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 16 Pro Max': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
  'iPhone 16 Pro': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
  'iPhone 16 Plus': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 16': ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
  'iPhone 15 Pro Max': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Blue Titanium'],
  'iPhone 15 Pro': ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Blue Titanium'],
  'iPhone 15 Plus': ['Black', 'Pink', 'Yellow', 'Green', 'Blue'],
  'iPhone 15': ['Black', 'Pink', 'Yellow', 'Green', 'Blue'],
  'iPhone 14 Pro': ['Space Black', 'Silver', 'Gold', 'Deep Purple'],
  'iPhone 14': ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red', 'Yellow'],
  'iPhone 13 Pro': ['Sierra Blue', 'Silver', 'Gold', 'Graphite'],
  'iPhone 13': ['Midnight', 'Starlight', 'Blue', 'Pink', 'Green', 'Red'],
  'iPhone 12 Pro': ['Pacific Blue', 'Silver', 'Gold', 'Graphite'],
  'iPhone 12': ['Black', 'White', 'Blue', 'Green', 'Red', 'Purple', 'Yellow'],
  'iPhone 11': ['Black', 'White', 'Purple', 'Yellow', 'Green', 'Red'],
  'iPhone SE 2022': ['Midnight', 'Starlight', 'Red'],
};

// All available storage options per model
const MODEL_STORAGES = {
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
  'iPhone 17 Pro Max': {
    '256 GB': 71999,
    '512 GB': 81999,
    '1 TB':   91999,
    '2 TB':   101999,
  },
  'iPhone 17 Pro': {        // 2 TB не існує — не додавати!
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
  'iPhone 17 Pro Max': 'Флагман 2025 року з чипом A26 Pro, камерою 48 Мп і екраном 6.9" ProMotion 120 Гц. Титановий корпус. До 39 год відео без підзарядки.',
  'iPhone 17 Pro': 'A26 Pro, потрійна камера 48 Мп, екран 6.3" ProMotion. Преміум у компактному форматі з ультратонкими рамками.',
  'iPhone 17 Air': 'Найтонший iPhone в історії — 5.5 мм. Чип A18, великий 6.6" дисплей, eSIM. Ідеально для тих, хто цінує легкість.',
  'iPhone 17': 'A18, Dynamic Island, камера 48 Мп. Найдоступніший спосіб отримати флагманські технології 2025 року.',
  'iPhone 17e': 'A18, OLED 6.1", камера 48 Мп та підтримка Apple Intelligence за найдоступнішою ціною лінійки 17. Компактний і швидкий.',
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
  'iPhone 17 Pro Max': [['Чип', 'A26 Pro'], ['Дисплей', '6.9" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Фронтальна', '24 Мп TrueDepth'], ['Батарея', 'До 39 год відео'], ['Корпус', 'Титан Grade 5'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17 Pro': [['Чип', 'A26 Pro'], ['Дисплей', '6.3" OLED ProMotion 120 Гц'], ['Камера', '48 Мп + 48 Мп + 12 Мп'], ['Батарея', 'До 33 год відео'], ['Корпус', 'Титан'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17 Air': [['Чип', 'A18'], ['Дисплей', '6.6" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Товщина', '5.5 мм'], ['Батарея', 'До 26 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17': [['Чип', 'A18'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Батарея', 'До 22 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
  'iPhone 17e': [['Чип', 'A18'], ['Дисплей', '6.1" OLED 60 Гц'], ['Камера', '48 Мп основна'], ['Батарея', 'До 20 год відео'], ['Захист', 'IP68'], ['SIM', 'eSIM'], ['OS', 'iOS 26']],
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

const FAKE_REVIEWS = [
  {
    stars: 5,
    text: 'Відмінний телефон! Швидка доставка, упаковка ціла. Рекомендую магазин.',
    author: 'Олексій К.',
    date: '12 травня 2025'
  },
  {
    stars: 5,
    text: 'Замовляв вже вдруге. Все чесно, б/у стан відповідає опису. Дякую!',
    author: 'Марія В.',
    date: '3 квітня 2025'
  },
  {
    stars: 4,
    text: 'Гарний апарат, камера супер. Трохи подряпана рамка, але ціна відповідна.',
    author: 'Ігор Р.',
    date: '18 березня 2025'
  },
];
const FAKE_QA = [
  {q: 'Чи є гарантія на вживаний телефон?', a: 'Так, надаємо гарантію 3 місяці на всі б/у iPhone. Новий — 12 місяців.'},
  {q: 'Можлива оплата частинами?', a: 'Так, працюємо з Monobank, ПриватБанк та іншими сервісами розстрочки.'},
  {
    q: 'Як перевірити оригінальність?',
    a: 'Серійний номер перевіряється на сайті Apple. Всі наші телефони — оригінали.'
  },
];

// Modal state
let modalState = {
  product: null,
  selectedStorage: null,
  selectedColor: null,
  selectedSim: null,
};

function openModal(product) {
  const overlay = document.getElementById('productModal');
  if (!overlay) return;

  const variants = getModelVariants(product.model);
  const storages = MODEL_STORAGES[product.model] || [...new Set(variants.map(p => p.storage))];
  const colors = MODEL_COLORS[product.model] || [...new Set(variants.map(p => p.color))];
  const sims = [...new Set(variants.map(p => p.sim))];

  modalState = {
    product,
    selectedStorage: product.storage,
    selectedColor: product.color,
    selectedSim: product.sim,
  };

  // Photo
  const imgEl = document.getElementById('modalImg');
  const imgUrl = MODEL_IMAGES[product.model];
  imgEl.src = imgUrl || '';
  imgEl.alt = product.model;
  document.getElementById('modalPhotoCol').style.background =
      imgUrl ? '#0d0d0f' : `linear-gradient(135deg,${product.accent},rgba(17,24,39,.7))`;
  document.getElementById('modalGlow').style.background =
      `radial-gradient(ellipse, ${product.accent}55, transparent 70%)`;

  // Badge
  const badge = document.getElementById('modalBadge');
  badge.textContent = product.condition;
  badge.className = 'modal-photo-badge ' + (product.condition === 'Новий' ? 'new' : 'used');

  // Title / subtitle / price / desc
  document.getElementById('modalTitle').textContent = product.model;
  document.getElementById('modalSubtitle').textContent = `${product.storage} · ${product.color} · ${product.year} рік`;
  document.getElementById('modalPrice').textContent = price(product.price);
  document.getElementById('modalDesc').textContent = MODEL_DESCRIPTIONS[product.model] || '';

  // SIM options
  const simOpts = document.getElementById('simOptions');
  simOpts.innerHTML = sims.map(s =>
      `<button class="modal-opt${s === modalState.selectedSim ? ' active' : ''}" data-sim="${s}">${s}</button>`
  ).join('');

  // Color options
  const colorOpts = document.getElementById('colorOptions');
  colorOpts.innerHTML = colors.map(c => {
    const hex = COLOR_MAP[c] || '#888';
    return `<button class="modal-opt color-swatch${c === modalState.selectedColor ? ' active' : ''}" data-color="${c}" style="background:${hex}" title="${c}"></button>`;
  }).join('');

  // Storage options
  const storageOpts = document.getElementById('storageOptions');
  storageOpts.innerHTML = storages.map(s =>
      `<button class="modal-opt${s === modalState.selectedStorage ? ' active' : ''}" data-storage="${s}">${s}</button>`
  ).join('');

  // Reset buy form
  document.getElementById('modalBuyForm').classList.remove('open');
  document.getElementById('modalSuccess').classList.remove('show');
  document.getElementById('modalPhone').value = '';
  document.getElementById('modalName').value = '';

  // Hide details section
  document.getElementById('detailsSection').classList.remove('active');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

function updateModalFromState() {
  const baseModel = modalState.product;

  // Шукаємо точну ціну з таблиці: модель → пам'ять
  const modelPrices = PRICE_TABLE[baseModel.model] || {};
  let dynamicPrice = modelPrices[modalState.selectedStorage] ?? baseModel.price;

  // Невелика доплата за версію з фізичною SIM-карткою
  // (eSIM-only = базова ціна; SIM + eSIM = +1 500 ₴)
  if (modalState.selectedSim === 'SIM + eSIM') dynamicPrice += 1500;
  if (modalState.selectedSim === 'Dual SIM')   dynamicPrice += 2500;

  document.getElementById('modalPrice').textContent = price(dynamicPrice);
  document.getElementById('modalSubtitle').textContent =
      `${modalState.selectedStorage} · ${modalState.selectedColor} · ${baseModel.year} рік`;

  // Оновлюємо активні кнопки
  document.querySelectorAll('#simOptions .modal-opt').forEach(b =>
      b.classList.toggle('active', b.dataset.sim === modalState.selectedSim));
  document.querySelectorAll('#colorOptions .modal-opt').forEach(b =>
      b.classList.toggle('active', b.dataset.color === modalState.selectedColor));
  document.querySelectorAll('#storageOptions .modal-opt').forEach(b =>
      b.classList.toggle('active', b.dataset.storage === modalState.selectedStorage));
}

function bindModal() {
  const overlay = document.getElementById('productModal');
  if (!overlay) return;

  document.getElementById('modalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Option clicks — delegated
  overlay.addEventListener('click', e => {
    const btn = e.target.closest('.modal-opt');
    if (!btn) return;
    if (btn.dataset.sim) {
      modalState.selectedSim = btn.dataset.sim;
    }
    if (btn.dataset.color) {
      modalState.selectedColor = btn.dataset.color;
    }
    if (btn.dataset.storage) {
      modalState.selectedStorage = btn.dataset.storage;
    }
    updateModalFromState();
  });

  // Buy button
  document.getElementById('modalBuyBtn').addEventListener('click', () => {
    const form = document.getElementById('modalBuyForm');
    form.classList.toggle('open');
  });

  // Submit
  document.getElementById('modalSubmitBtn').addEventListener('click', async () => {
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();

  // 1. Перевірка ПІБ (поле обов'язкове і має містити мінімум 2 слова — Прізвище та Ім'я)
  const nameWords = name.split(/\s+/).filter(Boolean);
  if (nameWords.length < 2) {
    alert("Будь ласка, введіть ваше повне ПІБ (наприклад: Іванов Іван)!");
    return;
  }

  // 2. Перевірка формату телефону (+380 і рівно 9 цифр після нього, всього 12 символів)
  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert("Введіть правильний номер телефону!\nЗразок: +380931234567 (усього 9 цифр після +380, без пробілів та дефісів)");
    return;
  }

  // Якщо перевірка успішна — збираємо дані моделі та ціну
  const model = `${modalState.product.model} (${modalState.selectedStorage}, ${modalState.selectedSim})`;
  const price = document.getElementById('modalPrice').textContent;

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, model, price })
    });

    const data = await response.json();
    if (data.success) {
      document.getElementById('modalSuccess').style.display = 'block';
    }
  } catch (error) {
    console.error("Не вдалося надіслати замовлення на сервер:", error);
    alert("Сталася помилка з'єднання з сервером.");
  }
});

  // Specs button — scroll to details
  document.getElementById('modalSpecsBtn').addEventListener('click', () => {
    closeModal();
    showDetails('specs');
  });

  // Reviews button
  document.getElementById('modalReviewsBtn').addEventListener('click', () => {
    closeModal();
    showDetails('reviews');
  });

  // Details tabs
  document.querySelectorAll('[data-dtab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.dtab;
      document.querySelectorAll('[data-dtab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      ['specs', 'reviews', 'qa'].forEach(k => {
        document.getElementById('dtab' + k.charAt(0).toUpperCase() + k.slice(1)).style.display = k === key ? '' : 'none';
      });
    });
  });
}

function showDetails(tab) {
  const section = document.getElementById('detailsSection');
  const product = modalState.product;
  if (!product) return;

  // Populate specs
  const specs = MODEL_SPECS[product.model] || [];
  document.getElementById('specsTable').innerHTML = specs.map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');

  // Populate reviews
  document.getElementById('reviewsList').innerHTML = FAKE_REVIEWS.map(r =>
      `<div class="review-item">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-meta">${r.author} · ${r.date}</div>
    </div>`
  ).join('');

  // Populate Q&A
  document.getElementById('qaList').innerHTML = FAKE_QA.map(q =>
      `<div class="qa-item">
      <div class="qa-q">❓ ${q.q}</div>
      <div class="qa-a">💬 ${q.a}</div>
    </div>`
  ).join('');

  // Activate tab
  document.querySelectorAll('[data-dtab]').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-dtab="${tab}"]`)?.classList.add('active');
  ['specs', 'reviews', 'qa'].forEach(k => {
    document.getElementById('dtab' + k.charAt(0).toUpperCase() + k.slice(1)).style.display = k === tab ? '' : 'none';
  });

  section.classList.add('active');
  setTimeout(() => section.scrollIntoView({behavior: 'smooth', block: 'start'}), 80);
}

// buildCatalogWithModal is replaced by the buildCatalog override above

// The original DOMContentLoaded at bottom of file calls buildCatalog().
// We override buildCatalog globally so the original listener picks up our version.
window._catalogBuilt = false;
const _realBuildCatalog = buildCatalog;
// eslint-disable-next-line no-global-assign
buildCatalog = function () {
  _realBuildCatalog();
  if (window._catalogBuilt) return;
  window._catalogBuilt = true;
  const grid = document.querySelector('[data-products]');
  if (!grid) return;
  grid.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const idx = [...grid.querySelectorAll('.product-card')].indexOf(card);
    if (idx === -1) return;
    const search = document.querySelector('#search')?.value.trim() || '';
    const statusVal = document.querySelector('[data-condition].active')?.dataset.condition || 'all';
    const modelVal = document.querySelector('[data-model].active')?.dataset.model || 'all';
    const filtered = PRODUCTS
        .filter(p => {
          const byC = statusVal === 'all' || p.condition === statusVal;
          const byS = !search || `${p.model} ${p.storage} ${p.color}`.toLowerCase().includes(search.toLowerCase());
          const byM = modelVal === 'all' || p.model === modelVal;
          return byC && byS && byM;
        })
        .sort((a, b) => modelOrder.indexOf(a.model) - modelOrder.indexOf(b.model) || b.price - a.price);
    const product = filtered[idx];
    if (product) openModal(product);
  });
  bindModal();
};


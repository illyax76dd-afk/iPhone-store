// =============================================================
// AppleX — script.js
// Каталог iPhone: фільтри, пошук, картки, модалка товару.
//
// Дані про товари (моделі, ціни, фото, кольори тощо) винесені
// в catalog-data.js — цей файл підключається на сторінці ПЕРШИМ
// (до script.js) і саме звідти сюди приходять PRODUCTS, MODEL_*,
// PRICE_TABLE і т.д. як глобальні змінні.
// =============================================================


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
// КАТАЛОГ — глобальний стан фільтрів
// -------------------------------------------------------------
const catalogState = {
  status:   'all',
  search:   '',
  models:   [],
  storages: [],
  sims:     [],
  years:    [],
  priceMin: null,
  priceMax: null,
};

function getFilteredProducts() {
  return PRODUCTS
    .filter(p => {
      const byCondition = catalogState.status === 'all' || p.condition === catalogState.status;
      const bySearch    = !catalogState.search ||
          `${p.model} ${p.storage} ${p.color}`.toLowerCase().includes(catalogState.search.toLowerCase());
      const byModel     = catalogState.models.length   === 0 || catalogState.models.includes(p.model);
      const byStorage   = catalogState.storages.length === 0 || catalogState.storages.includes(p.storage);
      const bySim       = catalogState.sims.length     === 0 || catalogState.sims.includes(p.sim);
      const byYear      = catalogState.years.length    === 0 || catalogState.years.includes(String(p.year));
      const byPriceMin  = catalogState.priceMin === null || p.price >= catalogState.priceMin;
      const byPriceMax  = catalogState.priceMax === null || p.price <= catalogState.priceMax;
      return byCondition && bySearch && byModel && byStorage && bySim && byYear && byPriceMin && byPriceMax;
    })
    .sort((a, b) => modelOrder.indexOf(a.model) - modelOrder.indexOf(b.model) || b.price - a.price);
}

// -------------------------------------------------------------
// КАТАЛОГ — фільтри, пошук, рендер карток з реальними фото
// -------------------------------------------------------------
function buildCatalog() {
  const grid = document.querySelector('[data-products]');
  if (!grid) return;

  // ── Ініціалізуємо стан з URL-параметра ──
  const urlStatus = qs('status') || 'all';
  if (urlStatus === 'new')  catalogState.status = 'Новий';
  else if (urlStatus === 'used') catalogState.status = 'Вживаний (Б/У)';
  else catalogState.status = 'all';

  const search       = document.querySelector('#search');
  const conditionBtns= [...document.querySelectorAll('[data-condition]')];
  const resetBtn     = document.querySelector('[data-reset]');
  const countEls     = [...document.querySelectorAll('[data-count]')];
  const summaryEl    = document.querySelector('[data-summary]');
  const emptyEl      = document.querySelector('[data-empty]');

  // ── Заповнюємо список серій з лічильниками ──
  const modelCounts = PRODUCTS.reduce((acc, p) => {
    acc[p.model] = (acc[p.model] || 0) + 1;
    return acc;
  }, {});
  const modelListEl = document.getElementById('modelFilterList');
  if (modelListEl) {
    modelListEl.innerHTML = modelOrder
      .filter(m => modelCounts[m])
      .map(m => `
        <label class="check-row">
          <input type="checkbox" data-model-cb="${m}">
          <span class="check-label">${m}</span>
          <span class="check-count">${modelCounts[m]}</span>
        </label>`)
      .join('');
  }

  // ── Accordion toggle ──
  document.querySelectorAll('[data-fg] .fg-header').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('[data-fg]').classList.toggle('fg-open'));
  });

  // ── Допоміжна: оновити лічильник активних фільтрів на заголовку ──
  function updateBadge(id, count) {
    const el = document.getElementById(id);
    if (!el) return;
    if (count > 0) { el.textContent = count; el.style.display = ''; }
    else el.style.display = 'none';
  }

  function render() {
    // Оновлюємо чіпи стану (тулбар)
    conditionBtns.forEach(btn => btn.classList.toggle('active',
        btn.dataset.condition === catalogState.status ||
        (catalogState.status === 'all' && btn.dataset.condition === 'all')));

    const filtered = getFilteredProducts();

    countEls.forEach(el => el.textContent = filtered.length);
    const condLabel = catalogState.status === 'all' ? 'Всі' : catalogState.status;
    const activeCount = catalogState.models.length + catalogState.storages.length +
        catalogState.sims.length + catalogState.years.length +
        (catalogState.priceMin !== null || catalogState.priceMax !== null ? 1 : 0);
    summaryEl.textContent = condLabel + (activeCount > 0 ? ` · ${activeCount} фільтр${activeCount > 4 ? 'ів' : activeCount > 1 ? 'и' : ''}` : '');

    // Значок кількості активних фільтрів на мобільній кнопці «Фільтри»
    const ftCount = document.getElementById('filtersToggleCount');
    if (ftCount) {
      if (activeCount > 0) { ftCount.textContent = activeCount; ftCount.style.display = ''; }
      else ftCount.style.display = 'none';
    }

    // Значки кількості на заголовках
    updateBadge('fgCountModel',   catalogState.models.length);
    updateBadge('fgCountStorage', catalogState.storages.length);
    updateBadge('fgCountSim',     catalogState.sims.length);
    updateBadge('fgCountYear',    catalogState.years.length);

    // Рендер карток
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

  // ── Пошук ──
  search?.addEventListener('input', e => { catalogState.search = e.target.value.trim(); render(); });

  // ── Стан (тулбар-чіпи) ──
  conditionBtns.forEach(btn => btn.addEventListener('click', () => {
    catalogState.status = btn.dataset.condition;
    const url = new URL(location.href);
    if (catalogState.status === 'all') url.searchParams.delete('status');
    else url.searchParams.set('status', catalogState.status === 'Новий' ? 'new' : 'used');
    history.replaceState({}, '', url);
    render();
  }));

  // ── Серія (checkboxes) ──
  document.addEventListener('change', e => {
    const cb = e.target;
    if (cb.matches('[data-model-cb]')) {
      const val = cb.dataset.modelCb;
      if (cb.checked) catalogState.models.push(val);
      else catalogState.models = catalogState.models.filter(m => m !== val);
      render();
    }
    if (cb.matches('[data-storage-cb]')) {
      const val = cb.dataset.storageCb;
      if (cb.checked) catalogState.storages.push(val);
      else catalogState.storages = catalogState.storages.filter(s => s !== val);
      render();
    }
    if (cb.matches('[data-sim-cb]')) {
      const val = cb.dataset.simCb;
      if (cb.checked) catalogState.sims.push(val);
      else catalogState.sims = catalogState.sims.filter(s => s !== val);
      render();
    }
    if (cb.matches('[data-year-cb]')) {
      const val = cb.dataset.yearCb;
      if (cb.checked) catalogState.years.push(val);
      else catalogState.years = catalogState.years.filter(y => y !== val);
      render();
    }
  });

  // ── Ціна ──
  document.getElementById('priceApply')?.addEventListener('click', () => {
    const minVal = document.getElementById('priceMin')?.value;
    const maxVal = document.getElementById('priceMax')?.value;
    catalogState.priceMin = minVal ? Number(minVal) : null;
    catalogState.priceMax = maxVal ? Number(maxVal) : null;
    render();
  });

  // ── Скинути ──
  resetBtn?.addEventListener('click', () => {
    catalogState.status   = 'all';
    catalogState.search   = '';
    catalogState.models   = [];
    catalogState.storages = [];
    catalogState.sims     = [];
    catalogState.years    = [];
    catalogState.priceMin = null;
    catalogState.priceMax = null;
    if (search) search.value = '';
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    if (priceMin) priceMin.value = '';
    if (priceMax) priceMax.value = '';
    document.querySelectorAll('[data-model-cb],[data-storage-cb],[data-sim-cb],[data-year-cb]')
        .forEach(cb => cb.checked = false);
    history.replaceState({}, '', location.pathname);
    render();
  });

  bindFiltersDrawer();

  render();
}

// -------------------------------------------------------------
// МОБІЛЬНІ ФІЛЬТРИ — висувна панель знизу
// На десктопі елементи керування приховані через CSS,
// тому ця логіка там просто не задіюється.
// -------------------------------------------------------------
function bindFiltersDrawer() {
  const panel    = document.getElementById('filtersPanel');
  const backdrop = document.getElementById('filtersBackdrop');
  const openBtn  = document.getElementById('filtersOpen');
  const closeBtn = document.getElementById('filtersClose');
  const applyBtn = document.getElementById('filtersApply');
  if (!panel || !backdrop || !openBtn) return;

  function openFilters() {
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('filters-open');
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn?.focus();
  }

  function closeFilters() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('filters-open');
    openBtn.setAttribute('aria-expanded', 'false');
  }

  openBtn.addEventListener('click', openFilters);
  closeBtn?.addEventListener('click', closeFilters);
  applyBtn?.addEventListener('click', closeFilters);
  backdrop.addEventListener('click', closeFilters);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeFilters();
  });

  // Якщо екран став широким — прибираємо мобільний стан,
  // щоб панель не лишилась "відкритою" на десктопі.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760 && panel.classList.contains('open')) closeFilters();
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  bindHeroButtons();
  buildCatalog();
});

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
    } else {
      alert(data.message || "Не вдалося оформити замовлення. Перевірте введені дані.");
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
    const filtered = getFilteredProducts();
    const product = filtered[idx];
    if (product) openModal(product);
  });
  bindModal();
};

// Закриття форми замовлення та повернення до картки товару
document.getElementById('modalBuyBackBtn')?.addEventListener('click', () => {
  const buyForm = document.getElementById('modalBuyForm');
  if (buyForm) {
    buyForm.style.display = 'none';
  }
});

// 1. Коли натискають кнопку "Купити" (відкриття форми)
const modalBuyBtn = document.getElementById('modalBuyBtn');
const modalBuyForm = document.getElementById('modalBuyForm');
const modalInfoCol = document.querySelector('.modal-info-col');

if (modalBuyBtn && modalBuyForm && modalInfoCol) {
  modalBuyBtn.addEventListener('click', () => {
    modalBuyForm.style.display = 'block';
    modalInfoCol.classList.add('buy-active'); // Ховаємо нижні кнопки та селектори
  });
}

// 2. Обробка нової кнопки "Повернутися до вибору" всередині форми
const modalBackToProductBtn = document.getElementById('modalBackToProductBtn');
if (modalBackToProductBtn && modalBuyForm && modalInfoCol) {
  modalBackToProductBtn.addEventListener('click', () => {
    modalBuyForm.style.display = 'none';
    modalInfoCol.classList.remove('buy-active'); // Повертаємо нижні кнопки та селектори назад
  });
}

// 3. ВАЖЛИВО: Знайдіть функцію, яка закриває В СЕ модальне вікно (на хрестик або клік поза вікном)
// і додайте туди скидання класу, щоб наступний відкритий iPhone не запускався з прихованими кнопками:
const modalClose = document.getElementById('modalClose');
if (modalClose && modalBuyForm && modalInfoCol) {
  modalClose.addEventListener('click', () => {
    modalBuyForm.style.display = 'none';
    modalInfoCol.classList.remove('buy-active'); // Скидаємо стан для наступних відкриттів
  });
}
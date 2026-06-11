const gearCatalog = [
  {
    id: "tent-duo",
    name: "雙人輕量帳",
    category: "shelter",
    owner: "北區共享倉",
    price: 420,
    deposit: 1800,
    available: 5,
    cleanliness: "已臭氧清潔",
    co2: 13.4,
    icon: "tent"
  },
  {
    id: "family-tarp",
    name: "家庭客廳帳天幕",
    category: "shelter",
    owner: "杉谷營地主",
    price: 560,
    deposit: 2200,
    available: 3,
    cleanliness: "防水複檢完成",
    co2: 18.2,
    icon: "tarp"
  },
  {
    id: "cook-set",
    name: "不鏽鋼炊事組",
    category: "cook",
    owner: "無痕料理箱",
    price: 230,
    deposit: 900,
    available: 7,
    cleanliness: "高溫清潔",
    co2: 6.8,
    icon: "cook"
  },
  {
    id: "stove",
    name: "低耗能卡式爐",
    category: "cook",
    owner: "溪畔補給站",
    price: 180,
    deposit: 700,
    available: 4,
    cleanliness: "火力檢測完成",
    co2: 5.6,
    icon: "stove"
  },
  {
    id: "sleep-pad",
    name: "可水洗睡墊",
    category: "sleep",
    owner: "東岸共享倉",
    price: 160,
    deposit: 600,
    available: 8,
    cleanliness: "需複檢",
    co2: 4.9,
    icon: "sleep"
  },
  {
    id: "solar-lamp",
    name: "太陽能營燈",
    category: "power",
    owner: "草丘能源箱",
    price: 150,
    deposit: 500,
    available: 9,
    cleanliness: "電量 92%",
    co2: 3.7,
    icon: "lamp"
  }
];

const sites = [
  {
    id: "forest",
    name: "杉谷共享營地",
    region: "中部",
    capacity: 8,
    basePrice: 1280,
    tags: ["林間平台", "裝備倉 1.2km", "可接駁"],
    note: "適合第一次使用共享裝備的家庭行程。"
  },
  {
    id: "river",
    name: "溪畔低衝擊營位",
    region: "北部",
    capacity: 6,
    basePrice: 980,
    tags: ["近溪谷", "炊事棚", "雨備完善"],
    note: "營地主提供歸還檢查桌，適合輕裝上山。"
  },
  {
    id: "grass",
    name: "草丘星光基地",
    region: "南部",
    capacity: 12,
    basePrice: 1580,
    tags: ["大草地", "親子友善", "能源補給"],
    note: "太陽能燈與行動電源庫存最充足。"
  },
  {
    id: "coast",
    name: "海階風土營區",
    region: "東部",
    capacity: 5,
    basePrice: 1180,
    tags: ["海景", "風繩加固", "在地導覽"],
    note: "建議加購安心保障，平台會提示強風裝備。"
  }
];

const checklistItems = [
  { id: "id", title: "確認承租人證件與押金授權", detail: "出發前 24 小時完成，可加速現場取件。" },
  { id: "weather", title: "檢查天候與營區公告", detail: "若遇豪雨或強風，可啟用改期提醒。" },
  { id: "clean", title: "閱讀裝備清潔與歸還規則", detail: "睡墊、炊具、帳篷分別有不同檢查項目。" },
  { id: "route", title: "預約共乘接駁或停車位置", detail: "交通方式會影響平台估算的碳減量。" },
  { id: "insurance", title: "確認安心保障適用範圍", detail: "包含租損協調、天候通知與第三方責任提示。" }
];

const hostTasks = [
  {
    id: "approve",
    title: "核准杉谷營地 4 人行程",
    detail: "承租人已完成押金授權，等待地主確認平台位置。",
    status: "待核准",
    action: "核准"
  },
  {
    id: "cleaning",
    title: "睡墊需複檢",
    detail: "上一筆歸還有水痕紀錄，出借前需拍照留存。",
    status: "清潔待辦",
    action: "安排清潔"
  },
  {
    id: "policy",
    title: "海階營區強風提示",
    detail: "若目的地選東部，建議承租人確認風繩與保障內容。",
    status: "保險提醒",
    action: "標示已提醒"
  }
];

const reviews = [
  {
    name: "李同學",
    rating: "4.9",
    text: "帳篷取件流程清楚，歸還時照著清潔檢查表做很安心。"
  },
  {
    name: "林地主",
    rating: "4.8",
    text: "平台把押金、清潔照和租損溝通集中管理，少了很多私訊來回。"
  },
  {
    name: "王家庭",
    rating: "5.0",
    text: "第一次露營不用一次買齊裝備，估碳結果也讓孩子很有參與感。"
  }
];

const transportSavings = {
  shuttle: 12,
  carpool: 7,
  drive: 0
};

const state = {
  region: "all",
  nights: 2,
  people: 4,
  transport: "shuttle",
  activeSite: "forest",
  filter: "all",
  insurance: true,
  selectedGear: {
    "tent-duo": 1,
    "cook-set": 1,
    "solar-lamp": 2
  },
  completedTasks: new Set(),
  checklist: loadChecklist()
};

const currency = new Intl.NumberFormat("zh-TW");

const elements = {
  tripForm: document.querySelector("#tripForm"),
  regionSelect: document.querySelector("#regionSelect"),
  dateInput: document.querySelector("#dateInput"),
  nightsInput: document.querySelector("#nightsInput"),
  peopleInput: document.querySelector("#peopleInput"),
  transportSelect: document.querySelector("#transportSelect"),
  siteResults: document.querySelector("#siteResults"),
  matchedCount: document.querySelector("#matchedCount"),
  carbonNumber: document.querySelector("#carbonNumber"),
  depositNumber: document.querySelector("#depositNumber"),
  cleaningNotice: document.querySelector("#cleaningNotice"),
  gearGrid: document.querySelector("#gearGrid"),
  bookingItems: document.querySelector("#bookingItems"),
  rentalTotal: document.querySelector("#rentalTotal"),
  depositTotal: document.querySelector("#depositTotal"),
  insuranceTotal: document.querySelector("#insuranceTotal"),
  insuranceButton: document.querySelector("#insuranceButton"),
  holdButton: document.querySelector("#holdButton"),
  checklist: document.querySelector("#checklist"),
  checkProgressText: document.querySelector("#checkProgressText"),
  checkProgressBar: document.querySelector("#checkProgressBar"),
  hostStats: document.querySelector("#hostStats"),
  hostTasks: document.querySelector("#hostTasks"),
  reviews: document.querySelector("#reviews")
};

function loadChecklist() {
  try {
    const saved = window.localStorage.getItem("camp-share-checklist");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
}

function saveChecklist() {
  try {
    window.localStorage.setItem("camp-share-checklist", JSON.stringify(state.checklist));
  } catch (error) {
    return undefined;
  }
  return undefined;
}

function money(amount) {
  return `NT$${currency.format(amount)}`;
}

function selectedEntries() {
  return Object.entries(state.selectedGear)
    .map(([id, quantity]) => ({
      gear: gearCatalog.find((item) => item.id === id),
      quantity
    }))
    .filter((entry) => entry.gear && entry.quantity > 0);
}

function visibleSites() {
  return sites.filter((site) => {
    const regionMatched = state.region === "all" || site.region === state.region;
    const capacityMatched = site.capacity >= state.people;
    return regionMatched && capacityMatched;
  });
}

function calculateTotals() {
  const entries = selectedEntries();
  const rental = entries.reduce((sum, entry) => {
    return sum + entry.gear.price * entry.quantity * state.nights;
  }, 0);
  const deposit = entries.reduce((sum, entry) => {
    return sum + entry.gear.deposit * entry.quantity;
  }, 0);
  const insurance = state.insurance ? Math.max(120, state.people * state.nights * 45) : 0;
  const co2FromGear = entries.reduce((sum, entry) => {
    return sum + entry.gear.co2 * entry.quantity;
  }, 0);
  const co2 = co2FromGear + transportSavings[state.transport] + state.people * state.nights * 0.8;

  return {
    rental,
    deposit,
    insurance,
    co2,
    hasCleaningRisk: entries.some((entry) => entry.gear.cleanliness.includes("需複檢"))
  };
}

function iconMarkup(type) {
  const icons = {
    tent: '<path d="M8 42 L24 10 L48 42 Z"/><path d="M24 10 L56 42"/><path d="M28 42 L35 28 L42 42"/>',
    tarp: '<path d="M8 18 C22 8 42 8 56 18 L50 42 L14 42 Z"/><path d="M18 18 L14 42"/><path d="M46 18 L50 42"/>',
    cook: '<path d="M14 24 H50"/><path d="M18 24 L22 46 H42 L46 24"/><path d="M24 14 C24 8 34 8 34 14"/><path d="M38 14 C38 8 48 8 48 14"/>',
    stove: '<rect x="12" y="28" width="40" height="18"/><path d="M20 28 C22 18 42 18 44 28"/><path d="M24 16 H40"/>',
    sleep: '<path d="M16 16 H44 C50 16 54 20 54 26 V46 H16 Z"/><path d="M16 28 H54"/><path d="M24 16 V28"/>',
    lamp: '<path d="M24 14 H40 L46 34 H18 Z"/><path d="M32 14 V6"/><path d="M24 46 H40"/><path d="M28 34 L24 46"/><path d="M36 34 L40 46"/>'
  };

  return `<svg viewBox="0 0 64 64" aria-hidden="true">${icons[type] || icons.tent}</svg>`;
}

function renderSites() {
  const matches = visibleSites();
  elements.matchedCount.textContent = String(matches.length);

  if (!matches.some((site) => site.id === state.activeSite) && matches[0]) {
    state.activeSite = matches[0].id;
  }

  elements.siteResults.innerHTML = matches.length
    ? matches.map((site) => {
      const active = site.id === state.activeSite ? " active" : "";
      const tags = site.tags.map((tag) => `<span>${tag}</span>`).join("");
      return `
        <article class="site-card${active}">
          <h3>${site.name}</h3>
          <p>${site.note}</p>
          <div class="tag-row">${tags}</div>
          <strong>${site.region}｜最多 ${site.capacity} 人｜${money(site.basePrice)} / 晚</strong>
          <button type="button" data-site="${site.id}">${active ? "已選擇" : "選擇營地"}</button>
        </article>
      `;
    }).join("")
    : '<div class="empty-state">目前沒有符合條件的營地，請調整地區或人數。</div>';

  document.querySelectorAll("[data-site-pin]").forEach((pin) => {
    pin.classList.toggle("active", pin.dataset.sitePin === state.activeSite);
  });
}

function renderGear() {
  const filtered = gearCatalog.filter((gear) => state.filter === "all" || gear.category === state.filter);

  elements.gearGrid.innerHTML = filtered.map((gear) => {
    const quantity = state.selectedGear[gear.id] || 0;
    return `
      <article class="gear-card">
        <div class="gear-visual">${iconMarkup(gear.icon)}</div>
        <div class="gear-meta">
          <div class="tag-row">
            <span>${gear.owner}</span>
            <span class="status-pill">${gear.cleanliness}</span>
          </div>
          <h3>${gear.name}</h3>
          <p>${money(gear.price)} / 晚｜押金 ${money(gear.deposit)}｜可借 ${gear.available} 件</p>
          <p>共享替代購買約減少 ${gear.co2.toFixed(1)} kg CO2e / 件</p>
          <div class="gear-actions" aria-label="${gear.name} 數量">
            <button type="button" data-gear-remove="${gear.id}" aria-label="減少 ${gear.name}">−</button>
            <output>${quantity}</output>
            <button type="button" data-gear-add="${gear.id}" aria-label="增加 ${gear.name}">＋</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderSummary() {
  const entries = selectedEntries();
  const totals = calculateTotals();

  elements.bookingItems.innerHTML = entries.length
    ? entries.map((entry) => `
      <div class="summary-row">
        <div>
          <strong>${entry.gear.name} × ${entry.quantity}</strong>
          <small>${entry.gear.cleanliness}｜${entry.gear.owner}</small>
        </div>
        <strong>${money(entry.gear.price * entry.quantity * state.nights)}</strong>
      </div>
    `).join("")
    : '<div class="empty-state">尚未選擇裝備，請從共享裝備庫加入。</div>';

  elements.rentalTotal.textContent = money(totals.rental);
  elements.depositTotal.textContent = money(totals.deposit);
  elements.insuranceTotal.textContent = money(totals.insurance);
  elements.depositNumber.textContent = money(totals.deposit);
  elements.carbonNumber.textContent = `${totals.co2.toFixed(1)} kg`;
  elements.cleaningNotice.textContent = totals.hasCleaningRisk
    ? "有裝備標示需複檢，建議出借前完成清潔照片與功能確認。"
    : "目前裝備清潔紀錄完整，可安排出借。";
}

function renderChecklist() {
  const completed = checklistItems.filter((item) => state.checklist[item.id]).length;
  const percent = Math.round((completed / checklistItems.length) * 100);

  elements.checkProgressText.textContent = `${completed} / ${checklistItems.length}`;
  elements.checkProgressBar.style.width = `${percent}%`;
  elements.checklist.innerHTML = checklistItems.map((item) => {
    const checked = state.checklist[item.id] ? " checked" : "";
    return `
      <label class="check-item">
        <input type="checkbox" data-check="${item.id}"${checked}>
        <span>
          <strong>${item.title}</strong>
          <small>${item.detail}</small>
        </span>
      </label>
    `;
  }).join("");
}

function renderHostDashboard() {
  const totals = calculateTotals();
  const doneCount = state.completedTasks.size;
  const stats = [
    { label: "今日待辦", value: hostTasks.length - doneCount },
    { label: "預估租金", value: money(totals.rental) },
    { label: "減碳回報", value: `${totals.co2.toFixed(1)} kg` }
  ];

  elements.hostStats.innerHTML = stats.map((item) => `
    <div class="stat-tile">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join("");

  elements.hostTasks.innerHTML = hostTasks.map((task) => {
    const done = state.completedTasks.has(task.id);
    return `
      <article class="task-card${done ? " done" : ""}">
        <header>
          <h3>${task.title}</h3>
          <span class="status-pill">${done ? "已處理" : task.status}</span>
        </header>
        <p>${task.detail}</p>
        <button type="button" data-task="${task.id}">${done ? "完成" : task.action}</button>
      </article>
    `;
  }).join("");
}

function renderReviews() {
  elements.reviews.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <header>
        <h3>${review.name}</h3>
        <span class="rating">${review.rating} / 5</span>
      </header>
      <p>${review.text}</p>
    </article>
  `).join("");
}

function renderInsuranceButton() {
  elements.insuranceButton.setAttribute("aria-pressed", String(state.insurance));
  elements.insuranceButton.textContent = state.insurance ? "已加入" : "未加入";
}

function renderAll() {
  renderSites();
  renderGear();
  renderSummary();
  renderChecklist();
  renderHostDashboard();
  renderReviews();
  renderInsuranceButton();
}

function updateTripFromForm() {
  state.region = elements.regionSelect.value;
  state.nights = Math.max(1, Number(elements.nightsInput.value) || 1);
  state.people = Math.max(1, Number(elements.peopleInput.value) || 1);
  state.transport = elements.transportSelect.value;
}

function changeGearQuantity(id, delta) {
  const gear = gearCatalog.find((item) => item.id === id);
  if (!gear) return;

  const current = state.selectedGear[id] || 0;
  const next = Math.max(0, Math.min(gear.available, current + delta));

  if (next === 0) {
    delete state.selectedGear[id];
  } else {
    state.selectedGear[id] = next;
  }

  renderGear();
  renderSummary();
  renderHostDashboard();
}

function setTodayDefault() {
  const today = new Date();
  const yyyyMmDd = today.toISOString().slice(0, 10);
  elements.dateInput.min = yyyyMmDd;
  if (!elements.dateInput.value) {
    elements.dateInput.value = yyyyMmDd;
  }
}

elements.tripForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateTripFromForm();
  renderSites();
  renderSummary();
  renderHostDashboard();
});

elements.siteResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-site]");
  if (!button) return;
  state.activeSite = button.dataset.site;
  renderSites();
});

elements.gearGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-gear-add]");
  const removeButton = event.target.closest("[data-gear-remove]");

  if (addButton) {
    changeGearQuantity(addButton.dataset.gearAdd, 1);
  }

  if (removeButton) {
    changeGearQuantity(removeButton.dataset.gearRemove, -1);
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderGear();
  });
});

elements.insuranceButton.addEventListener("click", () => {
  state.insurance = !state.insurance;
  renderInsuranceButton();
  renderSummary();
  renderHostDashboard();
});

elements.checklist.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-check]");
  if (!checkbox) return;
  state.checklist[checkbox.dataset.check] = checkbox.checked;
  saveChecklist();
  renderChecklist();
});

elements.hostTasks.addEventListener("click", (event) => {
  const button = event.target.closest("[data-task]");
  if (!button) return;

  if (state.completedTasks.has(button.dataset.task)) {
    state.completedTasks.delete(button.dataset.task);
  } else {
    state.completedTasks.add(button.dataset.task);
  }

  renderHostDashboard();
});

elements.holdButton.addEventListener("click", () => {
  const entries = selectedEntries();
  const message = entries.length
    ? "已模擬保留此行程 20 分鐘，請檢查押金、清潔與保險提示。"
    : "請先選擇至少一件共享裝備，再保留行程。";
  elements.holdButton.textContent = message;
  window.setTimeout(() => {
    elements.holdButton.textContent = "保留此行程 20 分鐘";
  }, 2200);
});

setTodayDefault();
renderAll();

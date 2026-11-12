"use strict";

const STORAGE_KEY = "commonTable.smartCanteen.v1";
const MENU_VERSION = 2;
const MENU_V2_ITEM_IDS = ["food-13", "food-14", "food-15", "food-16", "food-17", "food-18", "food-19", "food-20"];
const CATEGORIES = ["All", "Breakfast", "South Indian", "North Indian", "Snacks", "Meals", "Beverages", "Desserts"];
const ORDER_STATUSES = ["Placed", "Accepted", "Preparing", "Ready", "Completed"];
const TAX_RATE = 0.05;
const DEFAULT_PREP_MINUTES = 5;
const FOOD_IMAGES = {
  breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
  south: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
  north: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  snack: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  meal: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  beverage: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  dessert: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
};

const sampleMenu = [
  { id: "food-1", name: "Masala dosa", category: "South Indian", price: 95, prep: 12, description: "Crisp, golden, with a potato masala center.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", available: true, stock: 18, popular: 98 },
  { id: "food-2", name: "Paneer rice bowl", category: "Meals", price: 149, prep: 14, description: "Charred paneer, warm rice, and green chutney.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80", available: true, stock: 12, popular: 96 },
  { id: "food-3", name: "Avocado toast", category: "Breakfast", price: 120, prep: 8, description: "Sourdough, smashed avocado, a little chili.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", available: true, stock: 9, popular: 89 },
  { id: "food-4", name: "Veg samosa", category: "Snacks", price: 35, prep: 5, description: "Flaky pastry, spiced potato, mint dip.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", available: true, stock: 3, popular: 91 },
  { id: "food-5", name: "Rajma chawal", category: "North Indian", price: 115, prep: 13, description: "Slow-cooked kidney beans with steamed rice.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", available: true, stock: 15, popular: 86 },
  { id: "food-6", name: "Filter coffee", category: "Beverages", price: 30, prep: 4, description: "Strong, smooth, and brewed the South Indian way.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", available: true, stock: 30, popular: 93 },
  { id: "food-7", name: "Mango kulfi", category: "Desserts", price: 55, prep: 2, description: "Creamy mango kulfi with crushed pistachio.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", available: true, stock: 0, popular: 83 },
  { id: "food-8", name: "Idli & sambar", category: "South Indian", price: 65, prep: 8, description: "Pillowy idlis, hot sambar, coconut chutney.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", available: true, stock: 22, popular: 82 },
  { id: "food-9", name: "Chole kulche", category: "North Indian", price: 105, prep: 12, description: "Tangy chickpeas and soft, toasted kulche.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", available: true, stock: 10, popular: 81 },
  { id: "food-10", name: "Masala chai", category: "Beverages", price: 20, prep: 4, description: "A warm cup of spiced tea, brewed fresh.", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80", available: true, stock: 40, popular: 90 },
  { id: "food-11", name: "Veg puff", category: "Snacks", price: 28, prep: 3, description: "Buttery, flaky layers with a savory filling.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", available: true, stock: 14, popular: 78 },
  { id: "food-12", name: "Brownie bite", category: "Desserts", price: 45, prep: 3, description: "Fudgy chocolate brownie, baked this morning.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", available: true, stock: 7, popular: 88 },
  { id: "food-13", name: "Poha bowl", category: "Breakfast", price: 55, prep: 6, description: "Soft poha tossed with peanuts, curry leaves, and lemon.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", available: true, stock: 18, popular: 87 },
  { id: "food-14", name: "Onion uttapam", category: "South Indian", price: 80, prep: 10, description: "A soft, savory rice pancake topped with onion and herbs.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", available: true, stock: 12, popular: 85 },
  { id: "food-15", name: "Veg pulao", category: "Meals", price: 110, prep: 12, description: "Fragrant rice with seasonal vegetables and warm spices.", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80", available: true, stock: 15, popular: 84 },
  { id: "food-16", name: "Paneer tikka wrap", category: "Snacks", price: 99, prep: 10, description: "Spiced paneer, crunchy vegetables, and mint in a wrap.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", available: true, stock: 10, popular: 89 },
  { id: "food-17", name: "Chole bhature", category: "North Indian", price: 120, prep: 15, description: "Spiced chickpeas with fluffy, golden-fried bhature.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", available: true, stock: 10, popular: 90 },
  { id: "food-18", name: "Mango lassi", category: "Beverages", price: 45, prep: 4, description: "A chilled yogurt drink blended with sweet mango.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", available: true, stock: 20, popular: 88 },
  { id: "food-19", name: "Gulab jamun", category: "Desserts", price: 40, prep: 2, description: "Soft milk dumplings soaked in fragrant sugar syrup.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", available: true, stock: 24, popular: 86 },
  { id: "food-20", name: "Fresh lime soda", category: "Beverages", price: 35, prep: 3, description: "Fresh lime, chilled soda, and a little sweetness.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", available: true, stock: 18, popular: 83 }
];

const sampleTables = Array.from({ length: 12 }, (_, index) => ({
  id: `table-${index + 1}`,
  number: index + 1,
  capacity: index < 4 ? 2 : index < 9 ? 4 : 6,
  status: [2, 5, 9].includes(index) ? "Occupied" : [6, 10].includes(index) ? "Reserved" : "Available",
  reservedBy: [6, 10].includes(index) ? "Campus club" : null,
  reservationUserId: null
}));

const sampleOrders = [
  { id: "CT-26041", token: 41, userId: "demo", customerName: "Demo student", email: "demo@campus.edu", items: [{ id: "food-1", name: "Masala dosa", price: 95, quantity: 1 }, { id: "food-6", name: "Filter coffee", price: 30, quantity: 1 }], type: "Takeaway", tableId: null, subtotal: 125, tax: 6.25, total: 131.25, paymentMethod: "Cash", paymentStatus: "Pending", status: "Preparing", createdAt: Date.now() - 6 * 60000 },
  { id: "CT-26040", token: 40, userId: "demo", customerName: "Demo student", email: "demo@campus.edu", items: [{ id: "food-4", name: "Veg samosa", price: 35, quantity: 2 }], type: "Takeaway", tableId: null, subtotal: 70, tax: 3.5, total: 73.5, paymentMethod: "UPI", paymentStatus: "Paid", status: "Ready", createdAt: Date.now() - 12 * 60000 }
];

function freshState() {
  return {
    menu: structuredClone(sampleMenu),
    menuVersion: MENU_VERSION,
    tables: structuredClone(sampleTables),
    orders: structuredClone(sampleOrders),
    users: [],
    currentUserId: null,
    cart: [],
    reservations: [],
    feedback: [],
    service: { opening: "08:00", closing: "18:00", announcement: "Freshly made, right here on campus." },
    nextToken: 42,
    theme: "light"
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return freshState();
  try {
    const saved = JSON.parse(raw);
    const defaults = freshState();
    const menu = Array.isArray(saved.menu) ? saved.menu : defaults.menu;
    if (Array.isArray(saved.menu) && (Number(saved.menuVersion) || 1) < MENU_VERSION) {
      const savedIds = new Set(menu.map((item) => item.id));
      menu.push(...defaults.menu.filter((item) => MENU_V2_ITEM_IDS.includes(item.id) && !savedIds.has(item.id)));
    }
    return {
      ...defaults,
      ...saved,
      menuVersion: MENU_VERSION,
      service: { ...defaults.service, ...(saved.service || {}) },
      menu,
      tables: Array.isArray(saved.tables) ? saved.tables : defaults.tables,
      orders: Array.isArray(saved.orders) ? saved.orders : defaults.orders,
      users: Array.isArray(saved.users) ? saved.users : [],
      cart: Array.isArray(saved.cart) ? saved.cart : [],
      reservations: Array.isArray(saved.reservations) ? saved.reservations : [],
      feedback: Array.isArray(saved.feedback) ? saved.feedback : []
    };
  } catch (error) {
    console.error("Could not read saved canteen data.", error);
    return freshState();
  }
}

let state = loadState();
let selectedCategory = "All";
let authMode = "login";
let deferredInstallPrompt = null;
let lastNearReadyOrder = null;
const lastQueuePositions = new Map();

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const money = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const activeOrders = () => state.orders.filter((order) => !["Ready", "Completed", "Cancelled"].includes(order.status)).sort((a, b) => a.token - b.token);
const currentUser = () => state.users.find((user) => user.id === state.currentUserId) || null;
const initials = (name) => String(name || "G").trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
const notify = (message, type = "success") => {
  const region = $("#toastRegion");
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3600);
};

function saveState(message) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (message) notify(message);
    return true;
  } catch (error) {
    console.error("Could not save canteen data to localStorage.", error);
    notify("Your browser couldn't save this change. Check local storage space and try again.", "error");
    return false;
  }
}

function showView(name) {
  const target = document.querySelector(`[data-view="${name}"]`);
  if (!target) return;
  $$(".view").forEach((view) => {
    const active = view === target;
    view.classList.toggle("active", active);
    view.hidden = !active;
  });
  $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === name));
  $(".main-nav").classList.remove("open");
  $("#mobileMenuToggle").setAttribute("aria-expanded", "false");
  if (name === "login") renderLogin();
  if (name === "profile") renderProfile();
  if (name === "admin") renderAdmin();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function crowdInfo() {
  const waiting = activeOrders().length;
  const available = state.tables.filter((table) => table.status === "Available").length;
  const ratio = state.tables.length ? (state.tables.length - available) / state.tables.length : 0;
  const level = waiting >= 7 || ratio >= .8 ? "High" : waiting >= 3 || ratio >= .55 ? "Medium" : "Low";
  return { level, waiting, available };
}

function estimatedWait(order) {
  const queue = activeOrders();
  const firstInQueue = queue[0];
  const ahead = queue.filter((candidate) => candidate.token < order.token);
  const aheadMinutes = ahead.reduce((minutes, candidate) => minutes + (candidate.id === firstInQueue?.id ? remainingPrepMinutes(candidate) : orderPrepMinutes(candidate)), 0);
  const ownMinutes = order.id === firstInQueue?.id ? remainingPrepMinutes(order) : orderPrepMinutes(order);
  return Math.max(1, Math.ceil(aheadMinutes + ownMinutes));
}

function orderPrepMinutes(order) {
  const prepTimes = (order.items || []).map((line) => {
    const menuItem = state.menu.find((item) => item.id === line.id);
    return Number(line.prep) || Number(menuItem?.prep) || DEFAULT_PREP_MINUTES;
  });
  return prepTimes.length ? Math.max(...prepTimes) : DEFAULT_PREP_MINUTES;
}

function queuedPrepMinutes() {
  const queue = activeOrders();
  return queue.reduce((minutes, order, index) => minutes + (index === 0 ? remainingPrepMinutes(order) : orderPrepMinutes(order)), 0);
}

function preorderLeadMinutes() {
  return Math.ceil(Math.max(10, queuedPrepMinutes() + cartPrepMinutes()));
}

function remainingPrepMinutes(order) {
  const startedAt = Number(order.startedAt) || Number(order.createdAt);
  const elapsed = order.status === "Preparing" ? Math.max(0, Date.now() - startedAt) / 60000 : 0;
  return Math.max(0, orderPrepMinutes(order) - elapsed);
}

function cartPrepMinutes() {
  const prepTimes = state.cart.map((line) => {
    const item = state.menu.find((entry) => entry.id === line.id);
    return Number(item?.prep) || DEFAULT_PREP_MINUTES;
  });
  return prepTimes.length ? Math.max(...prepTimes) : DEFAULT_PREP_MINUTES;
}

function minimumPickupTime() {
  const leadMinutes = preorderLeadMinutes();
  const minimum = new Date();
  minimum.setSeconds(0, 0);
  minimum.setMinutes(minimum.getMinutes() + leadMinutes);
  if (minimum.getTime() < Date.now() + leadMinutes * 60000) minimum.setMinutes(minimum.getMinutes() + 1);
  return minimum;
}

function formatTime(dateValue) {
  return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date(dateValue));
}

function formatPickupTime(dateValue) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(dateValue));
}

function localDateTimeValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function updatePreorderPickupControl() {
  const input = $("#preorderPickupTime");
  const isPreorder = $("#orderType").value === "Pre-order";
  $("#preorderPickupLabel").hidden = !isPreorder;
  input.required = isPreorder;

  const minimum = minimumPickupTime();
  input.min = localDateTimeValue(minimum);

  if (!input.value || new Date(input.value).getTime() < minimum.getTime()) {
    input.value = localDateTimeValue(new Date(minimum.getTime() + 5 * 60000));
  }
  $("#preorderPickupLabel small").textContent = `Choose at least ${preorderLeadMinutes()} minutes from now.`;
}

function renderHeader() {
  const user = currentUser();
  $("#headerUser").textContent = user ? user.name.split(/\s+/)[0] : "Guest";
  $("#headerAvatar").textContent = initials(user?.name);
  $("#profileButton").setAttribute("aria-label", user ? `View ${user.name}'s account` : "Sign in or view your account");
  const count = state.cart.reduce((sum, line) => sum + line.quantity, 0);
  $("#cartCount").textContent = count;
  $("#menuCartCount").textContent = count;
  $("#drawerCartCount").textContent = count;
  document.body.classList.toggle("dark", state.theme === "dark");
}

function renderService() {
  $("#announcementText").textContent = state.service.announcement || "Freshly made, right here on campus.";
  const now = new Date();
  const current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const open = state.service.opening;
  const close = state.service.closing;
  const isOpen = open <= close ? current >= open && current < close : current >= open || current < close;
  $("#hoursNote").textContent = isOpen ? `Open · ${open}–${close}` : `Closed · opens ${open}`;
  $("#openingTime").value = open;
  $("#closingTime").value = close;
  $("#serviceAnnouncement").value = state.service.announcement;
}

function stockLabel(item) {
  if (!item.available || Number(item.stock) <= 0) return { text: "Sold out", className: "sold" };
  if (Number(item.stock) <= 4) return { text: `Only ${item.stock} left`, className: "low" };
  return { text: "Available", className: "" };
}

function foodCard(item) {
  const stock = stockLabel(item);
  const image = item.image || FOOD_IMAGES[categoryImageKey(item.category)] || FOOD_IMAGES.meal;
  return `<article class="food-card">
    <div class="food-image"><img src="${escapeHTML(image)}" alt="${escapeHTML(item.name)}" loading="lazy">
      <span class="category-tag">${escapeHTML(item.category)}</span>
      <span class="stock-tag ${stock.className}">${stock.text}</span>
    </div>
    <div class="food-content"><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description || "Made fresh at the campus canteen.")} · ${Number(item.prep) || 10} min</p>
      <div class="food-meta"><span class="food-price">${money(item.price)} <small>· ${Number(item.prep) || 10} min</small></span><button class="add-button" data-add-item="${escapeHTML(item.id)}" aria-label="Add ${escapeHTML(item.name)} to bag" ${stock.className === "sold" ? "disabled" : ""}>+</button></div>
    </div>
  </article>`;
}

function categoryImageKey(category) {
  const value = String(category || "").toLowerCase();
  if (value.includes("breakfast")) return "breakfast";
  if (value.includes("south")) return "south";
  if (value.includes("north")) return "north";
  if (value.includes("snack")) return "snack";
  if (value.includes("beverage")) return "beverage";
  if (value.includes("dessert")) return "dessert";
  return "meal";
}

function renderMenu() {
  const available = state.menu.filter((item) => item.available);
  const popular = [...available].sort((a, b) => b.popular - a.popular).slice(0, 4);
  $("#featuredMenu").innerHTML = popular.length ? popular.map(foodCard).join("") : "<div class=\"empty-state\">The kitchen is updating today's menu. Check back soon.</div>";
  $("#categoryList").innerHTML = CATEGORIES.map((category) => `<button class="category-chip ${selectedCategory === category ? "active" : ""}" data-category="${escapeHTML(category)}" aria-pressed="${selectedCategory === category}">${escapeHTML(category)}</button>`).join("");
  const query = $("#menuSearch").value.trim().toLowerCase();
  const sort = $("#menuSort").value;
  let items = state.menu.filter((item) => item.available)
    .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
    .filter((item) => `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query));
  if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
  else if (sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
  else items.sort((a, b) => b.popular - a.popular);
  $("#menuResultCount").textContent = `${items.length} ${items.length === 1 ? "dish" : "dishes"} to make your day`;
  $("#menuGrid").innerHTML = items.length ? items.map(foodCard).join("") : '<div class="empty-state">Nothing on the menu matches that. Try another search or category.</div>';
}

function renderTables() {
  const counts = {
    Available: state.tables.filter((table) => table.status === "Available").length,
    Occupied: state.tables.filter((table) => table.status === "Occupied").length,
    Reserved: state.tables.filter((table) => table.status === "Reserved").length
  };
  $("#tableSummary").innerHTML = Object.entries(counts).map(([label, count]) => `<div class="table-summary-card"><i class="${label.toLowerCase()}"></i><div><strong>${count}</strong><br><span>${label}${label.endsWith("d") ? "" : ""}</span></div></div>`).join("");
  const crowd = crowdInfo();
  $("#tableCrowd").textContent = `${crowd.level} crowd`;
  $("#tableGrid").innerHTML = state.tables.length ? state.tables.map((table) => {
    const own = table.reservationUserId && table.reservationUserId === state.currentUserId;
    const action = own ? `<button class="table-action release" data-release-table="${escapeHTML(table.id)}">Release reservation</button>` :
      table.status === "Available" ? `<button class="table-action" data-reserve-table="${escapeHTML(table.id)}">Reserve a seat</button>` :
      `<button class="table-action" disabled>${table.status === "Reserved" ? "Currently reserved" : "Enjoying a meal"}</button>`;
    return `<article class="table-card"><div class="table-card-top"><div><div class="table-number">T${String(table.number).padStart(2, "0")}</div><span class="table-capacity">Seats ${table.capacity}</span></div><span class="table-status ${table.status.toLowerCase()}"><i></i>${own ? "Yours" : escapeHTML(table.status)}</span></div>${action}</article>`;
  }).join("") : '<div class="empty-state">No tables have been added yet.</div>';
  $("#statVacant").textContent = counts.Available;
  $("#statTablesTotal").textContent = `of ${state.tables.length} tables`;
  $("#teaserVacant").textContent = counts.Available;
  $("#checkoutTable").innerHTML = `<option value="">Choose a table</option>${state.tables.filter((table) => table.status === "Available" || table.reservationUserId === state.currentUserId).map((table) => `<option value="${escapeHTML(table.id)}">Table ${table.number} · ${table.capacity} seats${table.reservationUserId === state.currentUserId ? " · your reservation" : ""}</option>`).join("")}`;
}

function renderDashboardStats() {
  const crowd = crowdInfo();
  $("#statOrders").textContent = activeOrders().length;
  $("#statCrowd").textContent = crowd.level;
  $("#statQueue").textContent = `${crowd.waiting} ${crowd.waiting === 1 ? "order" : "orders"} waiting`;
  const waits = activeOrders().map(estimatedWait);
  const averageWait = waits.length ? Math.ceil(waits.reduce((total, wait) => total + wait, 0) / waits.length) : 0;
  $("#statWait").textContent = `${averageWait}m`;
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, line) => {
    const item = state.menu.find((menuItem) => menuItem.id === line.id);
    return sum + (item ? Number(item.price) * line.quantity : 0);
  }, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { subtotal, tax, total: subtotal + tax };
}

function renderCart() {
  updatePreorderPickupControl();
  const entries = state.cart.map((line) => ({ line, item: state.menu.find((item) => item.id === line.id) })).filter((entry) => entry.item);
  $("#cartItems").innerHTML = entries.length ? entries.map(({ line, item }) => `<article class="cart-line"><div><h3>${escapeHTML(item.name)}</h3><p>${money(item.price)} each</p><div class="quantity-control"><button data-quantity="-1" data-item-id="${escapeHTML(item.id)}" aria-label="Remove one ${escapeHTML(item.name)}">−</button><span>${line.quantity}</span><button data-quantity="1" data-item-id="${escapeHTML(item.id)}" aria-label="Add one ${escapeHTML(item.name)}">+</button></div></div><strong>${money(item.price * line.quantity)}</strong></article>`).join("") : '<div class="cart-empty">Your bag is taking a little break.<br>Find something lovely on the menu.</div>';
  const totals = cartTotals();
  $("#cartSubtotal").textContent = money(totals.subtotal);
  $("#cartTax").textContent = money(totals.tax);
  $("#cartTotal").textContent = money(totals.total);
  $("#checkoutButton").disabled = !entries.length;
  $("#checkoutButton").style.opacity = entries.length ? "1" : ".55";
  $("#checkoutTableLabel").hidden = $("#orderType").value !== "Dine-in";
}

function orderRows(orders, allowActions) {
  if (!orders.length) return '<div class="history-empty">No orders here just yet. Your next favorite is waiting on the menu.</div>';
  return orders.map((order) => {
    const items = order.items.map((item) => `${item.quantity} × ${escapeHTML(item.name)}`).join(", ");
    const statusIndex = ORDER_STATUSES.indexOf(order.status);
    const progress = order.status === "Cancelled" ? "" : `<div class="order-progress">${ORDER_STATUSES.map((status, index) => `<span class="progress-step ${index <= statusIndex ? "done" : ""}">${status}</span>`).join("")}</div>`;
    const wait = ["Ready", "Completed", "Cancelled"].includes(order.status) ? `<span>${order.status === "Ready" ? "Ready for pickup" : order.status === "Completed" ? "Order complete" : "Order cancelled"}</span>` : order.type === "Pre-order" && order.pickupAt ? `<span>Pickup at <strong>${formatPickupTime(order.pickupAt)}</strong></span>` : `<span>Est. ready <strong>${formatTime(Date.now() + estimatedWait(order) * 60000)}</strong> · about ${estimatedWait(order)} min</span>`;
    const cancel = allowActions && order.status === "Placed" ? `<button class="small-button" data-cancel-order="${escapeHTML(order.id)}">Cancel order</button>` : "";
    const reorderButton = allowActions && ["Completed", "Cancelled"].includes(order.status) ? `<button class="small-button" data-reorder="${escapeHTML(order.id)}">Order again</button>` : "";
    return `<article class="order-card"><div class="order-card-head"><div><div class="order-token">Token #${String(order.token).padStart(3, "0")}</div><div class="order-id">${escapeHTML(order.id)} · ${formatTime(order.createdAt)} · ${escapeHTML(order.type)}</div></div><span class="status-pill ${order.status.toLowerCase()}">${escapeHTML(order.status)}</span></div><div class="order-items">${items}</div>${progress}<div class="order-card-bottom"><span>${wait}</span><span>Payment: <strong>${escapeHTML(order.paymentStatus)}</strong> · ${money(order.total)}</span>${cancel}${reorderButton}</div></article>`;
  }).join("");
}

function renderOrders() {
  const user = currentUser();
  const orders = user ? state.orders.filter((order) => order.userId === user.id).sort((a, b) => b.createdAt - a.createdAt) : [];
  const active = orders.filter((order) => !["Completed", "Cancelled"].includes(order.status));
  const history = orders.filter((order) => ["Completed", "Cancelled"].includes(order.status));
  $("#personalOrders").innerHTML = user ? `<div class="queue-panel"><div class="queue-panel-head"><div><p class="eyebrow">YOUR LIVE QUEUE</p><h2>${active.length ? `${active.length} order${active.length === 1 ? "" : "s"} in progress` : "Nothing cooking for you yet"}</h2></div><span class="queue-count">${active.length ? `${active.length} active` : "Ready when you are"}</span></div>${active.length ? orderRows(active, true) : '<div class="history-empty">Pick something tasty from the menu and your live token will appear here.</div>'}</div>` :
    `<div class="queue-panel"><div class="queue-panel-head"><div><p class="eyebrow">YOUR LIVE QUEUE</p><h2>Sign in to follow your token</h2></div><span class="queue-count">${activeOrders().length} in queue</span></div><p class="order-muted">Orders placed from this browser stay with your account.</p><button class="button button-dark" data-view-link="login">Sign in or join <span>→</span></button></div>`;
  $("#orderHistory").innerHTML = user ? orderRows(history, true) : '<div class="history-empty">Sign in to see your past orders.</div>';
}

function renderLogin() {
  const registering = authMode === "register";
  $("#loginCard").innerHTML = `<p class="eyebrow">${registering ? "JOIN THE TABLE" : "WELCOME BACK"}</p><h2>${registering ? "Make yourself at home." : "Sign in to your account."}</h2><p>${registering ? "Create an account to keep your canteen activity together." : "Your next good break is just around the corner."}</p><div class="auth-tabs"><button type="button" data-auth-mode="login" class="${registering ? "" : "active"}">Sign in</button><button type="button" data-auth-mode="register" class="${registering ? "active" : ""}">Create account</button></div><form id="authForm" class="auth-form">${registering ? '<label>Your name<input id="authName" required minlength="2" maxlength="60" autocomplete="name" placeholder="Jamie Patel"></label>' : ""}<label>Campus email<input id="authEmail" type="email" required maxlength="120" autocomplete="email" placeholder="you@campus.edu"></label><label>Password<input id="authPassword" type="password" required minlength="6" maxlength="100" autocomplete="${registering ? "new-password" : "current-password"}" placeholder="At least 6 characters"></label><button class="button button-dark" type="submit">${registering ? "Create my account" : "Sign in"} <span>→</span></button><p class="form-message" id="authMessage" aria-live="polite"></p></form><p class="login-security-note">Demo only: passwords are stored in this browser and are not secure.</p>`;
}

function renderProfile() {
  const user = currentUser();
  if (!user) {
    $("#authCard").innerHTML = `<p class="eyebrow">YOUR CAMPUS ACCOUNT</p><h2>Save your seat.</h2><p>Sign in or create an account to see your orders and reservations in one place.</p><button class="button button-dark" data-view-link="login">Go to sign in <span>→</span></button>`;
    $("#profileDetails").innerHTML = `<p class="eyebrow">YOUR ACTIVITY</p><h2>Your canteen, your call.</h2><p>Once you sign in, this page brings your current orders and table reservations together.</p><div class="profile-info"><div><span>Queue tracking</span><strong>Token & wait estimate</strong></div><div><span>Saved seats</span><strong>Table reservations</strong></div><div><span>Order history</span><strong>Reorder favorites</strong></div><div><span>Prototype account</span><strong>Local to this browser</strong></div></div>`;
    return;
  }
  const reservations = state.reservations.filter((reservation) => reservation.userId === user.id);
  const myOrders = state.orders.filter((order) => order.userId === user.id);
  $("#authCard").innerHTML = `<p class="eyebrow">YOU'RE IN</p><h2>Hello, ${escapeHTML(user.name.split(/\s+/)[0])}.</h2><p>Your canteen account is active in this browser.</p><div class="profile-info"><div><span>Campus email</span><strong>${escapeHTML(user.email)}</strong></div><div><span>Orders so far</span><strong>${myOrders.length}</strong></div></div><button class="button button-quiet" id="logoutButton">Sign out</button>`;
  $("#profileDetails").innerHTML = `<p class="eyebrow">YOUR TABLES</p><h2>Saved spots & orders</h2><div class="profile-info"><div><span>Reservations</span><strong>${reservations.length}</strong></div><div><span>Active orders</span><strong>${myOrders.filter((order) => !["Completed", "Cancelled", "Ready"].includes(order.status)).length}</strong></div></div>${reservations.length ? reservations.map((reservation) => `<p>Table ${reservation.tableNumber} · ${reservation.seats} seats · ${formatTime(reservation.createdAt)} <button class="small-button" data-release-table="${escapeHTML(reservation.tableId)}">Release</button></p>`).join("") : '<p>No table reservations yet. Pick an available table whenever you need it.</p>'}<button class="button button-dark" data-view-link="orders">View my orders <span>→</span></button>`;
}

function renderAdmin() {
  const orders = [...state.orders].sort((a, b) => b.createdAt - a.createdAt);
  const today = new Date().toDateString();
  const todaysOrders = state.orders.filter((order) => new Date(order.createdAt).toDateString() === today);
  const revenue = todaysOrders.filter((order) => order.paymentStatus === "Paid" || order.status === "Completed").reduce((sum, order) => sum + order.total, 0);
  const popular = todaysOrders.flatMap((order) => order.items).reduce((map, item) => map.set(item.name, (map.get(item.name) || 0) + item.quantity), new Map());
  const favorite = [...popular.entries()].sort((a, b) => b[1] - a[1])[0];
  $("#adminStats").innerHTML = `<div class="admin-stat"><span>Orders today</span><strong>${todaysOrders.length}</strong></div><div class="admin-stat"><span>Paid / complete sales</span><strong>${money(revenue)}</strong></div><div class="admin-stat"><span>In the queue</span><strong>${activeOrders().length}</strong></div><div class="admin-stat"><span>Most ordered today</span><strong>${favorite ? escapeHTML(favorite[0]) : "—"}</strong></div>`;
  $("#adminOrders").innerHTML = orders.length ? `<table class="admin-table"><thead><tr><th>Token / guest</th><th>Order</th><th>Pickup</th><th>Total</th><th>Payment</th><th>Status</th><th>Update</th></tr></thead><tbody>${orders.map((order) => `<tr><td>#${String(order.token).padStart(3, "0")}<br>${escapeHTML(order.customerName)}</td><td>${order.items.map((item) => `${item.quantity}× ${escapeHTML(item.name)}`).join(", ")}</td><td>${order.type === "Pre-order" && order.pickupAt ? formatPickupTime(order.pickupAt) : ["Ready", "Completed", "Cancelled"].includes(order.status) ? order.status : `ASAP · ~${estimatedWait(order)} min`}</td><td>${money(order.total)}</td><td><select data-payment-status="${escapeHTML(order.id)}">${["Pending", "Paid", "Failed"].map((status) => `<option ${order.paymentStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select><br>${escapeHTML(order.paymentMethod)}</td><td><span class="status-pill ${order.status.toLowerCase()}">${escapeHTML(order.status)}</span></td><td><select data-order-status="${escapeHTML(order.id)}">${[...ORDER_STATUSES, "Cancelled"].map((status) => `<option ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table>` : '<div class="history-empty">No orders yet. The counter is quiet.</div>';
  $("#adminTables").innerHTML = state.tables.length ? `<table class="admin-table"><thead><tr><th>Table</th><th>Seats</th><th>Reserved for</th><th>Status</th></tr></thead><tbody>${state.tables.map((table) => `<tr><td>T${String(table.number).padStart(2, "0")}</td><td>${table.capacity}</td><td>${escapeHTML(table.reservedBy || "—")}</td><td><select data-table-status="${escapeHTML(table.id)}">${["Available", "Occupied", "Reserved"].map((status) => `<option ${table.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table>` : '<div class="history-empty">No tables are on the floor yet.</div>';
  const categorySelect = $("#itemCategory");
  categorySelect.innerHTML = CATEGORIES.filter((category) => category !== "All").map((category) => `<option>${escapeHTML(category)}</option>`).join("");
  $("#adminMenuList").innerHTML = state.menu.map((item) => `<div class="admin-menu-row"><div><strong>${escapeHTML(item.name)} · ${money(item.price)}</strong><small>${escapeHTML(item.category)} · ${item.available && item.stock > 0 ? `${item.stock} in stock` : "Unavailable"}</small></div><div class="admin-menu-actions"><button data-edit-item="${escapeHTML(item.id)}">Edit</button><button data-toggle-item="${escapeHTML(item.id)}">${item.available ? "Mark sold out" : "Make available"}</button><button data-delete-item="${escapeHTML(item.id)}" aria-label="Delete ${escapeHTML(item.name)}">Delete</button></div></div>`).join("");
}

function renderAll() {
  renderHeader();
  renderService();
  renderMenu();
  renderTables();
  renderDashboardStats();
  renderCart();
  renderOrders();
}

function addToCart(itemId) {
  const item = state.menu.find((entry) => entry.id === itemId);
  if (!item || !item.available || item.stock <= 0) {
    notify("That dish isn't available right now.", "error");
    return;
  }
  const existing = state.cart.find((line) => line.id === itemId);
  if (existing && existing.quantity >= item.stock) {
    notify(`Only ${item.stock} ${item.name} available.`, "error");
    return;
  }
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: itemId, quantity: 1 });
  if (saveState()) {
    renderAll();
    openCart();
  }
}

function changeQuantity(itemId, delta) {
  const line = state.cart.find((entry) => entry.id === itemId);
  const item = state.menu.find((entry) => entry.id === itemId);
  if (!line || !item) return;
  if (delta > 0 && line.quantity >= item.stock) {
    notify(`Only ${item.stock} ${item.name} available.`, "error");
    return;
  }
  line.quantity += delta;
  if (line.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== itemId);
  if (saveState()) renderAll();
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#cartBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#closeCart").focus();
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#cartBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function setAuthMessage(text, error = false) {
  const message = $("#authMessage");
  if (message) {
    message.textContent = text;
    message.style.color = error ? "#a44834" : "";
  }
}

function handleAuth(event) {
  if (event.target.id !== "authForm") return;
  event.preventDefault();
  const email = $("#authEmail").value.trim().toLowerCase();
  const password = $("#authPassword").value;
  if (!email || password.length < 6) return setAuthMessage("Enter a valid email and a password of at least 6 characters.", true);
  if (authMode === "register") {
    const name = $("#authName").value.trim();
    if (name.length < 2) return setAuthMessage("Please enter your name.", true);
    if (state.users.some((user) => user.email === email)) return setAuthMessage("An account with this email already exists. Try signing in.", true);
    const user = { id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, email, password };
    state.users.push(user);
    state.currentUserId = user.id;
    if (!saveState("Welcome to Common Table! Your local demo account is ready.")) {
      state.users = state.users.filter((entry) => entry.id !== user.id);
      state.currentUserId = null;
      renderLogin();
      return;
    }
  } else {
    const user = state.users.find((entry) => entry.email === email && entry.password === password);
    if (!user) return setAuthMessage("We couldn't find that account and password. Check them or create an account.", true);
    state.currentUserId = user.id;
    if (!saveState("You're signed in. Good to have you back.")) {
      state.currentUserId = null;
      renderLogin();
      return;
    }
  }
  renderAll();
  showView("home");
}

function signOut() {
  state.currentUserId = null;
  if (saveState("You are signed out.")) {
    renderAll();
    renderProfile();
  }
}

function openReservation(tableId) {
  const table = state.tables.find((entry) => entry.id === tableId);
  if (!table || table.status !== "Available") return notify("That table is no longer available.", "error");
  if (!currentUser()) {
    notify("Sign in first to save a table in your name.", "error");
    showView("login");
    return;
  }
  $("#reservationTableId").value = table.id;
  $("#reservationTitle").textContent = `Table ${table.number} is open`;
  $("#reservationDescription").textContent = `This table seats up to ${table.capacity}. How many seats should we save?`;
  $("#reservationSeats").innerHTML = Array.from({ length: table.capacity }, (_, index) => `<option value="${index + 1}">${index + 1} ${index === 0 ? "seat" : "seats"}</option>`).join("");
  $("#modalBackdrop").hidden = false;
  $("#reservationSeats").focus();
}

function closeReservation() {
  $("#modalBackdrop").hidden = true;
}

function reserveTable(event) {
  event.preventDefault();
  const user = currentUser();
  const table = state.tables.find((entry) => entry.id === $("#reservationTableId").value);
  if (!user) {
    closeReservation();
    return notify("Sign in first to reserve a table.", "error");
  }
  if (!table || table.status !== "Available") {
    closeReservation();
    renderAll();
    return notify("That table has just been taken. Pick another one.", "error");
  }
  const seats = Number($("#reservationSeats").value);
  if (!Number.isInteger(seats) || seats < 1 || seats > table.capacity) return notify("Choose a valid number of seats.", "error");
  const previous = { ...table };
  const reservation = { id: `res-${Date.now()}`, tableId: table.id, tableNumber: table.number, userId: user.id, seats, createdAt: Date.now() };
  table.status = "Reserved";
  table.reservedBy = user.name;
  table.reservationUserId = user.id;
  state.reservations.push(reservation);
  if (!saveState(`Table ${table.number} is reserved for ${seats} ${seats === 1 ? "seat" : "seats"}.`)) {
    Object.assign(table, previous);
    state.reservations = state.reservations.filter((entry) => entry.id !== reservation.id);
    return;
  }
  closeReservation();
  renderAll();
  renderProfile();
}

function releaseTable(tableId) {
  const table = state.tables.find((entry) => entry.id === tableId);
  if (!table || table.reservationUserId !== state.currentUserId) {
    notify("You can only release your own reservation.", "error");
    return;
  }
  const previous = { ...table };
  const removed = state.reservations.filter((reservation) => reservation.tableId === tableId && reservation.userId === state.currentUserId);
  Object.assign(table, { status: "Available", reservedBy: null, reservationUserId: null });
  state.reservations = state.reservations.filter((reservation) => !removed.includes(reservation));
  if (!saveState(`Reservation for Table ${table.number} released.`)) {
    Object.assign(table, previous);
    state.reservations.push(...removed);
    return;
  }
  renderAll();
  renderProfile();
}

function placeOrder() {
  if (!state.cart.length) return notify("Your bag is empty. Add a dish before checking out.", "error");
  const user = currentUser();
  if (!user) {
    closeCart();
    notify("Sign in before placing your order.", "error");
    showView("login");
    return;
  }
  const lines = state.cart.map((line) => {
    const item = state.menu.find((entry) => entry.id === line.id);
    return { line, item };
  });
  if (lines.some(({ item, line }) => !item || !item.available || item.stock < line.quantity)) {
    renderAll();
    return notify("A menu item changed availability. Please review your bag.", "error");
  }
  const type = $("#orderType").value;
  const pickupAt = type === "Pre-order" ? new Date($("#preorderPickupTime").value).getTime() : null;
  const minimumPickupAt = minimumPickupTime().getTime();
  if (type === "Pre-order" && (!Number.isFinite(pickupAt) || pickupAt < minimumPickupAt)) {
    updatePreorderPickupControl();
    return notify(`Choose a pickup time at least ${preorderLeadMinutes()} minutes from now.`, "error");
  }
  const tableId = type === "Dine-in" ? $("#checkoutTable").value : null;
  let table = null;
  if (type === "Dine-in") {
    table = state.tables.find((entry) => entry.id === tableId);
    if (!table || !(table.status === "Available" || table.reservationUserId === user.id)) return notify("Choose an available table for dine-in.", "error");
  }
  const before = JSON.stringify({ menu: state.menu, tables: state.tables, orders: state.orders, cart: state.cart, nextToken: state.nextToken });
  const subtotal = lines.reduce((sum, { line, item }) => sum + item.price * line.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const paymentMethod = $("#paymentMethod").value;
  const id = `CT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const order = {
    id, token: state.nextToken++, userId: user.id, customerName: user.name, email: user.email,
    items: lines.map(({ line, item }) => ({ id: item.id, name: item.name, price: item.price, prep: Number(item.prep) || DEFAULT_PREP_MINUTES, quantity: line.quantity })),
    type, tableId, pickupAt, subtotal, tax, total: subtotal + tax, paymentMethod,
    paymentStatus: paymentMethod === "UPI" ? "Paid" : "Pending", status: "Placed", createdAt: Date.now()
  };
  lines.forEach(({ line, item }) => { item.stock -= line.quantity; });
  if (table && table.status === "Available") {
    table.status = "Reserved";
    table.reservedBy = user.name;
    table.reservationUserId = user.id;
    state.reservations.push({ id: `res-${Date.now()}`, tableId: table.id, tableNumber: table.number, userId: user.id, seats: table.capacity, createdAt: Date.now(), orderId: id });
  }
  state.orders.push(order);
  state.cart = [];
  if (!saveState(`Order ${id} placed. Your queue token is #${String(order.token).padStart(3, "0")}.`)) {
    const previous = JSON.parse(before);
    state.menu = previous.menu;
    state.tables = previous.tables;
    state.orders = previous.orders;
    state.cart = previous.cart;
    state.nextToken = previous.nextToken;
    renderAll();
    return;
  }
  closeCart();
  renderAll();
  showView("orders");
}

function cancelOrder(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId && entry.userId === state.currentUserId);
  if (!order || order.status !== "Placed") return notify("This order can no longer be cancelled.", "error");
  const previousStatus = order.status;
  order.status = "Cancelled";
  order.items.forEach((line) => {
    const item = state.menu.find((entry) => entry.id === line.id);
    if (item) item.stock += line.quantity;
  });
  if (!saveState(`Order ${order.id} cancelled. Any simulated payment status is unchanged.`)) {
    order.status = previousStatus;
    order.items.forEach((line) => {
      const item = state.menu.find((entry) => entry.id === line.id);
      if (item) item.stock -= line.quantity;
    });
    return;
  }
  renderAll();
}

function reorder(orderId) {
  const order = state.orders.find((entry) => entry.id === orderId && entry.userId === state.currentUserId);
  if (!order) return;
  let added = 0;
  order.items.forEach((line) => {
    const item = state.menu.find((entry) => entry.id === line.id);
    if (!item || !item.available || item.stock <= 0) return;
    const existing = state.cart.find((cartLine) => cartLine.id === item.id);
    const currentQuantity = existing ? existing.quantity : 0;
    const addQuantity = Math.min(line.quantity, item.stock - currentQuantity);
    if (addQuantity > 0) {
      if (existing) existing.quantity += addQuantity;
      else state.cart.push({ id: item.id, quantity: addQuantity });
      added += addQuantity;
    }
  });
  if (!added) return notify("Those dishes aren't available right now.", "error");
  if (saveState("Available favorites added to your bag.")) {
    renderAll();
    openCart();
  }
}

function editMenuItem(id) {
  const item = state.menu.find((entry) => entry.id === id);
  if (!item) return;
  $("#itemId").value = item.id;
  $("#itemName").value = item.name;
  $("#itemCategory").value = item.category;
  $("#itemPrice").value = item.price;
  $("#itemPrep").value = item.prep;
  $("#itemStock").value = item.stock;
  $("#itemDescription").value = item.description || "";
  $("#itemImage").value = item.image || "";
  $("#itemAvailable").checked = item.available;
  $("#saveMenuItem").innerHTML = "Save changes <span>✓</span>";
  $("#cancelMenuEdit").hidden = false;
  $("#itemName").focus();
  $("#itemName").scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetMenuForm() {
  $("#menuItemForm").reset();
  $("#itemId").value = "";
  $("#itemPrep").value = "10";
  $("#itemStock").value = "20";
  $("#itemAvailable").checked = true;
  $("#saveMenuItem").innerHTML = "Add menu item <span>+</span>";
  $("#cancelMenuEdit").hidden = true;
}

function saveMenuItem(event) {
  event.preventDefault();
  const name = $("#itemName").value.trim();
  const category = $("#itemCategory").value;
  const price = Number($("#itemPrice").value);
  const prep = Number($("#itemPrep").value);
  const stock = Number($("#itemStock").value);
  const image = $("#itemImage").value.trim();
  if (name.length < 2 || !CATEGORIES.includes(category) || category === "All" || !Number.isFinite(price) || price <= 0 || !Number.isInteger(prep) || prep <= 0 || !Number.isInteger(stock) || stock < 0) {
    return notify("Check the menu item name, category, price, prep time, and stock.", "error");
  }
  if (image && !/^https?:\/\//i.test(image)) return notify("Image links should start with http:// or https://.", "error");
  const id = $("#itemId").value;
  const existing = id ? state.menu.find((item) => item.id === id) : null;
  const item = {
    id: id || `food-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name, category, price, prep, image: image || FOOD_IMAGES[categoryImageKey(category)],
    description: $("#itemDescription").value.trim(), available: $("#itemAvailable").checked,
    stock, popular: existing ? existing.popular : 50
  };
  const before = state.menu;
  if (existing) state.menu = state.menu.map((entry) => entry.id === id ? item : entry);
  else state.menu.push(item);
  if (!saveState(existing ? `${name} updated on the menu.` : `${name} added to the menu.`)) {
    state.menu = before;
    return;
  }
  resetMenuForm();
  renderAll();
  renderAdmin();
}

function deleteMenuItem(id) {
  const item = state.menu.find((entry) => entry.id === id);
  if (!item || !window.confirm(`Remove ${item.name} from the menu?`)) return;
  const previous = state.menu;
  state.menu = state.menu.filter((entry) => entry.id !== id);
  state.cart = state.cart.filter((entry) => entry.id !== id);
  if (!saveState(`${item.name} removed from the menu.`)) state.menu = previous;
  renderAll();
  renderAdmin();
}

function toggleMenuAvailability(id) {
  const item = state.menu.find((entry) => entry.id === id);
  if (!item) return;
  const previous = item.available;
  item.available = !item.available;
  if (!saveState(`${item.name} marked ${item.available ? "available" : "unavailable"}.`)) item.available = previous;
  renderAll();
  renderAdmin();
}

function updateOrderStatus(id, status) {
  const order = state.orders.find((entry) => entry.id === id);
  if (!order || ![...ORDER_STATUSES, "Cancelled"].includes(status)) return;
  const previous = order.status;
  const previousPaymentStatus = order.paymentStatus;
  const previousStartedAt = order.startedAt;
  const stockChanges = [];
  if (status === "Cancelled" && previous !== "Cancelled") {
    order.items.forEach((line) => {
      const item = state.menu.find((entry) => entry.id === line.id);
      if (item) {
        stockChanges.push({ item, stock: item.stock });
        item.stock += line.quantity;
      }
    });
  } else if (previous === "Cancelled" && status !== "Cancelled") {
    for (const line of order.items) {
      const item = state.menu.find((entry) => entry.id === line.id);
      if (item && (!item.available || item.stock < line.quantity)) {
        notify(`Cannot reinstate this order: ${item.name} is no longer available in that quantity.`, "error");
        return renderAdmin();
      }
      if (item) {
        stockChanges.push({ item, stock: item.stock });
        item.stock -= line.quantity;
      }
    }
  }
  order.status = status;
  if (status === "Preparing" && previous !== "Preparing") order.startedAt = Date.now();
  else if (status !== "Preparing") delete order.startedAt;
  if (status === "Completed" && order.paymentMethod === "Cash") order.paymentStatus = "Paid";
  if (!saveState(`Order ${order.id} updated to ${status}.`)) {
    order.status = previous;
    order.paymentStatus = previousPaymentStatus;
    if (previousStartedAt === undefined) delete order.startedAt;
    else order.startedAt = previousStartedAt;
    stockChanges.forEach(({ item, stock }) => { item.stock = stock; });
    return;
  }
  renderAll();
  renderAdmin();
}

function updatePaymentStatus(id, status) {
  const order = state.orders.find((entry) => entry.id === id);
  if (!order || !["Pending", "Paid", "Failed"].includes(status)) return;
  const previous = order.paymentStatus;
  order.paymentStatus = status;
  if (!saveState(`Payment status for ${order.id} updated to ${status.toLowerCase()}.`)) {
    order.paymentStatus = previous;
    return;
  }
  renderAll();
  renderAdmin();
}

function updateTableStatus(id, status) {
  const table = state.tables.find((entry) => entry.id === id);
  if (!table || !["Available", "Occupied", "Reserved"].includes(status)) return;
  const previous = { ...table };
  const previousReservations = state.reservations;
  table.status = status;
  if (status === "Available") {
    table.reservedBy = null;
    table.reservationUserId = null;
    state.reservations = state.reservations.filter((reservation) => reservation.tableId !== id);
  } else if (status === "Occupied") {
    table.reservedBy = "In service";
    table.reservationUserId = null;
  } else if (!table.reservedBy) {
    table.reservedBy = "Reserved";
  }
  if (!saveState(`Table ${table.number} marked ${status.toLowerCase()}.`)) {
    Object.assign(table, previous);
    state.reservations = previousReservations;
  }
  renderAll();
  renderAdmin();
}

function saveService(event) {
  event.preventDefault();
  const opening = $("#openingTime").value;
  const closing = $("#closingTime").value;
  if (!opening || !closing || opening === closing) {
    $("#serviceMessage").textContent = "Choose valid, different opening and closing times.";
    return;
  }
  const previous = { ...state.service };
  state.service = { opening, closing, announcement: $("#serviceAnnouncement").value.trim() || "Freshly made, right here on campus." };
  if (!saveState("Canteen hours and announcement updated.")) state.service = previous;
  renderAll();
  renderAdmin();
  $("#serviceMessage").textContent = "Saved.";
}

function submitFeedback(event) {
  event.preventDefault();
  if (!currentUser()) return notify("Sign in to leave feedback.", "error");
  const rating = Number($("#feedbackRating").value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    $("#feedbackMessage").textContent = "Choose a rating before sending.";
    return;
  }
  state.feedback.push({ id: `feedback-${Date.now()}`, userId: state.currentUserId, rating, comment: $("#feedbackText").value.trim(), createdAt: Date.now() });
  if (!saveState("Thanks for helping make the canteen better!")) {
    state.feedback.pop();
    return;
  }
  $("#feedbackForm").reset();
  $("#feedbackMessage").textContent = "Thanks for sharing your feedback.";
}

function resetDemoData() {
  if (!window.confirm("Reset all canteen demo data in this browser, including accounts, orders, tables, and menu changes? This cannot be undone.")) return;
  const old = state;
  state = freshState();
  if (!saveState("Demo data reset. Fresh start!")) {
    state = old;
    return;
  }
  selectedCategory = "All";
  closeCart();
  renderAll();
  renderProfile();
  renderAdmin();
}

function refreshQueue() {
  renderDashboardStats();
  if (!$("#view-orders").hidden) renderOrders();
  const user = currentUser();
  if (!user) return;
  const personalActive = activeOrders().filter((order) => order.userId === user.id);
  const first = personalActive[0];
  personalActive.forEach((order) => {
    const position = activeOrders().filter((candidate) => candidate.token < order.token).length + 1;
    const previousPosition = lastQueuePositions.get(order.id);
    if (previousPosition !== undefined && previousPosition !== position) {
      notify(position < previousPosition ? `Token #${String(order.token).padStart(3, "0")} moved up the queue — position ${position}.` : `Queue moved — your token is now at position ${position}.`);
    }
    lastQueuePositions.set(order.id, position);
  });
  if (first && first.status === "Preparing" && estimatedWait(first) <= 3 && lastNearReadyOrder !== first.id) {
    lastNearReadyOrder = first.id;
    notify(`Order ${first.id} is nearly ready!`);
  }
}

document.addEventListener("click", (event) => {
  const viewLink = event.target.closest("[data-view-link]");
  if (viewLink) {
    event.preventDefault();
    showView(viewLink.dataset.viewLink);
    return;
  }
  const add = event.target.closest("[data-add-item]");
  if (add) return addToCart(add.dataset.addItem);
  const category = event.target.closest("[data-category]");
  if (category) {
    selectedCategory = category.dataset.category;
    return renderMenu();
  }
  const quantity = event.target.closest("[data-quantity]");
  if (quantity) return changeQuantity(quantity.dataset.itemId, Number(quantity.dataset.quantity));
  const reserve = event.target.closest("[data-reserve-table]");
  if (reserve) return openReservation(reserve.dataset.reserveTable);
  const release = event.target.closest("[data-release-table]");
  if (release) return releaseTable(release.dataset.releaseTable);
  const cancel = event.target.closest("[data-cancel-order]");
  if (cancel) return cancelOrder(cancel.dataset.cancelOrder);
  const reorderButton = event.target.closest("[data-reorder]");
  if (reorderButton) return reorder(reorderButton.dataset.reorder);
  const auth = event.target.closest("[data-auth-mode]");
  if (auth) {
    authMode = auth.dataset.authMode;
    return renderLogin();
  }
  const edit = event.target.closest("[data-edit-item]");
  if (edit) return editMenuItem(edit.dataset.editItem);
  const toggle = event.target.closest("[data-toggle-item]");
  if (toggle) return toggleMenuAvailability(toggle.dataset.toggleItem);
  const remove = event.target.closest("[data-delete-item]");
  if (remove) return deleteMenuItem(remove.dataset.deleteItem);
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "authForm") handleAuth(event);
  if (event.target.id === "reservationForm") reserveTable(event);
  if (event.target.id === "feedbackForm") submitFeedback(event);
  if (event.target.id === "menuItemForm") saveMenuItem(event);
});

document.addEventListener("click", (event) => {
  if (event.target.id === "logoutButton") signOut();
});

document.addEventListener("change", (event) => {
  if (event.target.id === "menuSort") renderMenu();
  if (event.target.id === "orderType") renderCart();
  if (event.target.id === "paymentMethod") $("#paymentNote").textContent = event.target.value === "UPI" ? "UPI is simulated in this prototype; no payment details are collected." : "Cash payment is marked pending until paid at the counter.";
  if (event.target.matches("[data-order-status]")) updateOrderStatus(event.target.dataset.orderStatus, event.target.value);
  if (event.target.matches("[data-table-status]")) updateTableStatus(event.target.dataset.tableStatus, event.target.value);
});

$("#menuSearch").addEventListener("input", renderMenu);
$("#openCart").addEventListener("click", openCart);
$("#menuCartShortcut").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartBackdrop").addEventListener("click", closeCart);
$("#checkoutButton").addEventListener("click", placeOrder);
$("#closeModal").addEventListener("click", closeReservation);
$("#modalBackdrop").addEventListener("click", (event) => {
  if (event.target === $("#modalBackdrop")) closeReservation();
});
$("#mobileMenuToggle").addEventListener("click", () => {
  const nav = $(".main-nav");
  const open = nav.classList.toggle("open");
  $("#mobileMenuToggle").setAttribute("aria-expanded", String(open));
});
$("#profileButton").addEventListener("click", () => showView(currentUser() ? "profile" : "login"));
$("#installApp").addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  try {
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === "accepted") notify("Common Table was installed.");
  } catch (error) {
    console.error("Could not start the app installation prompt.", error);
    notify("Your browser couldn't start the installation. Try its browser menu instead.", "error");
  } finally {
    deferredInstallPrompt = null;
    $("#installApp").hidden = true;
  }
});
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  $("#installApp").hidden = false;
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  $("#installApp").hidden = true;
});
$("#themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  if (saveState()) renderHeader();
});
$("#cancelMenuEdit").addEventListener("click", resetMenuForm);
$("#resetDemo").addEventListener("click", resetDemoData);
$("#serviceForm").addEventListener("submit", saveService);

const priorSaved = localStorage.getItem(STORAGE_KEY);
if (!priorSaved) saveState();
renderAll();
renderProfile();
renderAdmin();
window.setInterval(refreshQueue, 30000);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Could not register the Common Table service worker.", error);
    });
  });
}

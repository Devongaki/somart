// Main Application Logic

// State Management
const state = {
  cart: [],
  products: [],
  categories: [],
  darkMode: localStorage.getItem("darkMode") === "true",
  currentPage: window.location.pathname,
};

// DOM Elements
const dom = {
  themeToggle: document.querySelector(".nav__theme-toggle"),
  cartCount: document.querySelector(".nav__cart-count"),
  productsGrid: document.querySelector(".products__grid"),
  categoriesGrid: document.querySelector(".categories__grid"),
};

// Theme Management
function initTheme() {
  if (state.darkMode) {
    document.body.classList.add("dark-mode");
    dom.themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", state.darkMode);

  const icon = dom.themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
}

// Cart Management
function updateCartCount() {
  const count = state.cart.reduce((total, item) => total + item.quantity, 0);
  dom.cartCount.textContent = count;
}

function addToCart(productId, quantity = 1) {
  const existingItem = state.cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = state.products.find((p) => p.id === productId);
    if (product) {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }
  }

  localStorage.setItem("cart", JSON.stringify(state.cart));
  updateCartCount();
  showToast("Product added to cart", "success");
}

// Toast Notifications
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Trigger reflow
  toast.offsetHeight;

  toast.classList.add("toast--active");

  setTimeout(() => {
    toast.classList.remove("toast--active");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Product Rendering
function renderProducts(products = state.products) {
  if (!dom.productsGrid) return;

  dom.productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="card">
            <img src="${product.image}" alt="${
        product.name
      }" class="card__image">
            <div class="card__content">
                <h3 class="card__title">${product.name}</h3>
                <p class="card__price">$${product.price.toFixed(2)}</p>
                <button class="button button--primary" onclick="addToCart('${
                  product.id
                }')">
                    Add to Cart
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Category Rendering
function renderCategories() {
  if (!dom.categoriesGrid) return;

  dom.categoriesGrid.innerHTML = state.categories
    .map(
      (category) => `
        <div class="card">
            <img src="${category.image}" alt="${category.name}" class="card__image">
            <div class="card__content">
                <h3 class="card__title">${category.name}</h3>
                <a href="pages/shop.html?category=${category.id}" class="button button--secondary">
                    View Products
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

// Initialize Application
function init() {
  // Load cart from localStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    state.cart = JSON.parse(savedCart);
  }

  // Initialize theme
  initTheme();

  // Add event listeners
  dom.themeToggle.addEventListener("click", toggleTheme);

  // Update cart count
  updateCartCount();

  // Render content based on current page
  if (state.currentPage.includes("shop.html")) {
    renderProducts();
  } else if (state.currentPage === "/") {
    renderCategories();
  }
}

// Start the application
document.addEventListener("DOMContentLoaded", init);

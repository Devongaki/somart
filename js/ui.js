// UI Interactions and Animations

// Modal Management
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.closeBtn = this.modal.querySelector(".modal__close");
    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Close modal when clicking outside
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.modal.classList.contains("modal--active")
      ) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add("modal--active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }
}

// Toast Notifications
class Toast {
  static show(message, type = "success") {
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

  static success(message) {
    this.show(message, "success");
  }

  static error(message) {
    this.show(message, "error");
  }
}

// Lazy Loading Images
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]");
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      });

      this.images.forEach((img) => imageObserver.observe(img));
    } else {
      this.loadImagesImmediately();
    }
  }

  loadImagesImmediately() {
    this.images.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
}

// Smooth Scroll
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Form Validation
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validate()) {
        this.handleSubmit();
      }
    });
  }

  validate() {
    let isValid = true;
    const inputs = this.form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        this.showError(input, "This field is required");
        isValid = false;
      } else {
        this.clearError(input);
      }
    });

    return isValid;
  }

  showError(input, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "form__error";
    errorDiv.textContent = message;

    input.classList.add("form__input--error");
    input.parentNode.appendChild(errorDiv);
  }

  clearError(input) {
    input.classList.remove("form__input--error");
    const errorDiv = input.parentNode.querySelector(".form__error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  handleSubmit() {
    // Handle form submission
    Toast.success("Form submitted successfully!");
    this.form.reset();
  }
}

// Search Handler
class SearchHandler {
  constructor() {
    this.form = document.querySelector(".search-form");
    this.input = document.querySelector(".search-form__input");
    this.categoryButton = document.querySelector(".search-form__categories");
    this.searchResults = null;
    this.init();
  }

  init() {
    this.createSearchResults();
    this.handleInput = this.debounce(this.handleInput.bind(this), 300);
    this.addEventListeners();
  }

  createSearchResults() {
    this.searchResults = document.createElement("div");
    this.searchResults.className = "search-results";
    this.form.appendChild(this.searchResults);
  }

  addEventListeners() {
    this.input.addEventListener("input", (e) => this.handleInput(e));
    this.input.addEventListener("focus", () => this.showResults());
    document.addEventListener("click", (e) => this.handleClickOutside(e));
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleInput(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
      this.hideResults();
      return;
    }

    const results = window.productsModule.searchProducts(query);
    this.displayResults(results);
  }

  displayResults(results) {
    if (!results.length) {
      this.searchResults.innerHTML =
        '<div class="search-results__empty">No products found</div>';
      this.showResults();
      return;
    }

    const html = results
      .slice(0, 5)
      .map(
        (product) => `
        <a href="/pages/product.html?id=${product.id}" class="search-result">
          <img src="${product.images[0]}" alt="${
          product.name
        }" class="search-result__image">
          <div class="search-result__content">
            <h4 class="search-result__title">${product.name}</h4>
            <p class="search-result__price">$${product.price.toFixed(2)}</p>
          </div>
        </a>
      `
      )
      .join("");

    this.searchResults.innerHTML = html;
    this.showResults();
  }

  showResults() {
    this.searchResults.classList.add("search-results--active");
  }

  hideResults() {
    this.searchResults.classList.remove("search-results--active");
  }

  handleClickOutside(e) {
    if (!this.form.contains(e.target)) {
      this.hideResults();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = this.input.value.trim();
    if (query) {
      window.location.href = `/pages/shop.html?search=${encodeURIComponent(
        query
      )}`;
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// User Menu
class UserMenu {
  constructor() {
    this.wishlistCount = document.querySelector(
      '.nav__item a[href="/pages/wishlist.html"] .nav__count'
    );
    this.cartCount = document.querySelector(".cart-count");
    this.themeToggle = document.querySelector(".nav__theme-toggle");
    this.init();
  }

  init() {
    this.updateCounts();
    this.addEventListeners();
    this.initTheme();
  }

  updateCounts() {
    // Update wishlist count
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    this.wishlistCount.textContent = wishlist.length;

    // Update cart count from cart.js
    if (window.cartModule) {
      const cartCount = window.cartModule.getCartCount();
      this.cartCount.textContent = cartCount;
    }
  }

  addEventListeners() {
    this.themeToggle.addEventListener("click", () => this.toggleTheme());

    // Listen for cart updates
    window.addEventListener("cart:updated", () => this.updateCounts());
    window.addEventListener("wishlist:updated", () => this.updateCounts());
  }

  initTheme() {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      document.body.classList.add("dark-mode");
      this.themeToggle
        .querySelector("i")
        .classList.replace("fa-moon", "fa-sun");
    }
  }

  toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    const icon = this.themeToggle.querySelector("i");
    icon.classList.replace(
      isDarkMode ? "fa-moon" : "fa-sun",
      isDarkMode ? "fa-sun" : "fa-moon"
    );
  }
}

// Initialize UI Components
function initUI() {
  // Initialize modals
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => new Modal(modal.id));

  // Initialize lazy loading
  new LazyLoader();

  // Initialize smooth scroll
  new SmoothScroll();

  // Initialize form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => new FormValidator(form.id));

  // Initialize search handler
  new SearchHandler();

  // Initialize user menu
  new UserMenu();
}

// Export functions and classes
window.uiModule = {
  Modal,
  Toast,
  LazyLoader,
  SmoothScroll,
  FormValidator,
  SearchHandler,
  UserMenu,
  initUI,
};

// Initialize UI when DOM is loaded
document.addEventListener("DOMContentLoaded", initUI);

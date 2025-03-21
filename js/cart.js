// Shopping Cart Management

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = window.productsModule.getProductById(productId);

  if (!product) {
    showToast("Product not found", "error");
    return false;
  }

  if (!window.productsModule.isProductAvailable(productId, quantity)) {
    showToast("Product is out of stock", "error");
    return false;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart();
  updateCartUI();
  showToast("Product added to cart", "success");
  return true;
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Product removed from cart", "success");
}

function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      if (!window.productsModule.isProductAvailable(productId, quantity)) {
        showToast("Not enough stock available", "error");
        return false;
      }
      item.quantity = quantity;
      saveCart();
      updateCartUI();
    }
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  showToast("Cart cleared", "success");
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Cart UI Functions
function updateCartUI() {
  const cartCount = document.querySelector(".nav__cart-count");
  if (cartCount) {
    cartCount.textContent = getCartItemCount();
  }

  const cartItems = document.querySelector(".cart__items");
  if (cartItems) {
    renderCartItems();
  }

  const cartTotal = document.querySelector(".cart__total");
  if (cartTotal) {
    cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

function renderCartItems() {
  const cartItems = document.querySelector(".cart__items");
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="cart__empty">
                <p>Your cart is empty</p>
                <a href="pages/shop.html" class="button button--primary">Continue Shopping</a>
            </div>
        `;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart__item">
            <img src="${item.image}" alt="${
        item.name
      }" class="cart__item-image">
            <div class="cart__item-details">
                <h3 class="cart__item-name">${item.name}</h3>
                <p class="cart__item-price">$${item.price.toFixed(2)}</p>
                <div class="cart__item-quantity">
                    <button class="button button--secondary" onclick="updateQuantity('${
                      item.id
                    }', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="button button--secondary" onclick="updateQuantity('${
                      item.id
                    }', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart__item-remove" onclick="removeFromCart('${
              item.id
            }')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `
    )
    .join("");
}

// Local Storage Functions
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Checkout Functions
function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }

  // Here you would typically integrate with a payment processor
  // For demo purposes, we'll just simulate a successful checkout
  cart.forEach((item) => {
    window.productsModule.updateProductStock(item.id, item.quantity);
  });

  clearCart();
  showToast("Order placed successfully!", "success");
  setTimeout(() => {
    window.location.href = "pages/shop.html";
  }, 2000);
}

// Initialize Cart
function initCart() {
  updateCartUI();
}

// Export functions
window.cartModule = {
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  getCartItemCount,
  checkout,
  initCart,
};

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", initCart);

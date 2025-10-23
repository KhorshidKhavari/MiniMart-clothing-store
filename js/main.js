"use strict";
/* 
  - نمایش محصولات از فایل JSON
  - افزودن به سبد خرید
  - انیمیشن پرواز تصویر محصول به سبد
*/

// متغیرها
const productContainer = document.getElementById("product-container");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// گرفتن داده‌ها از فایل JSON
fetch("products.json")
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  })
  .catch(error => console.error("Error loading products:", error));

// نمایش محصولات
function displayProducts(products) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("col-md-3");
    card.innerHTML = `
      <div class="card product-card h-100 text-center p-2 position-relative">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted small">${product.description}</p>
          <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
          <button class="btn btn-buy add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
        </div>
      </div>`;
    productContainer.appendChild(card);
  });
}

// افزودن محصول به سبد خرید
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const product = {
      id: parseInt(event.target.dataset.id),
      name: event.target.dataset.name,
      price: parseFloat(event.target.dataset.price),
      image: event.target.dataset.image,
      quantity: 1
    };
    const img = event.target.closest(".product-card").querySelector(".product-img");
    addToCart(product);
    flyToCartAnimation(img);

    event.target.textContent = "Added!";
    event.target.disabled = true;
    setTimeout(() => {
      event.target.textContent = "Add to Cart";
      event.target.disabled = false;
    }, 1500);
  }
});

// ذخیره در localStorage
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// بروزرسانی تعداد در آیکون cart
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  let total = 0;
  cart.forEach(item => total += item.quantity);
  if (cartCount) cartCount.textContent = total;
}

// انیمیشن پرواز محصول به سبد خرید
function flyToCartAnimation(imageElement) {
  const cartIcon = document.querySelector(".fa-cart-shopping");
  const imgClone = imageElement.cloneNode(true);
  const imgRect = imageElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  imgClone.style.position = "fixed";
  imgClone.style.top = imgRect.top + "px";
  imgClone.style.left = imgRect.left + "px";
  imgClone.style.width = "100px";
  imgClone.style.transition = "all 1s ease-in-out";
  imgClone.style.zIndex = "1000";
  document.body.appendChild(imgClone);

  setTimeout(() => {
    imgClone.style.top = cartRect.top + "px";
    imgClone.style.left = cartRect.left + "px";
    imgClone.style.width = "30px";
    imgClone.style.opacity = "0.3";
  }, 50);

  setTimeout(() => imgClone.remove(), 1000);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
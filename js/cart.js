"use strict";
/* 
  - نمایش محصولات از localStorage
  - حذف محصول و محاسبه جمع کل
*/

const cartItemsContainer = document.getElementById("cart-items");
const cartData = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cartData.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("col-md-6", "cart-item", "d-flex", "align-items-center", "justify-content-between");
    div.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h6 class="fw-bold">${item.name}</h6>
          <p class="mb-0 text-muted">$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
      </div>
      <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>`;
    cartItemsContainer.appendChild(div);
  });

   document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".remove-item")) {
    const id = parseInt(e.target.closest(".remove-item").dataset.id);
    const index = cartData.findIndex(item => item.id === id);
    if (index !== -1) cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    displayCart();
  }
});

document.addEventListener("DOMContentLoaded", displayCart);
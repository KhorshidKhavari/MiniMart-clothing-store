"use strict";
/* 
  - ارسال فرم سفارش و نمایش پیام موفقیت
*/

const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.removeItem("cart");
  checkoutMessage.textContent = "✅ Your order has been placed successfully!";
  checkoutMessage.style.color = "green";
  checkoutForm.reset();
});
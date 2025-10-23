"use strict";
/* 
  - ورود دستی (admin / 12345)
  - ذخیره نام کاربر با sessionStorage
*/

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "costumer" && password === "12345") {
    sessionStorage.setItem("user", username);
    loginMessage.textContent = `Welcome, ${username}!`;
    loginMessage.style.color = "green";
  } else {
    loginMessage.textContent = "Invalid username or password!";
    loginMessage.style.color = "red";
  }
});
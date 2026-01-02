
const loginBtn = document.querySelector(".login-btn");
const regBtn = document.querySelector(".register-btn");

loginBtn.addEventListener("click", () => {
   window.location.href = "login.html";
});

regBtn.addEventListener("click", () => {
   window.location.href = "registration.html";
});

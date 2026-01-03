const MIN_LENGTH = 8;

const registrationForm = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const inputPass = document.getElementById("password");
const birthdateInput = document.getElementById("birthdate");

let isEmailValid = false;
let isPasswordValid = false;
let isBirthdateValid = false;

emailInput.addEventListener("input", () => {
    if (emailInput.value.includes('@')) {
        emailInput.classList.remove("input-invalid");
        emailInput.classList.add("input-valid");
        isEmailValid = true;
    } else {
        emailInput.classList.remove("input-valid");
        emailInput.classList.add("input-invalid");
        isEmailValid = false;
    }
});


inputPass.addEventListener("input", () => {
    if(inputPass.value.length >= MIN_LENGTH) {
        inputPass.classList.remove("input-invalid");
       inputPass.classList.add("input-valid");
       isPasswordValid = true;
    } else {
         inputPass.classList.remove("input-valid");
       inputPass.classList.add("input-invalid");
       isPasswordValid = false;
    }
});


birthdateInput.addEventListener("input", () => {
   
    const birthD = new Date(birthdateInput.value);
    const currD = new Date();
    const userAge = currD.getFullYear() - birthD.getFullYear();
    const months = currD.getMonth() - birthD.getMonth();

    if(userAge >= 12 && months >= 0 && currD.getDate() >= birthD.getDate()) {
        birthdateInput.classList.remove("input-invalid");
       birthdateInput.classList.add("input-valid");
       isBirthdateValid = true;
    } else {
         birthdateInput.classList.remove("input-valid");
       birthdateInput.classList.add("input-invalid");
       isBirthdateValid = false;
    }
});


registrationForm.addEventListener("submit", (e) => {

    e.preventDefault();
    if(isBirthdateValid && isEmailValid && isPasswordValid) {
        window.location.href="catalogue.html";
    } else {
        alert("Please enter correct data.");
    }
});
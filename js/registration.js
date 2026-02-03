const MIN_LENGTH = 8;

const USER_IN_SYSTEM = "The user is already registered in the system yet.";
const EMAIL_IN_SYSTEM = "User with this email has account in the system.";
const AGE_RESTICT = "Age restriction. At least 12 years old users.";
const PASS_RESTRICT = "Password should be at least 8 symbols.";
const EMAIL_RESTRICT = "Email is not valid.";

const registrationForm = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const inputPass = document.getElementById("password");
const birthdateInput = document.getElementById("birthdate");
const confirmPass = document.getElementById("confirm-password");
const passVerMess = document.getElementById("pass-verification");
const username = document.getElementById("username");

let isEmailValid = false;
let isPasswordValid = false;
let isBirthdateValid = false;
let isConfirmPassSame = false;

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
    if (inputPass.value.length >= MIN_LENGTH) {
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

    const monthDiff = currD.getMonth() - birthD.getMonth();
    const dayDiff = currD.getDate() - birthD.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        userAge--;
    }

    if (userAge >= 12) {
        birthdateInput.classList.remove("input-invalid");
        birthdateInput.classList.add("input-valid");
        isBirthdateValid = true;
    } else {
        birthdateInput.classList.remove("input-valid");
        birthdateInput.classList.add("input-invalid");
        isBirthdateValid = false;
    }
});


confirmPass.addEventListener("input", () => {

    if (confirmPass.value === inputPass.value) {
        confirmPass.classList.remove("input-invalid");
        confirmPass.classList.add("input-valid");
        passVerMess.textContent = "Passwords match.";
        isConfirmPassSame = true;
    } else {
        confirmPass.classList.remove("input-valid");
        confirmPass.classList.add("input-invalid");
        passVerMess.textContent = "Passwords do not match.";
        isConfirmPassSame = false;
    }
});


function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function isUserNameInSystemAlready(username) {

    let currUsers = getUsers();
    for (let index = 0; index < currUsers.length; index++) {
        if (username === currUsers[index].username) {
            return true;
        }
    }
    return false;
}

function isEmailInSystemAlready(email) {

    let currUsers = getUsers();
    for (let index = 0; index < currUsers.length; index++) {
        if (email === currUsers[index].email) {
            return true;
        }
    }
    return false;
}


registrationForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (isBirthdateValid && isEmailValid && isPasswordValid && isConfirmPassSame) {

        const usernameV = username.value.trim();
        const emailV = emailInput.value.trim();

        if(isUserNameInSystemAlready(usernameV)){
           alert(USER_IN_SYSTEM);
           return;
        }

        if (isEmailInSystemAlready(emailV)) {
            alert(EMAIL_IN_SYSTEM);
            return;
        }

        const passV = inputPass.value;

        const users = getUsers();
        users.push(
            { username: usernameV, 
              email: emailV, 
              password: passV 
            }
        );

        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "login.html";
    } else {
        if (!isBirthdateValid) {
            alert(AGE_RESTICT);
        }
        if (!isPasswordValid) {
            alert(PASS_RESTRICT);
        }
        if(!isEmailValid) {
            alert(EMAIL_RESTRICT);
        }
    }
});
const MIN_LENGTH = 8;

const inputPass = document.getElementById("password");
const loginForm = document.getElementById("loginForm")

inputPass.addEventListener("input", () => {
    if(inputPass.value.length >= MIN_LENGTH) {
        inputPass.classList.remove("input-invalid");
       inputPass.classList.add("input-valid");
    } else {
         inputPass.classList.remove("input-valid");
       inputPass.classList.add("input-invalid");
    }
});


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputPass.value.length >= MIN_LENGTH) {
       window.location.href = "catalogue.html";
    } else {
        alert('Password must be at least 8 characters.');
    }
});
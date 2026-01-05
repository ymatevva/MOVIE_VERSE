
const MIN_LENGTH = 8;

const inputPass = document.getElementById("password");
const username = document.getElementById("username");
const loginForm = document.getElementById("loginForm")
 
let isPassValid = false;

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function isUsernameInSystem(username) {
    
    const users = getUsers();

    for (let i = 0; i < users.length; i++) {
        if(username === users[i].username) {
            return true;
        }
    }
    return false;
}

function isPasswordMatch(password, username) {
         
    const users = getUsers();

    for (let i = 0; i < users.length; i++) {
        if(username === users[i].username) {
            return password === users[i].password;
        }
    }
    return false;
}

inputPass.addEventListener("input", () => {
    if(inputPass.value.length >= MIN_LENGTH) {
       inputPass.classList.remove("input-invalid");
       inputPass.classList.add("input-valid");
       isPassValid = true;
    } else {
       inputPass.classList.remove("input-valid");
       inputPass.classList.add("input-invalid");
       isPassValid = false;
    }
});


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (isPassValid) {
       const usernameV = username.value.trim();
       const passV = inputPass.value;
       if (!isUsernameInSystem(usernameV)) {
        alert("The user is not registered in the system yet.");
        return;
       } 

       if (!isPasswordMatch(passV, usernameV)) {
        alert("The password for the given username is not correct.");
        return;
       }

       window.location.href = "catalogue.html";
    } else {
        alert('Please enter correct data.');
    }
});
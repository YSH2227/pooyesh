const registerContainer = document.getElementById("register-con")
const registerTitle = document.getElementById("register-title");
const registerForm = document.getElementById("register-form");
const form = document.getElementById("form")
const email = document.getElementById("email-con");
const submitContainer = document.getElementById("submit-con");
const loginLink = document.getElementById("login-link");

const homeBtn = document.getElementById("home-btn")

const backBtn = document.createElement("button");
backBtn.className = "user-buttons";
backBtn.innerHTML = "بازگشت";
backBtn.setAttribute("onclick", "switchRegister()");


const registerBtn = document.getElementById("register-btn");

const loginBtn = document.createElement("button");
loginBtn.className = "user-buttons";
loginBtn.name = "login"
loginBtn.type = "submit";
loginBtnText = document.createTextNode("ورود");
loginBtn.appendChild(loginBtnText);




function switchLogin() {
    submitContainer.replaceChild(loginBtn, submitContainer.childNodes[1]);
    registerForm.removeChild(email);
    loginLink.innerHTML="";
    registerTitle.innerHTML = "ورود";
    submitContainer.replaceChild(backBtn, submitContainer.childNodes[3])
    form.action = "login"
};

function switchRegister() {
    registerTitle.innerHTML = "ثبت نام"
    submitContainer.replaceChild(registerBtn, submitContainer.childNodes[1]);
    registerForm.appendChild(email);
    loginLink.innerHTML = "عضو هستید؟"
    form.action = "user"
    submitContainer.replaceChild(homeBtn, submitContainer.childNodes[3])
    
}


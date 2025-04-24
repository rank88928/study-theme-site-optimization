import { login_user, register_user, verify_id } from "@/store/user.js";

let login_status_tooltip = document.querySelector(".login-status-tooltip");

let uid = verify_id();

if (uid) {
  login_status_tooltip.innerHTML = "進入個人中心";
}

function click_login() {
  let login_email = document.querySelector("#login-email");
  let login_password = document.querySelector("#login-password");

  let user = {
    email: login_email.value,
    password: login_password.value,
  };

  login_user(user);
}

async function click_register() {
  let register_email = document.querySelector("#register-email");
  let register_password = document.querySelector("#register-password");
  let user = {
    email: register_email.value,
    password: register_password.value,
  };

  await register_user(user);
}

let login_btn = document.querySelector(".login-btn");
login_btn.addEventListener("click", click_login);
let register_btn = document.querySelector(".register-btn");
register_btn.addEventListener("click", click_register);

//登入後修改畫面
function login_success() {
  m_login_mask.style.display = "none";
  login_status_tooltip.innerHTML = "進入個人中心";
}

// 登入頁開關
let login_close_btn = document.querySelector(".login-close-btn");
let login_open_btn = document.querySelector(".login-open");
let m_login_mask = document.querySelector(".m_login_mask");

login_close_btn.addEventListener("click", function () {
  m_login_mask.style.display = "none";
});
login_open_btn.addEventListener("click", function () {
  if (verify_id()) {
    window.location.href = "space.html";
  } else {
    m_login_mask.style.display = "flex";
  }
});

//rwd選單開關
let menu_btn = document.querySelector(".menu-btn");
let nav = document.querySelector(".nav");

menu_btn.addEventListener("click", function () {
  nav.classList.toggle("nav-open");
});

export { login_success };

import "./style.scss";

let user_box = document.querySelector(".user-box");

let html = ` <div class="shopping-box">
      <p>只顯示前5筆商品 完整清單請至結帳頁面</p>
      <div class="shopping-item"></div>
    </div>`;

user_box.insertAdjacentHTML("beforeend", html);

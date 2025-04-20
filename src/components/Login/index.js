import "./style.scss";

let html = `<div class="m_login_mask">
  <div class="m_login_box">
    <div class="login-close-btn"><i class="fa-solid fa-x"></i></div>
    <div class="tab-box">
      <a href="#" class="form-tab tab-current">註冊</a>
      <a href="#" class="form-tab">登入</a>
    </div>

    <div class="tab-content">
      <div class="form-login-card card-show">
        <h3>快速註冊</h3>
        <form action="">
          <ul>
            <li>
              <label>電子信箱<span>*必填</span></label>
              <input id="register-email" type="email" required autocomplete="off" />
            </li>
            <li>
              <label>設定密碼<span>*必填</span></label>
              <input id="register-password" type="password" required autocomplete="off" />
            </li>
          </ul>
          <div class="account-tips">
            <p>信箱規則 xxxx@gmail.com 即可通過註冊<br /></p>
          </div>

          <button type="button" class="register-btn">開始使用</button>
        </form>
      </div>

      <div class="form-login-card">
        <h3>歡迎回來</h3>
        <form action="">
          <ul>
            <li>
              <label>請輸入電子信箱</label>
              <input id="login-email" type="email" required autocomplete="off" />
            </li>
            <li>
              <label>請輸入密碼</label>
              <input id="login-password" type="password" required autocomplete="off" />
            </li>
          </ul>
          <div class="account-tips">
            <p>
              測試帳號:zxc123456@gmail.com<br />
              測試密碼:zxc123456<br />
              或可隨意註冊帳號 暫無啟用硬性註冊規則
            </p>
          </div>

          <div class="forgot"><a href="#">忘記密碼?</a></div>
          <button type="button" class="login-btn">登入</button>

          <div class="m_third_party">
            <a href="#" class="login-fb">使用Facebook帳號登入</a>
            <a href="#" class="login-line">使用Line帳號登入</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`;

document.body.insertAdjacentHTML("beforeend", html);

// 切換註冊登入
let form_tab_btn = document.querySelectorAll(".form-tab");
let form_card = document.querySelectorAll(".form-login-card");

form_tab_btn.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    form_tab_btn.forEach(function (btn) {
      btn.classList.remove("tab-current");
    });
    form_card.forEach(function (card) {
      card.classList.remove("card-show");
    });

    form_tab_btn[i].classList.add("tab-current");
    form_card[i].classList.add("card-show");
  });
});

// 輸入框有值 提示下浮
let form_input = document.querySelectorAll(".m_login_box input");
let form_label = document.querySelectorAll(".m_login_box label");

form_input.forEach(function (input, i) {
  input.addEventListener("input", function () {
    if (input.value === "") {
      form_label[i].classList.remove("has-content");
    } else {
      form_label[i].classList.add("has-content");
    }
  });
});

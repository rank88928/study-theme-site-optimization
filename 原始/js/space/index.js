import { get_all_order_data } from "../api/firebase_order_api.js";
import { verify_id, logout } from "../auth/user.js";
import "../shopping/cart_box.js";
let uid;

function page_verify() {
  uid = verify_id();

  if (uid) {
    get_data();
  } else {
    window.location.href = "index.html";
  }
}
page_verify();

let tbody = document.querySelector(".order-tbody");
let user_order_data;
let display_data;
let logout_btn = document.querySelector(".logout-btn");

async function get_data() {
  let data = await get_all_order_data();
  let new_uid = uid.slice(1, -1);
  user_order_data = data.filter((item) => {
    return item.basic.builder === new_uid;
  });
  display_data = user_order_data;

  if (display_data.length === 0) {
    update_empty_table();
  } else {
    update_table();
  }
}

logout_btn.addEventListener("click", logout);

// 點擊展開行
tbody.addEventListener("click", function (event) {
  let row = event.target.closest(".main-row");
  if (!row) return;

  let details_row = row.nextElementSibling;
  if (details_row && details_row.classList.contains("details-row")) {
    details_row.style.display = details_row.style.display === "none" ? "table-row" : "none";
  }
});

function update_empty_table() {
  let buffer_html = `
  <tr class="empty-cart">
    <td colspan="4">
      <div class="empty-text">
        <p>當前沒有訂單</p>
      </div>
    </td>
  </tr>`;
  tbody.innerHTML = buffer_html;
}

//生成html結構
function update_table() {
  function tr_html(item) {
    return `
      <tr class="text-center border main-row">
          <td class="index" >${item.basic.order_id}</td>
          <td class="build_time">${item.basic.build_time}</td>
          <td class="status">${item.order_details.schedule.status}</td>
          <td class="total_price">${item.order_details.total_price}元</td>
      </tr>
      <tr class="details-row" style="display: none;">
          <td colspan="4">
              <div class="detailed-box">
              ${schedule_html(item.order_details.schedule.time_line)}
              <table class="detailed-table">
                  <thead>
                    <tr>
                        <th>商品名稱</th>
                        <th>單價</th>
                        <th>訂購數</th>
                        <th>單項小計</th>
                    </tr>
                  </thead>
                  <tbody class="detailed-tbody">
                    ${get_detailed_product_td_html(item.order_details.product_content)}
                  </tbody>
              </table>
              </div>
          </td>
      </tr>`;
  }

  let buffer_html = "";
  display_data.forEach((item) => {
    buffer_html += tr_html(item);
  });
  tbody.innerHTML = buffer_html;
}

function schedule_html(arr) {
  function parseTime(timeStr) {
    let timeStr24 = timeStr.replace(/年|月/g, "/").replace("日", "");
    let isPM = timeStr24.includes("下午");
    timeStr24 = timeStr24.replace("上午", "").replace("下午", "").trim();
    let [date, time] = timeStr24.split(" ");
    let [hour, minute, second] = time.split(":").map(Number);
    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    let [year, month, day] = date.split("/").map((num) => num.padStart(2, "0"));
    let formattedTime = `${year}/${month}/${day} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    return new Date(formattedTime); // 使用新的格式創建 Date 物件
  }
  // 根據時間進行排序
  let new_arr = arr.sort((a, b) => parseTime(a.time) - parseTime(b.time));

  function full_item(arr) {
    while (arr.length < 3) {
      arr.push({ time: "" });
    }
    return arr;
  }
  arr = full_item(new_arr);

  function get_state_template(arr) {
    arr.forEach((item) => {
      if (item.time !== "") {
        item.class = "state-green";
      } else {
        item.class = "state-gray";
      }
    });
    //最新進度為原色
    let i = arr
      .map((k) => {
        return k.time !== "";
      })
      .lastIndexOf(true);
    arr[i].class = "";
  }

  get_state_template(arr);

  return `<div class="schedule">
                <div class="item ${arr[0].class}">
                    <span class="step" >1</span>
                    <span>待確認</span>
                    <span>訂單正在等候商家成立</span>
                    <span>${arr[0].time}</span>
                </div>
                <div class="item ${arr[1].class}">
                    <span class="step" >2</span>
                    <span>處理中</span>
                    <span>訂單已成立 正在處理中</span>
                    <span>${arr[1].time}</span>
                </div>
                <div class="item ${arr[2].class}">
                    <span class="step" >3</span>
                    <span>已完成</span>
                    <span>訂單已被完成</span>
                    <span>${arr[2].time}</span>
                </div>
            </div>`;
}

function get_detailed_product_td_html(data) {
  let html = "";

  data.forEach((item) => {
    html += `<tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.order_sum}</td>
            <td>${item.subtotal}元</td>
        </tr
    `;
  });
  return html;
}

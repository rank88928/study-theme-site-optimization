import { update_cart_box } from "./cart_box.js";
import { revise_input_num } from "../utils.js";
import { update_cart, delete_cart, get_complete_cart_data } from "./cart_actions.js";
import "../module/index.js";
import { add_order } from "../api/firebase_order_api.js";
import { verify_id } from "../auth/user.js";
import { message } from "../module/cart_message.js";

let display_data = [];
let tbody = document.querySelector("tbody");
let total_order_amount;
let order_btn = document.querySelector(".order-btn");

async function click_add_order() {
  let uid = verify_id();

  if (!uid) {
    message.error("尚未登入 請先登入");
    let m_login_mask = document.querySelector(".m_login_mask");
    m_login_mask.style.display = "block";
    return;
  }

  let order_data = display_data.map((item) => {
    return {
      id: item.key,
      order_sum: item.order,
    };
  });

  try {
    await add_order(uid, order_data, display_data);
    message.success("訂單建立成功");
  } catch (error) {
    return;
  }

  localStorage.removeItem("shopping_records");
  ui_update();
}

function update_total_amount() {
  let total = 0;
  display_data.forEach((item) => {
    total += item.subtotal;
  });
  total_order_amount = total;

  let amount = document.querySelector(".amount");
  amount.innerHTML = total_order_amount + "元";
}

async function ui_update() {
  display_data = await get_complete_cart_data();

  if (display_data.length !== 0) {
    update_table_data();
  } else {
    update_empty_table();
  }

  update_cart_box();
  update_total_amount();
}
ui_update();
// (async function init_data() {
//   display_data = await get_complete_cart_data();

//   if (display_data.length !== 0) {
//     ui_update();
//   } else {
//   }
// })();

document.querySelector("table").addEventListener("click", function (e) {
  let target = e.target;

  if (target.classList.contains("plus-btn")) {
    let box = target.closest(".m-quantity-selector-box");
    let qty_input = box.querySelector(".quantity-box");
    revise_input_num(qty_input, 1);
    qty_input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (target.classList.contains("reduce-btn")) {
    let box = target.closest(".m-quantity-selector-box");
    let qty_input = box.querySelector(".quantity-box");
    if (Number(qty_input.value) === 1) return;
    revise_input_num(qty_input, -1);
    qty_input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (target.closest(".delete-btn")) {
    let id = target.closest("[data-index]")?.dataset.index;
    delete_cart(id);
    ui_update();
  }
});

document.querySelector("table").addEventListener("input", function (e) {
  let target = e.target;
  if (target.classList.contains("quantity-box")) {
    let newValue = Number(target.value);
    if (newValue < 1 || isNaN(newValue)) {
      target.value = 1;
    }

    let id = target.closest("[data-index]")?.dataset.index;
    update_cart(id, Number(target.value));

    ui_update();
  }
});

order_btn.addEventListener("click", click_add_order);

function update_empty_table() {
  let buffer_html = `
    <tr class="empty-cart">
      <td colspan="6">
        <div class="empty-text">
            <p>購物車是空的！快去逛逛吧！</p>
            <a href="./menu.html" class="go-menu">回去挑選</a>
          </div>
      </td>
    </tr>`;
  tbody.innerHTML = buffer_html;
}

function update_table_data() {
  function tr_html(item) {
    return `<tr data-index="${item.id}">
              <td data-label="商品圖片">
                <img src="${item.img}" class="w-16 h-16 object-cover" />
              </td>
              <td class="name" data-label="商品名稱">${item.name}</td>
              <td class="price" data-label="單價">${item.price}</td>
              <td class="order" data-label="數量">
                <div class="m-quantity-selector-box">
                  <input class="reduce-btn" type="button" value="-">
                  <input class="quantity-box" type="text" value="${item.order}"  min="1">
                  <input class="plus-btn" type="button" value="+">
                </div>
              </td>
              <td class="subtotal" data-label="小計">${item.subtotal}元</td>
              <td class="delete" data-label="操作">
                <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
                移除該商品
                </button>
              </td>
            </tr>`;
  }

  let buffer_html = "";
  display_data.forEach((item) => {
    buffer_html += tr_html(item);
  });
  tbody.innerHTML = buffer_html;
}

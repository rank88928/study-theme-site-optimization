import "./style.scss";
import { delete_cart } from "@/shared/shopping/cart_actions.js";
import { get_complete_cart_data } from "@/store/product.js";
import { message } from "@/components/Message/index.js";
import { ui_update } from "@/page/cart/table/index.js";

let user_box = document.querySelector(".user-box");
let html = ` <div class="shopping-box">
      <p>只顯示前5筆商品 完整清單請至結帳頁面</p>
      <div class="shopping-item"></div>
    </div>`;

user_box.insertAdjacentHTML("beforeend", html);

function card_html(item) {
  return `
      <div class="item" data-index="${item.id}">
          <div class="img-control">
              <img src="${item.img}"></img>
          </div>
          <div class="txt-box">
              <p class="txt-name">${item.name}</p>
              <p class="txt-qty">訂購數量:${item.order}</p>
          </div>
          <button class="remove-shopping">
            <i class="fa-solid fa-trash"></i>
          </button>
      </div>`;
}
async function update_cart_box() {
  let display_data = await get_complete_cart_data();
  let shopping_box = document.querySelector(".shopping-item");
  let html = "";

  if (display_data.length == 0) {
    html = `<div class="empty-shopping">當前購物車是空的!~~~</div>`;
  } else {
    for (let i = 0; i < Math.min(5, display_data.length); i++) {
      html += card_html(display_data[i]);
    }
  }
  shopping_box.innerHTML = "";
  shopping_box.insertAdjacentHTML("beforeend", html);
}

document.addEventListener("DOMContentLoaded", () => {
  let shopping_box = document.querySelector(".shopping-item");
  if (!shopping_box) return;

  shopping_box.addEventListener("click", function (e) {
    let card = e.target.closest("[data-index]");
    if (!card) return;

    if (e.target.closest(".remove-shopping")) {
      let id = card.dataset.index;
      let product = delete_cart(id);
      message.success("刪除成功~ " + product.name);
      update_cart_box();

      if (document.querySelector(".table-title")) {
        ui_update();
      }
    }
  });
});

export { update_cart_box };

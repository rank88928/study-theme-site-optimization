import { update_cart_box } from "@/components/NavShoppingBox/index.js";
import { get_complete_cart_data } from "@/store/product.js";

let order_data;
let tbody = document.querySelector("tbody");
let total_order_amount;

async function ui_update() {
  order_data = await get_complete_cart_data();

  if (order_data.length !== 0) {
    table_html();
  } else {
    empty_html();
  }

  update_cart_box();
  update_total();
}

function update_total() {
  let total = 0;
  order_data.forEach((item) => {
    total += item.subtotal;
  });
  total_order_amount = total;

  let amount = document.querySelector(".amount");
  amount.innerHTML = total_order_amount + "元";
}

function empty_html() {
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

function table_html() {
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
  order_data.forEach((item) => {
    buffer_html += tr_html(item);
  });
  tbody.innerHTML = buffer_html;
}

export { ui_update };

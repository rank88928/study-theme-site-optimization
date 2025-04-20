import { delete_cart, get_complete_cart_data } from "@/shared/shopping/cart_actions.js";

document.addEventListener("DOMContentLoaded", () => {
  let shopping_box = document.querySelector(".shopping-item");
  if (!shopping_box) return;

  shopping_box.addEventListener("click", function (e) {
    let card = e.target.closest("[data-index]");
    if (!card) return;

    let id = card.dataset.index;
    delete_cart(id);
  });

  update_cart_box();
});

function shopping_card_html(item) {
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
      html += shopping_card_html(display_data[i]);
    }
  }
  shopping_box.innerHTML = "";
  shopping_box.insertAdjacentHTML("beforeend", html);
}

export { update_cart_box };

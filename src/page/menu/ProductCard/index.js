import { card_config, data_init } from "@/store/product.js";
let card_content = document.querySelector(".card-container");

function card_html(item) {
  return `<li class="card card-${card_config.mode}" data-index='${item.id}'>
        <div class="img-box">
           <img src="${item.img}">
        </div>

        <div class="txt-box">
            <h3>${item.name}</h3>
            <p>${item.product_text}</p>

            <div class="price-box">
                <div class="price">
                    售價:${item.price}元
                </div>
                <div class="m-quantity-selector-box" data-index="${item.id}">
                    <input class="reduce-btn" type="button" value="-">
                    <input class="quantity-box" type="text" value="0">
                    <input class="plus-btn" type="button" value="+">
                    <button class="shopping-btn">
                        <i class="fa-solid fa-cart-shopping icon">加入購物車</i>
                    </button>
                </div>
            </div>
        </div>
    </li> `;
}

function ui_update() {
  let buffer_html = "";
  card_config.display_data.forEach((item) => {
    buffer_html += card_html(item);
  });
  card_content.innerHTML = buffer_html;
}

(async function init() {
  await data_init();
  card_config.update_display_data();

  ui_update();
})();

export { ui_update };

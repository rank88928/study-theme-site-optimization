import "./style.scss";
import list_bk from "@/img/product-list-bk.jpg";
import { get_isListed_product_data } from "@/shared/api/firebase_product_api.js";
import { load_finish } from "@/components/PageLoad/index.js";
let card_content = document.querySelector("#card_content");
let recommend_id = [9, 10, 12, 6, 5, 7, 8, 4, 1]; //展示序列
let product_content = document.querySelector(".product-content");

function select_recommendations_data(data) {
  let recommend_data = data.filter((itme) => recommend_id.includes(itme.id));

  return recommend_data.map((itme) => {
    return {
      name: itme.name,
      img: itme.img,
      price: itme.price,
      product_text: itme.product_text,
    };
  });
}

function card_html(item) {
  return `<li class="wow animate-fade-in-left" data-wow-delay='0.3s'>
              <div class="product-card">
                  <div class="img">
                      <img src="${item.img}">
                      <span><i class="fa-solid fa-heart"></i></span>
                  </div>
                  <div class="txt">
                      <h3>${item.name}</h3>
                      <p>${item.product_text}</p>
                      <div class="price">
                          <span>NT$:${item.price}</span>
                          <a href="menu.html" class="shopping-i-btn-1"><i class="fa-solid fa-cart-shopping icon "></i></a>
                      </div>
                  </div>
              </div>
          </li>`;
}

async function home_page_recommendation_card() {
  let product_data = await get_isListed_product_data();
  let display_data = select_recommendations_data(product_data);

  let buffer_html = "";
  display_data.forEach((itme) => {
    buffer_html += card_html(itme);
  });
  card_content.innerHTML = buffer_html;

  load_finish();
}
home_page_recommendation_card();

//商品列表背景圖
product_content.addEventListener("mouseover", function (e) {
  let element = e.target.closest("li"); // 指向最近li

  if (element) {
    let img = element.querySelector("img");
    product_content.style.backgroundImage = `url(${img.src})`;
  } else {
    product_content.style.backgroundImage = `url(${list_bk})`;
  }
});

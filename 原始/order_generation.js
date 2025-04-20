import * as request from "./data_request.js";
import * as ui_shopping from "./UI_shopping.js";

let data_product = [];
let data_local = [];
let price_container = document.querySelector(".calculate-price-container");

let data_shopping = [];

(async () => {
  await request.check_store();
  data_product = request.data_product;
  data_local = request.data_local;

  data_shopping = data_local.filter((item) => item.order > 0);

  console.log(data_local);
  UI_update_list();
})();

let place = document.querySelector("#place");
let date = document.querySelector("#date");
let take = document.querySelectorAll('#take input[type="radio"]');
let take_meal;
let submit_btn = document.querySelector("#submit-btn");

submit_btn.addEventListener("click", submit_data);

function submit_data() {
  let order = {
    place: place.value,
    date: date.value,
    take: take_meal,
    buying_list: data_shopping,
  };
  console.log(order);
}

//判斷單選框
take.forEach(function (radio) {
  radio.addEventListener("click", check_selected);
});

function check_selected() {
  for (let i = 0; i < take.length; i++) {
    let radio = take[i];
    if (radio.checked) {
      take_meal = radio.value;
      break;
    }
  }
}

//清單顯示
function UI_update_list() {
  data_shopping = data_local.filter((item) => item.order > 0);

  //價格
  let sum = 0;
  price_container.innerHTML = "";
  data_shopping.forEach(function (data, i) {
    sum += data_shopping[i].order * data_shopping[i].price;
    ui_shopping.calculate_price(data);
  });
  let item = `<div class="sum">合計:${sum}元</div>`;
  price_container.insertAdjacentHTML("beforeend", item);
}

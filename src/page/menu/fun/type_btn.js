import { card_config } from "@/store/product.js";
import { ui_update } from "@/page/menu/ProductCard/index.js";
let options = document.querySelector(".options-container");

options.addEventListener("click", function (e) {
  let target = e.target;
  if (target.tagName === "BUTTON") {
    card_config.revise_type(target.dataset.index);
    ui_update();
  }
});

import { revise_input_num } from "@/shared/utils.js";
import { add_to_cart } from "@/shared/shopping/cart_actions.js";
import { message } from "@/components/Message/index.js";

document.querySelector(".card-container").addEventListener("click", function (e) {
  let target = e.target;
  let box = target.closest(".m-quantity-selector-box"); //確定點擊範圍
  if (!box) return;
  let qty_input = box.querySelector(".quantity-box");

  if (target.classList.contains("plus-btn")) {
    revise_input_num(qty_input, 1);
  } else if (target.classList.contains("reduce-btn")) {
    revise_input_num(qty_input, -1);
  } else if (target.closest(".shopping-btn")) {
    //加入購物車
    let num = Number(qty_input.value);
    if (num === 0) {
      message.error("數量不能為0");
      return;
    }

    let id = target.closest(".card").dataset.index;

    let product = add_to_cart(id, num);
    qty_input.value = "0";
    message.success("新增 " + product.name + product.num + "份 成功");
  }
});

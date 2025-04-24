import { revise_input_num } from "@/shared/utils.js";
import { update_cart, delete_cart } from "@/shared/shopping/cart_actions.js";
import { ui_update } from "@/page/cart/table/index.js";
import { message } from "@/components/Message/index.js";

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
    let product = delete_cart(id);
    ui_update();
    message.success("刪除成功~ " + product.name);
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
    let obj = update_cart(id, Number(target.value));

    message.success("修改為" + obj.name + obj.num + "份 成功");

    ui_update();
  }
});

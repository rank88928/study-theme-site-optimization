import "@/shared/common_style.js";
import "./style.scss";
//全域
import "@/components/index.js";
//單頁
import "@/page/cart/table/btn.js";

import { add_order } from "@/shared/api/firebase_order_api.js";
import { verify_id } from "@/store/user.js";
import { message } from "@/components/Message/index.js";
import { ui_update } from "@/page/cart/table/index.js";
import { get_complete_cart_data } from "@/store/product.js";

ui_update();

let display_data = [];
let order_btn = document.querySelector(".order-btn");

async function click_add_order() {
  let uid = verify_id();

  if (!uid) {
    message.error("尚未登入 請先登入");
    let m_login_mask = document.querySelector(".m_login_mask");
    m_login_mask.style.display = "block";
    return;
  }
  display_data = await get_complete_cart_data();
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

order_btn.addEventListener("click", click_add_order);

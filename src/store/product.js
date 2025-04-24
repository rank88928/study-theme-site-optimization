import { get_isListed_product_data } from "@/shared/api/firebase_product_api.js";
import { get_local_shopping_records, store_local_shopping_records } from "@/shared/shopping/cart_records.js";

let product_data = [];

let card_config = {
  mode: "detailed",
  current_type: "全部",
  display_data: [],

  revise_type(key) {
    if (this.current_type === key) {
      return;
    }
    this.current_type = key;
    this.update_display_data();
  },

  update_display_data() {
    if (product_data.length === 0) {
      return;
    }
    if (this.current_type === "全部") {
      this.display_data = product_data;
    } else {
      this.display_data = product_data.filter((item) => {
        return item.type === this.current_type;
      });
    }
  },
};

function select_recommendations_data(data) {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      product_text: item.product_text,
      type: item.type,
    };
  });
}

async function data_init() {
  if (product_data.length === 0) {
    product_data = await get_isListed_product_data();
  }
}

//輔助
function get_name(id) {
  let item = product_data.find((item) => {
    return item.id === Number(id);
  });
  if (item === false) {
    return "";
  }
  return item.name;
}

async function get_complete_cart_data() {
  await data_init();

  let data = [];
  let local_shopping_records = get_local_shopping_records("shopping_records");

  //根據購物紀錄 拿到完整商品資料
  let index = local_shopping_records.map((item) => {
    return parseInt(item.id);
  });

  index.forEach((item) => {
    data.push(
      product_data.find((k) => {
        return item === k.id;
      })
    );
  });

  //根據購物紀錄 填入數量、總價
  data.forEach((item) => {
    let obj = local_shopping_records.find((k) => {
      return item.id === Number(k.id);
    });

    item.order = obj.num;
    item.subtotal = item.price * item.order;
  });
  return data;
}

export { product_data, card_config, data_init, get_name, get_complete_cart_data };

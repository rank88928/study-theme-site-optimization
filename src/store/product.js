import { get_isListed_product_data } from "@/shared/api/firebase_product_api.js";
import { ui_update } from "@/page/menu/ProductCard/index.js";

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
    ui_update();
  },
};

async function get_product_data() {
  let data = await get_isListed_product_data();
  product_data = data;
}

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

(async function init() {
  await get_product_data();
  card_config.update_display_data();
})();

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

export { product_data, card_config, get_name };

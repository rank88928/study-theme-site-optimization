import { get_local_shopping_records, store_local_shopping_records } from "@/shared/shopping/cart_records.js";
import { get_isListed_product_data } from "@/shared/api/firebase_product_api.js";
import { update_cart_box } from "@/shared/shopping/cart_box.js";
import { get_name } from "@/store/product.js";
let all_product_data = [];
let complete_cart_data = [];

function add_to_cart(id, num) {
  let shopping_data = get_local_shopping_records("shopping_records");
  let product = { id, num };
  let obj = shopping_data.find((item) => {
    return item.id === product.id;
  });

  if (obj) {
    obj.num += product.num;
  } else {
    shopping_data.push(product);
  }

  store_local_shopping_records("shopping_records", shopping_data);
  update_cart_box();

  return {
    name: get_name(id),
    num: num,
  };
}

function delete_cart(id) {
  let shopping_data = get_local_shopping_records("shopping_records");
  let index = shopping_data.findIndex((item) => {
    return item.id === id;
  });

  if (index == -1) {
    return;
  }
  shopping_data.splice(index, 1);
  store_local_shopping_records("shopping_records", shopping_data);
  update_cart_box();

  return {
    name: get_name(id),
  };
  // message.success("刪除 " + get_name(id) + " 成功");
}

function update_cart(id, num) {
  let shopping_data = get_local_shopping_records("shopping_records");
  let product = { id, num };
  let obj = shopping_data.find((item) => {
    return item.id === product.id;
  });

  if (!obj) return;

  obj.num = product.num;

  store_local_shopping_records("shopping_records", shopping_data);
  update_cart_box();

  return {
    name: get_name(id),
    num,
  };
  // message.success("修改為 " + get_name(id) + num + "份 成功");
}

async function get_complete_cart_data() {
  if (all_product_data.length === 0) {
    all_product_data = await get_isListed_product_data();
  }

  let local_shopping_records = get_local_shopping_records("shopping_records");

  let index = local_shopping_records.map((item) => {
    return parseInt(item.id);
  });
  complete_cart_data.length = 0;
  index.forEach((item) => {
    complete_cart_data.push(
      all_product_data.find((k) => {
        return item === k.id;
      })
    );
  });

  complete_cart_data.forEach((item) => {
    let obj = local_shopping_records.find((k) => {
      return item.id === Number(k.id);
    });

    item.order = obj.num;
    item.subtotal = item.price * item.order;
  });
  return complete_cart_data;
}

export { add_to_cart, delete_cart, update_cart, get_complete_cart_data };

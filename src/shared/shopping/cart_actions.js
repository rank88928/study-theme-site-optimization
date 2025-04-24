import { get_local_shopping_records, store_local_shopping_records } from "@/shared/shopping/cart_records.js";
import { update_cart_box } from "@/components/NavShoppingBox/index.js";
import { get_name } from "@/store/product.js";

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
}

export { add_to_cart, delete_cart, update_cart };

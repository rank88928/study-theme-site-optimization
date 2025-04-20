import { get_all_data, get_single_data, add_data, update_data } from "./firebase_api.js";
import * as firebase from "./firebase_config.js";
let api = firebase.firestore_api;
const path = "order_data";

function get_current_date_string() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

async function compare_db_index(order_log) {
  let current_date = get_current_date_string();
  if (current_date === order_log.date) {
    let i = order_log.index + 1;
    await update_data("config", "order", { index: i }, false);
    return `${current_date}-${i.toString().padStart(3, "0")}`;
  } else {
    await update_data("config", "order", { date: current_date, index: 0 }, false);
    return `${current_date}+${0}`;
  }
}

async function fill_basic_info(builder) {
  //這裡有bug 字串有"" firebase又會補一組 後臺跟資料庫渲染跟紀錄會出問題
  let new_builder = builder.slice(1, -1);
  let data = {
    order_id: -1,
    builder: new_builder,
    build_time: api.serverTimestamp(),
  };

  try {
    let order_log = await get_single_data("config", "order");
    let index = await compare_db_index(order_log);
    data.order_id = index;

    return data;
  } catch (error) {
    console.error("建立訂單基本資料失敗" + error);
    throw error;
  }
}

function generate_state_log(time_line, text) {
  if (text !== "pending" && text !== "processing" && text !== "finish") {
    throw new Error("傳入狀態不合法");
  }
  let id = Date.now();
  time_line[id] = {
    state: text,
    time: api.serverTimestamp(),
  };
}

function init_schedule() {
  let data = {
    status: "pending",
    time_line: {},
  };
  generate_state_log(data.time_line, "pending");

  return data;
}

//格式化db回傳結構
function format_data(data) {
  //轉換時間格式
  data.forEach((item) => {
    item.basic.build_time = convert_firebase_timestamp_to_UTC8(item.basic.build_time);

    let time_line = item.order_details.schedule.time_line;
    let new_format = [];

    for (let key in time_line) {
      if (time_line.hasOwnProperty(key)) {
        time_line[key].time = convert_firebase_timestamp_to_UTC8(time_line[key].time);
        new_format.push(time_line[key]);
      }
    }
    item.order_details.schedule.time_line = new_format;
  });
  return data;
}

async function generate_product_content(arr, data) {
  let processed_data = [];
  let product_data = [];
  try {
    product_data = data;
  } catch (error) {
    throw error;
  }

  arr.forEach((item) => {
    if (item.order_sum > 0) {
      let use_data = product_data.find((i) => {
        return i.key === item.id;
      });
      let product = {
        id: item.id,
        name: use_data.name,
        price: use_data.price,
        order_sum: item.order_sum,
      };
      product.subtotal = product.price * product.order_sum;

      processed_data.push(product);
    } else {
      throw new Error(`無效的購買數量: ${item.order_sum}`);
    }
  });

  return processed_data;
}

function compute_order_total_price(arr) {
  let total_price = 0;
  arr.forEach((item, index) => {
    if (isNaN(item.subtotal)) {
      throw new Error(`購買清單第${index + 1}項不存在小計`);
    }
    total_price += item.subtotal;
  });
  return total_price;
}

async function add_order(builder, order_data, display_data) {
  let new_data = {
    order_details: {},
  };

  try {
    new_data.basic = await fill_basic_info(builder);
    new_data.order_details.schedule = init_schedule();
    new_data.order_details.product_content = await generate_product_content(order_data, display_data);
    new_data.order_details.total_price = compute_order_total_price(new_data.order_details.product_content);

    await add_data(path, new_data);
  } catch (error) {
    console.error("建立訂單失敗" + error);
    throw error;
  }
}

async function get_all_order_data() {
  try {
    let data = await get_all_data(path);
    return format_data(data);
  } catch (error) {
    console.error(error);
  }
}

//firebase時間戳記轉為UTC+8
function convert_firebase_timestamp_to_UTC8(timestamp) {
  let error_text = "無";

  if (typeof timestamp !== "object" || timestamp === null) {
    return error_text;
  }
  if (typeof timestamp.seconds !== "number" || typeof timestamp.nanoseconds !== "number") {
    return error_text;
  }

  try {
    // 轉換為毫秒級時間戳
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);

    // 轉換為 UTC+8 時區的時間
    const date = new Date(milliseconds);
    const options = {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    let formatted_date = new Intl.DateTimeFormat("zh-TW", options).format(date);

    return formatted_date;
  } catch (error) {
    console.log(error + "時間戳格式解析異常");
    return error_text;
  }
}

export { add_order, get_all_order_data };

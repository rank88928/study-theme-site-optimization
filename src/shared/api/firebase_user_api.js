import { get_all_data, get_single_data, get_total_count, add_data, add_customId_data, delete_data, update_data } from "./firebase_api.js";
import * as firebase from "./firebase_config.js";

let api = firebase.firestore_api;

const path = "user_data";

let user_data_form = {
  name: "新使用者", //默認用戶名
  email: "",
  login_time: "",
  register_time: "",
  role: "generalUser", //預設一般用戶
};

let permissions = {
  superAdmin: {
    product: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
    account: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
    order: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
  },
  generalUser: {
    product: {
      create: false,
      delete: false,
      read: true,
      update: false,
    },
    account: {
      create: false,
      delete: false,
      read: true,
      update: false,
    },
    order: {
      create: false,
      delete: false,
      read: true,
      update: false,
    },
  },
};

let user_api = {
  //新增用戶資料
  add_user: async function async(user) {
    let new_user = structuredClone(user_data_form);
    new_user.email = user.email;
    new_user.register_time = api.serverTimestamp();
    new_user.permissions = permissions.generalUser;

    try {
      await add_customId_data(path, new_user, user.uid);
    } catch (error) {
      throw error;
    }
  },

  //修改為最新登入時間
  latest_login_time: function (uid) {
    let data = {
      login_time: api.serverTimestamp(),
    };
    update_data(path, uid, data, false);
  },

  //查詢單一用戶
  get_user_data: async function (uid) {
    return await get_single_data(path, uid);
  },

  //查詢全部用戶
  get_all_user_data: async () => {
    try {
      let data = await get_all_data(path);

      data.forEach((item) => {
        item.register_time = convert_firebase_timestamp_to_UTC8(item.register_time);
        item.login_time = convert_firebase_timestamp_to_UTC8(item.login_time);
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  },

  //uid是否存在紀錄
  verify_uid: async (uid) => {
    let data = await get_all_data(path);
    return data.find((item) => {
      return item.key === String(uid);
    });
  },

  //權限修正
  permissions_revise: async function (uid) {
    let user_data = await this.get_user_data(uid);
    let data = {
      permissions: {},
    };
    data.permissions = permissions[user_data.role] || permissions.generalUser;
    update_data(path, uid, data, false);
  },
};

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

export { user_api };

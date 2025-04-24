import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@/shared/api/firebase_config.js";
import { user_api } from "@/shared/api/firebase_user_api.js";
import { message } from "@/components/Message/index.js";
import { login_success } from "@/shared/header.js";
//用戶資料
let user_data = {
  uid: "",
  email: "",
  role: "",
};

//信箱註冊驗證
async function register_user(user) {
  try {
    let new_user = await createUserWithEmailAndPassword(auth, user.email, user.password);

    let user_data = {
      uid: new_user.user.uid,
      email: String(user.email),
    };

    await user_api.add_user(user_data); //新增使用者
    message.success("註冊成功~~ 即將跳轉!");
    login_user(user);
  } catch (error) {
    console.error("Firebase 註冊錯誤:", error);
    if (error.code === "auth/email-already-in-use") {
      message.error("註冊失敗~~ 此信箱已被註冊，請使用其他信箱!");
    } else if (error.code === "auth/invalid-email") {
      message.error("註冊失敗~~ 請輸入有效的電子郵件地址!");
    } else if (error.code === "auth/weak-password") {
      message.error("註冊失敗~~ 密碼強度不足，請使用更強的密碼!");
    } else {
      message.error("註冊失敗~~ 註冊時發生錯誤，請稍後再試！");
    }
  }
}

//登入驗證
async function login_user(user) {
  try {
    await login_process(user.email, user.password);

    message.success("登入成功!");
    login_success();
  } catch (error) {
    message.error("登入失敗! 請確認帳號或密碼是否正確");
    console.error(error);
  }
}

// 登入
async function login_process(email, password) {
  try {
    let auth_user = await signInWithEmailAndPassword(auth, email, password);
    user_data.uid = auth_user.user.uid;
    store_uid_records("uid", user_data.uid);

    await user_api.latest_login_time(user_data.uid);

    await get_user_data();
  } catch (error) {
    throw error;
  }
}

//紀錄登入狀態
function store_uid_records(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//取得用戶資料
async function get_user_data() {
  let data = await user_api.get_user_data(user_data.uid);
  user_data.email = data.email;
  user_data.role = data.role;
}

//合法uid驗證
// verify_uid: async function () {
//   let user_data = await user_api.verify_uid(this.uid);

//   if (user_data) {
//     this.data.email = user_data.email;
//     this.data.role = user_data.role;
//     return true;
//   } else {
//     return false;
//   }

function verify_id() {
  let id = localStorage.getItem("uid");
  if (id) {
    return id;
  } else {
    return false;
  }
}

//登出清除uid紀錄
function logout() {
  localStorage.removeItem("uid");
  window.location.href = "index.html";
}

export { register_user, login_user, user_data, verify_id, logout };

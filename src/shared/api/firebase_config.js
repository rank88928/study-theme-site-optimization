import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaBJ4mgFMfiK-b4M84tbEIzK62vjHNOjY",
  authDomain: "test-1-e3a96.firebaseapp.com", //用戶登入驗證
  projectId: "test-1-e3a96",
  storageBucket: "test-1-e3a96.firebasestorage.app",
  messagingSenderId: "850396850366", //訊息推送識別
  appId: "1:850396850366:web:f9a4eaf5c2cea38a4196ef",
  measurementId: "G-KG1CQHLG8J",
};

const app = initializeApp(firebaseConfig);
const firestore_db = getFirestore(app);
const auth = getAuth(app);

const firestore_api = {
  db: firestore_db,
  getFirestore, // 獲取Firestore實例
  doc, //查詢集合內的文檔(資料夾內的文檔 有數據)
  getDoc, // 獲取指定文檔的資料
  setDoc, // 創建或更新文檔資料
  updateDoc, // 更新文檔資料
  deleteDoc, // 刪除文檔資料
  collection, //查詢集合(整個資料夾 沒有數據)
  getDocs, //獲取全部文檔資料
  arrayUnion, //推送數組格式
  serverTimestamp, //伺服器時間戳記
};

export { firebaseConfig, firestore_api, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail };

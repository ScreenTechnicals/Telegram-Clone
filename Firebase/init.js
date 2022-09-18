import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAu-NJsxp88hyr5-FCIJpDebpsSWBwuSlM",
  authDomain: "telegram-clone-4cce1.firebaseapp.com",
  projectId: "telegram-clone-4cce1",
  storageBucket: "telegram-clone-4cce1.appspot.com",
  messagingSenderId: "663163975500",
  appId: "1:663163975500:web:52cf7d495f43bea528c1e9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);

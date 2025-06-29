// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6_Fe1JfiOYSvIZL3MtmKiSIeAZ9tzeDY",
  authDomain: "shop-bf5af.firebaseapp.com",
  databaseURL: "https://shop-bf5af-default-rtdb.firebaseio.com",
  projectId: "shop-bf5af",
  storageBucket: "shop-bf5af.firebasestorage.app",
  messagingSenderId: "971337243059",
  appId: "1:971337243059:web:8c41ff88f1506d006fd3c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
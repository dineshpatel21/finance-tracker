// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd81ErdwiU5_dG8ZZkTBrAmPt98T2JRiA",
  authDomain: "finance-tracker-8a610.firebaseapp.com",
  projectId: "finance-tracker-8a610",
  storageBucket: "finance-tracker-8a610.appspot.com",
  messagingSenderId: "1086891609249",
  appId: "1:1086891609249:web:2232364cc4a0fd25c4f4e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

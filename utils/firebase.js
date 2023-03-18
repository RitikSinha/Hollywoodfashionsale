// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyuoH7NdeW9s3Zv4TXmFyvZrE1sM5cZUY",
  authDomain: "hollywoodfashionsale.firebaseapp.com",
  projectId: "hollywoodfashionsale",
  storageBucket: "hollywoodfashionsale.appspot.com",
  messagingSenderId: "511641827378",
  appId: "1:511641827378:web:792a97d96210637ef5642b",
  measurementId: "G-LHGLB145X3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//window is not defined in nextjs

// export const analytics = getAnalytics(app);
export const auth = getAuth(app);

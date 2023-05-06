// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5LsSXvdzE0xQAo_gcQRqAKCfFy1Z9tAs",
  authDomain: "react-65e68.firebaseapp.com",
  projectId: "react-65e68",
  storageBucket: "react-65e68.appspot.com",
  messagingSenderId: "923891573439",
  appId: "1:923891573439:web:528ff2559ca88199a11c0a",
  measurementId: "G-F49V97G6WQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARUArd-k5arqiJLX5lG5JtBhKBv2Jns5I",
  authDomain: "farhan-vai-booking-system.firebaseapp.com",
  projectId: "farhan-vai-booking-system",
  storageBucket: "farhan-vai-booking-system.appspot.com",
  messagingSenderId: "1005711922924",
  appId: "1:1005711922924:web:8680c91ed09ec81627b7c9",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

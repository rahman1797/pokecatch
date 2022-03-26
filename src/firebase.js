// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPmQEaKNtNuqRbRWRfjMhWROnAGLX1p2A",
  authDomain: "pokecatch-mrn.firebaseapp.com",
  projectId: "pokecatch-mrn",
  storageBucket: "pokecatch-mrn.appspot.com",
  messagingSenderId: "234271844972",
  appId: "1:234271844972:web:1c5a9041bf95f4a3c1c649",
  measurementId: "G-KW1WGZB5RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
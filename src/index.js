import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAw_Ekb8m-jkMI3mocOfzC3iKh8cMk86Q",
  authDomain: "edl-hot-plate.firebaseapp.com",
  projectId: "edl-hot-plate",
  storageBucket: "edl-hot-plate.appspot.com",
  messagingSenderId: "141221386798",
  appId: "1:141221386798:web:d19c2c8472f9cd5729ddbf",
  measurementId: "G-ZEQ27V9XWE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

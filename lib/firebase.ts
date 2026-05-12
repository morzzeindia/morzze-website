// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPDCiGmNrX310W7QFEV9-1O6opqobHH5o",
    authDomain: "authentication-896db.firebaseapp.com",
    projectId: "authentication-896db",
    storageBucket: "authentication-896db.firebasestorage.app",
    messagingSenderId: "504810779206",
    appId: "1:504810779206:web:8c3f7d708c5927a5675047",
    measurementId: "G-F3GT4L9DH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
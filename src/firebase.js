// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC24s7Oc18eOhDpocFex1KcZMwXK2wz0OM",
  authDomain: "maitri-2039d.firebaseapp.com",
  projectId: "maitri-2039d",
  storageBucket: "maitri-2039d.firebasestorage.app",
  messagingSenderId: "514757980887",
  appId: "1:514757980887:web:f21c56b1490d5ce76ab692",
  measurementId: "G-1V28STNXN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;

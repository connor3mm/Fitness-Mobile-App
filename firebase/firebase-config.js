// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDHNlXsOF3nZtdDcdePQWI1Ss0Xp3IRclU",
  authDomain: "fitness-app-84518.firebaseapp.com",
  projectId: "fitness-app-84518",
  storageBucket: "fitness-app-84518.appspot.com",
  messagingSenderId: "465715105339",
  appId: "1:465715105339:web:ad2fc42fc79c224d46d61e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
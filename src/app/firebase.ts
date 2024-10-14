// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRZpw4euAMRXms7zY6mwSbYn0E9NfFiM8",
  authDomain: "test-rev4.firebaseapp.com",
  projectId: "test-rev4",
  storageBucket: "test-rev4.appspot.com",
  messagingSenderId: "648358665588",
  appId: "1:648358665588:web:fd31452ca67899929d2021"
  
};

// Initialize Firebase
const app= firebase.initializeApp(firebaseConfig);
const auth=  getAuth(app);
const imgDb =  getStorage(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, imgDb, db, googleProvider, signInAnonymously };

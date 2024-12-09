import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKX7NqrrKb5iiAShrg_KndYL3kjV68o4M",
  authDomain: "notes-app-c688f.firebaseapp.com",
  projectId: "notes-app-c688f",
  storageBucket: "notes-app-c688f.firebasestorage.app",
  messagingSenderId: "993514960024",
  appId: "1:993514960024:web:35996ba3710a57ee710ced",
  measurementId: "G-EGPC2B0KH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

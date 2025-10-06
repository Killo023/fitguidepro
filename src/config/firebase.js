import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase project configuration
// Get these values from: https://console.firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyCw0n8ndyfFuGnharLNevCoWphnDdw3cWI",
  authDomain: "nannyatfee.firebaseapp.com",
  projectId: "nannyatfee",
  storageBucket: "nannyatfee.firebasestorage.app",
  messagingSenderId: "453653762703",
  appId: "1:453653762703:web:6283d5e599fbc5b72996fa",
  measurementId: "G-4QQPPJE69R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

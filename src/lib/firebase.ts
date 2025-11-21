import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBTCOc6qg67_RDnn9N3kaCE9jluPJ410wM",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "fitguide-92e92.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fitguide-92e92",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "fitguide-92e92.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "956676528614",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:956676528614:web:323ebbdf76887db9c8de27",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-BWFM5Q6WFB"
};

const getOrInitializeApp = () => {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
};

const app = getOrInitializeApp();
const auth = getAuth(app);

// Use initializeFirestore to enable persistence
const db = initializeFirestore(app, {
    localCache: memoryLocalCache()
});


export { app, auth, db };

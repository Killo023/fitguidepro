import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAIb3LmGncC_77FCVuDSro6hUKH-UqdXHk",
    authDomain: "fitness-compass-3farx.firebaseapp.com",
    projectId: "fitness-compass-3farx",
    storageBucket: "fitness-compass-3farx.appspot.com",
    messagingSenderId: "503870741484",
    appId: "1:503870741484:web:ac845fea3034d04366fec9"
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

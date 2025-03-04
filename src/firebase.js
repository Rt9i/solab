import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // For authentication
import { getFirestore } from 'firebase/firestore'; // For Firestore

const firebaseConfig = {
  apiKey: 'AIzaSyBJD_bhK5hWcHx_vy4mFiWbc-8ihblOQ80',
  authDomain: 'solab-37417.firebaseapp.com',
  projectId: 'solab-37417',
  storageBucket: 'solab-37417.firebasestorage.app',
  messagingSenderId: '516486248756',
  appId: '1:516486248756:web:abceb6c7188e4d6115cd61',
  measurementId: 'G-15T20PV1WW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
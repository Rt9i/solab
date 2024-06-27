// src/firebaseConfig.ts
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "253100960092",
  authDomain: "https://solab-server.onrender.com",
  projectId: "solab-eb3ba",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:253100960092:android:341da7583fca3689fcb999",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };

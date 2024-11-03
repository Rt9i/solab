// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUUhxCUFU9p9u36L8qRSez9UlmYuqqOI8",  // Your API key
  authDomain: "solab-37417.firebaseapp.com",       // This may not be listed in your JSON but is typically in the format "YOUR_PROJECT_ID.firebaseapp.com"
  projectId: "solab-37417",
  storageBucket: "solab-37417.appspot.com",         // This should match the storage bucket name format
  messagingSenderId: "516486248756",                 // Your project number
  appId: "1:516486248756:android:61d52187b54dc5ae15cd61", // The app ID from your JSON
  measurementId: "YOUR_MEASUREMENT_ID"               // Optional, if you have Google Analytics set up
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication instance

export { auth };

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'; 

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
const db = getFirestore(app);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app); // Use default web auth
} else {
  // For mobile, use AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Function to get cities from Firestore
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

// Phone Verification Modal Component
const PhoneVerification = () => {
  const [cities, setCities] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  
  useEffect(() => {
    async function fetchCities() {
      try {
        const cityData = await getCities(db);
        setCities(cityData);
      } catch (error) {
        console.error('Error fetching cities: ', error);
      }
    }

    fetchCities();
  }, []);

  // Initialize reCAPTCHA for phone verification
  let recaptchaVerifier;
  if (Platform.OS !== 'web') {
    recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA verified');
      },
    }, auth);
  }

  // Send verification code
  const sendVerificationCode = async (phone: string) => {
    try {
      if (Platform.OS === 'web') {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier);
        setVerificationId(verificationId);
        alert('Code sent! Check your phone for the verification code.');
      } else {
        // For mobile use signInWithPhoneNumber
        const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
        setVerificationId(confirmationResult.verificationId);
        alert('Code sent! Check your phone for the verification code.');
      }
    } catch (error) {
      console.error('Error sending verification code: ', error);
      alert('Failed to send verification code: ' + error.message);
    }
  };

  // Confirm verification code
  const confirmVerificationCode = async () => {
    try {
      if (!verificationId || !verificationCode) {
        alert('Please enter the verification code.');
        return;
      }

      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await auth.signInWithCredential(credential);
      alert('Phone number verified!');
    } catch (error) {
      console.error('Error confirming verification code: ', error);
      alert('Invalid verification code.');
    }
  };

  return (
    <div>
      <h1>Cities List</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{JSON.stringify(city)}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={() => sendVerificationCode(phoneNumber)}>Send Verification Code</button>

        {verificationId && (
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
            />
            <button onClick={confirmVerificationCode}>Confirm Verification</button>
          </div>
        )}
      </div>
    </div>
  );
};

export { app, auth, db, PhoneVerification };

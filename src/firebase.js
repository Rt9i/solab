import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBJD_bhK5hWcHx_vy4mFiWbc-8ihblOQ80',
  authDomain: 'solab-37417.firebaseapp.com',
  projectId: 'solab-37417',
  storageBucket: 'solab-37417.appspot.com',
  messagingSenderId: '516486248756',
  appId: '1:516486248756:web:abceb6c7188e4d6115cd61',
  measurementId: 'G-15T20PV1WW',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const cityData = await getCities(db);
      setCities(cityData);
    }
    fetchCities();
  }, []);

  return (
    <div>
      <h1>Cities List</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{JSON.stringify(city)}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;

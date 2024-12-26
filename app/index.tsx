import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from '../src/store/solabContext';
import {
  getUserByID,
  getUserProducts,
  getDataFromDataBase,
} from '../src/res/api';
import {useRouter} from 'expo-router';
import Images from '@/src/assets/images/images';

const Index = () => {
  const nav = useRouter();
  const {setUser, saveUserProducts, setData, logout} = useContext(SolabContext);
  const [loading, setLoading] = useState(false);

  const isWeb = Platform.OS === 'web';

  /**
   * Fetch data for products and update the store.
   */
  const fetchData = async () => {
    try {
      console.log('Fetching data from database...');
      const result = await getDataFromDataBase();
      setData(result);
      console.log('Data fetched successfully:', result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
   * Initialize the app: handle user session, fetch data, and navigate.
   */
  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);

    try {
      let asyncUser = null;

      // Skip AsyncStorage logic for web
      if (!isWeb) {
        asyncUser = await AsyncStorage.getItem('user');
        asyncUser = asyncUser ? JSON.parse(asyncUser) : null;
      }

      if (!asyncUser) {
        console.log('No user found in storage. Fetching initial data...');
        await fetchData(); // Fetch app-wide data
        nav.replace('/home'); // Redirect to home
        return;
      }

      console.log('User found:', asyncUser);

      // Fetch user details and their products
      const newUser = await getUserByID(asyncUser._id);
      if (!newUser || !newUser.role) throw new Error('Invalid user data');

      setUser(newUser);
      const response = await getUserProducts(asyncUser._id);
      saveUserProducts(response);

      // Navigate based on user role
      switch (newUser.role) {
        case 'client':
          nav.navigate('/home');
          break;
        case 'worker':
          nav.navigate('/WorkersHome');
          break;
        case 'staff':
          nav.navigate('/StaffHome');
          break;
        default:
          console.error('Invalid user role');
      }
    } catch (error) {
      console.error('Initialization error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Initialize app logic on component mount
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image source={Images.whiteLogo()} style={styles.image} />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 20,
  },
});

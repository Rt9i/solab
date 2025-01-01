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
import {useFocusEffect, useRouter} from 'expo-router';
import Images from '@/src/assets/images/images';

const Index = () => {
  const navigation = useRouter();
  const {setUser, saveUserProducts, setData, logout} = useContext(SolabContext);
  const [loading, setLoading] = useState(false);

  const nav = (name: string) => {
    navigation.navigate(name as any);
  };
  const navReplace = (name: string) => {
    navigation.navigate(name as any);
  };
  const fetchData = async () => {
    try {
      console.log('Fetching data from database...');
      const result = await getDataFromDataBase();
      setData(result);
      console.log('Data fetched successfully:');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getPolicyAcceptValue = async () => {
    try {
      const value = await AsyncStorage.getItem('isAccepted');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        console.log('Retrieved isAccepted value:', parsedValue);
        return parsedValue;
      }
      return false;
    } catch (error) {
      console.error('Error retrieving isAccepted value:', error);
      return false;
    }
  };

  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);

    try {
      const policyAccept = await getPolicyAcceptValue();
      let asyncUser = null;

      await fetchData();

      asyncUser = await AsyncStorage.getItem('user');
      asyncUser = asyncUser ? JSON.parse(asyncUser) : null;
      console.log('policy result: ', policyAccept);
      if (policyAccept == false) {
        nav('/Policy');
        return console.log('policy: ', policyAccept);
      }

      if (!asyncUser) {
        console.log('No user found in storage. Fetching initial data...');
        navReplace('/home');
        return;
      }

      console.log('User found:', asyncUser);

      const newUser = await getUserByID(asyncUser._id);
      if (!newUser || !newUser.role) throw new Error('Invalid user data');

      setUser(newUser);
      const response = await getUserProducts(asyncUser._id);
      saveUserProducts(response);
      if (!policyAccept) return navReplace('/Policy');
      switch (newUser.role) {
        case 'client':
          nav('/home');
          break;
        case 'worker':
          nav('/WorkersHome');
          break;
        case 'staff':
          nav('/StaffHome');
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

  useFocusEffect(
    React.useCallback(() => {
      initializeApp(); // Run when screen comes into focus
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image
          source={Images.whiteLogo()}
          resizeMode="contain"
          style={styles.image}
        />
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
  },
  loader: {
    marginTop: 20,
  },
});

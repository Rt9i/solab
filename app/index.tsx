import {StyleSheet, View, ActivityIndicator, Image} from 'react-native';
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
  const nav = useRouter();
  const {setUser, saveUserProducts, setData} = useContext(SolabContext);
  const [loading, setLoading] = useState(true);

  const checkAsyncStorageForUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('User loaded from AsyncStorage:', parsedUser);
        return parsedUser; // Return user for further use
      }
      console.log('No user found in AsyncStorage');
      return null;
    } catch (error) {
      console.error('Failed to load user from AsyncStorage:', error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const result = await getDataFromDataBase();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const initializeApp = async () => {
    console.log('Initializing app...');

    const asyncUser = await checkAsyncStorageForUser();
    console.log('AsyncStorage user data:', asyncUser);

    if (!asyncUser) {
      await fetchData();
      console.log('User is null, navigating to Login');
      nav.replace('/Home');
      return;
    }

    console.log('User found, proceeding to fetch additional data and navigate');

    const updateUserAndFetchProducts = async () => {
      try {
        console.log('Fetching user and products...');
        const newUser = await getUserByID(asyncUser._id);
        await fetchData();
        if (!newUser || !newUser.role) {
          console.error('Invalid user data:', newUser);
          setLoading(false);
          return;
        }

        setUser(newUser);
        console.log('User role:', newUser.role);

        const response = await getUserProducts(asyncUser._id);
        saveUserProducts(response);

        switch (newUser.role) {
          case 'client':
            console.log('Navigating to Home');
            nav.navigate('/Home');
            break;
          case 'worker':
            console.log('Navigating to WorkersHome');
            nav.navigate('/WorkersHome');
            break;
          case 'staff':
            console.log('Navigating to StaffHome');
            nav.navigate('/StaffHome');
            break;
          default:
            console.error('Invalid user role, no navigation');
        }
      } catch (error) {
        console.error('Error fetching user or products:', error);
      } finally {
        setLoading(false);
      }
    };

    await updateUserAndFetchProducts();
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Start loading when the screen is focused
      initializeApp();
    }, []),
  );

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
// app/index.tsx
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import SolabContext from '../src/store/solabContext';
import {
  getUserByID,
  getUserProducts,
  getDataFromDataBase,
} from '../src/res/api';
import {useRouter} from 'expo-router';
import Images from '@/src/assets/images/images';
import Sizes from '@/src/res/sizes';

const Index = () => {
  const nav = useRouter();
  const {setUser, saveUserProducts, setData} = useContext(SolabContext);
  const currentUserId = useContext(SolabContext).user?._id;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await getDataFromDataBase();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateUserAndFetchProducts = async () => {
      if (!currentUserId) {
        setLoading(false); // Set loading to false if no user ID
        return;
      }

      try {
        const newUser = await getUserByID(currentUserId);
        if (!newUser || !newUser.role) {
          console.error('User data is invalid:', newUser);
          setLoading(false); // Set loading to false for invalid user
          return;
        }

        setUser(newUser);

        const response = await getUserProducts(currentUserId);
        saveUserProducts(response);

        switch (newUser.role) {
          case 'client':
            nav.replace('Home'); // Navigate to Home if client
            break;
          case 'worker':
            nav.replace('WorkersHome'); // Navigate to WorkersHome if worker
            break;
          case 'staff':
            nav.replace('StaffHome'); // Navigate to StaffHome if staff
            break;
          default:
            console.error('Unknown user role:', newUser.role);
            break;
        }
      } catch (error) {
        console.error('Error fetching user or products:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    // Fetch data and update user if user ID is present
    if (currentUserId) {
      fetchData();
      updateUserAndFetchProducts();
    } else {
      setLoading(false); // No user ID, just stop loading
    }
  }, [currentUserId]);

  // If the user is not authenticated, show the index view
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

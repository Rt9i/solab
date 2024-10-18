import {Image, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import ScreenNames from '../routes/ScreenNames';
import Images from '../src/assets/images/images';
import {
  getUserByID,
  getUserProducts,
  getDataFromDataBase,
} from '../src/res/api';
import SolabContext from '../src/store/solabContext';

const Splash = props => {
  const {setUser, saveUserProducts, setData} = useContext(SolabContext);
  const currentUserId = useContext(SolabContext).user?._id;
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetchedData.current) {
        return;
      }
      hasFetchedData.current = true;

      try {
        const result = await getDataFromDataBase();
        setData(result);
        // console.log('Data fetched:', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateUserAndFetchProducts = async () => {
      if (!currentUserId) {
        return;
      }

      try {
        const newUser = await getUserByID(currentUserId);
        // Check if newUser is valid
        if (!newUser || !newUser.role) {
          console.error('User data is invalid:', newUser);
          return;
        }

        setUser(newUser);

        const response = await getUserProducts(currentUserId);
        saveUserProducts(response);

        // Check if newUser.role is defined before using it
        if (newUser.role === 'client') {
          props.navigation.replace('home');
        } else if (newUser.role === 'worker') {
          props.navigation.replace('workerHome');
        } else if (newUser.role === 'staff') {
          props.navigation.replace('StaffHome');
        }
      } catch (error) {
        console.error('Error fetching user or products:', error);
      }
    };

    if (currentUserId) {
      fetchData();
      updateUserAndFetchProducts(); // Update user and fetch products
    }
  }, [currentUserId]);

  return (
    <View style={styles.container}>
      <Image source={Images.whiteLogo()} style={styles.image} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 500,
    resizeMode: 'contain',
  },
});

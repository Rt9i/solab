import {Image, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ScreenNames from '../../routes/ScreenNames';
import Images from '../assets/images/images';
import {getUserByID, getUserProducts} from '../res/api'; // Import the function
import SolabContext from '../store/solabContext';

const Splash = props => {
  const {user, setUser, saveUserProducts} = useContext(SolabContext);
  const currentUserId = user ? user._id : null;
  const [hasNavigated, setHasNavigated] = useState(false); // State to track navigation

  useEffect(() => {
    const updateUserAndFetchProducts = async () => {
      try {
        // Update user
        const newUser = await getUserByID(user._id);
        setUser(newUser);
        console.log('====================================');
        console.log('user rn bro', newUser);
        console.log('====================================');

        // Fetch and save user products after updating the user
        if (currentUserId) {
          const response = await getUserProducts(currentUserId);
          saveUserProducts(response);
        }

        // Navigate based on user role
        if (!hasNavigated) {
          if (newUser.role === 'client') {
            props.navigation.replace(ScreenNames.home);
          } else if (newUser.role === 'worker') {
            props.navigation.replace(ScreenNames.workerHome);
          }
          setHasNavigated(true); // Set the navigation flag
        }
      } catch (error) {
        console.error('Error fetching user or products:', error);
      }
    };

    if (currentUserId && !hasNavigated) {
      updateUserAndFetchProducts();
    }
  }, [currentUserId, hasNavigated]); // Remove user from dependencies

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

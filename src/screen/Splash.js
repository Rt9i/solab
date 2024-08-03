import { Image, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import ScreenNames from '../../routes/ScreenNames';
import Images from '../assets/images/images';
import { getUserProducts } from '../res/api'; // Import the function
import SolabContext from '../store/solabContext';

const Splash = (props) => {
  const { user, saveUserProducts } = useContext(SolabContext);
  const currentUserId = user ? user._id : null;

  useEffect(() => {
    if (currentUserId) {
      // Fetch user products and update context
      getUserProducts(currentUserId).then((response) => {
        if (response.products) {
          saveUserProducts(response.products); // Save products to context
        }
      }).catch(error => {
        console.error('Error fetching user products:', error);
      });
    }

    // Navigate to home screen
    const navigateHome = () => {
      props.navigation.navigate(ScreenNames.splash);
      setTimeout(() => {
        props.navigation.replace(ScreenNames.home);
      }, 500);
    };
    navigateHome();

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

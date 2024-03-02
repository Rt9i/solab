import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { Component, useEffect } from 'react';
import ScreenNames from '../../routes/ScreenNames';
import { screensEnabled } from 'react-native-screens';
import Images from '../assets/images/images';
import { TouchableOpacity } from 'react-native';



const Splash = props => {
  console.log('can go back? ', props.navigation.canGoBack());

  const navigateHome = () => {
    props.navigation.navigate(ScreenNames.splash);
    setTimeout(() => {
      props.navigation.replace(ScreenNames.home);
    }, 500);
  };
  useEffect(() => {
    navigateHome();

     
  }, []) 


  return (

    <View style={styles.conatiner}>
      <TouchableOpacity onPress={navigateHome} >
     
        <Image
          source={Images.whiteLogo()}
          style={styles.image}
        />
      </TouchableOpacity>

    </View>

  );
};

export default Splash;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    flex: 1,
    width: 500,
    resizeMode: 'contain',


  }

});

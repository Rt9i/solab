import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenNames from '../../routes/ScreenNames';
import { screensEnabled } from 'react-native-screens';
timePassed = false;

const Splash = props => {
  console.log('can go back? ', props.navigation.canGoBack());

  const navigateHome = () => {
    props.navigation.navigate(ScreenNames.home);
    console.log("navigating home ")
  };
 

  


  
  

  return (
    <View style={styles.conatiner}>
      {/* <Button title="go back home" onPress={navigateHome} /> */}
     
      <Image
        source={require('../assets/Images/image')} 
        style={styles.image}
      />

      
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image:{
    flex:1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
    
  }
  
});

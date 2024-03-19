import { TouchableOpacity, Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Images from '../assets/images/images';
import ScreenNames from '../../routes/ScreenNames';
import BottomBar from '../Components/BottomBar';

const Home = props => {

  const navigateDogsStore = () => {
    props.navigation.navigate(ScreenNames.Tabs, { screen: ScreenNames.dogsStore});
  }
  const navigateCatsStore = () => {
    props.navigation.navigate(ScreenNames.Tabs, { screen: ScreenNames.catsStore })
  }


  return (
    <View style={styles.container} >

      <View style={styles.dogs}>
        <TouchableOpacity onPress={navigateDogsStore} style={styles.cattouch} >
          <Image source={Images.dog()} style={styles.dogImage} />
          <Text style={styles.dogsButtonText}>Dog's Store</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cats}>
        <TouchableOpacity onPress={navigateCatsStore} style={styles.cattouch} >
          <Image source={Images.cat()} style={styles.catImage} />
          <Text style={styles.catsButtonText}>Cat's Store</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  dogtouch: {
    height: '100%',
  },
  cattouch: {
    height:'100%',

  },
  container: {
    flex: 1,
    flexDirection: 'row',

  },

  dogs: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },

  cats: {
    flex: 1,
    backgroundColor: '#6CCAFF',
    width: '100%',
  },

  dogImage: {
    height: 250,
    marginTop: 300,
    width: '100%',
    resizeMode: 'cover',
    marginLeft: 10,
  },
  catImage: {
    height: 250,
    marginTop: 300,
    width: 190,



  },

  dogsButtonText: {
    color: 'white',
    fontWeight: 'bold',

    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',

  },
  catsButtonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
  },

});

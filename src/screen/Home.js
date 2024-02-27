import { TouchableOpacity, Button, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Images from '../assets/images/images';
import ScreenNames from '../../routes/ScreenNames';

const Home = props => {
  const navigateDogsStore = () => {
    props.navigation.navigate(ScreenNames.dogsStore);
  }
  const navigateCatsStore = () => {
    props.navigation.navigate(ScreenNames.catsStore)

  }

 
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={navigateDogsStore} >
        <View style={styles.dogs}>
          <Image source={Images.dog()} style={styles.dogImage} />
          <Text style={styles.dogsButtonText}>Dog's Store</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={navigateCatsStore} >
        <View style={styles.cats}>
          <Image source={Images.cat()} style={styles.catImage} />
          <Text style={styles.catsButtonText}>Cat's Store</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

  },

  dogs: {
    flex: 1,
    backgroundColor: 'black',

  },

  cats: {
    flex: 1,
    backgroundColor: '#518CFF',


  },


  dogImage: {
    height: 500,
    marginTop: 200,
    width: '100%',

    resizeMode: 'cover'

  },
  catImage: {
    height: 500,
    marginTop: 200,
    width: '100%',
    resizeMode: 'cover',

  },

  dogsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  catsButtonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 40,
    margin: 10,
  }

});

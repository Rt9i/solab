import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CatsStore from './src/screen/CatsStore';
import { Items } from './src/res/Data';
import MainNavigation from './routes/nav';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenNames from './routes/ScreenNames';

import Home from './src/screen/Home';
import Cart from './src/screen/Cart';

const App = () => {
  
  return (

    <View style={styles.container}>
      <MainNavigation />


      
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  greensqr: {
    backgroundColor: 'green',
    height: 50,
    width: 50,
    marginRight: 20,
  },
  topContainer: {
    flexDirection: 'row',
  },
  firstUI: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

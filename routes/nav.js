import React from 'react';
import { NavigationContainer, TabActions, TabRouter, createNavigatorFactory } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import ScreenNames from './ScreenNames';
import Cart from '../src/screen/Cart';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import ProductScreen from '../src/screen/ProductScreen';
import { Image, TouchableOpacity, View, Text, Button } from 'react-native';
import DogsStore from '../src/screen/DogsStore';
import CatsStore from '../src/screen/CatsStore';
import Images from '../src/assets/images/images';
import { BottomTabBar, createBottomTabNavigator,Tab, } from '@react-navigation/bottom-tabs';
import { Screen } from 'react-native-screens';
import { Header } from 'react-native/Libraries/NewAppScreen';

const MainNavigation = () => {
  
  const Stack = createNativeStackNavigator();
  


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.splash} component={Splash} />
        <Stack.Screen name={ScreenNames.catsStore} component={CatsStore} />
        <Stack.Screen name={ScreenNames.cart} component={Cart} />
        <Stack.Screen name={ScreenNames.home} component={Home} options={{headerShown: false}} />
        <Stack.Screen name={ScreenNames.login} component={Login} />
        <Stack.Screen name={ScreenNames.ProductScreen} component={ProductScreen} />
        <Stack.Screen name={ScreenNames.dogsStore} component={DogsStore} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default MainNavigation;
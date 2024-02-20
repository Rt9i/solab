import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import ScreenNames from './ScreenNames';
import Cart from '../src/screen/Cart';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import ProductScreen from '../src/screen/ProductScreen';
import { TouchableOpacity } from 'react-native';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.splash} component={Splash} />
        <Stack.Screen name={ScreenNames.cart} component={Cart} />
        <Stack.Screen name={ScreenNames.home} component={Home} />
        <Stack.Screen name={ScreenNames.login} component={Login} />
        <Stack.Screen name={ScreenNames.ProductScreen} component={ProductScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;
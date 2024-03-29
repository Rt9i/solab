import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer, TabActions, TabRouter, createNavigatorFactory } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import ScreenNames from './ScreenNames';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import ProductScreen from '../src/screen/ProductScreen';
import TabNav from './TabNav';





const MainNavigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.splash} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.home} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.login} component={Login} />
        <Stack.Screen name={ScreenNames.ProductScreen} component={ProductScreen} />
        <Stack.Screen name={ScreenNames.Tabs} component={TabNav} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};
export default MainNavigation;
const styles = StyleSheet.create({

})
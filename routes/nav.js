import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer, TabActions, TabRouter, createNavigatorFactory } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import ScreenNames from './ScreenNames';
import Cart from '../src/screen/Cart';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import ProductScreen from '../src/screen/ProductScreen';
import DogsStore from '../src/screen/DogsStore';
import CatsStore from '../src/screen/CatsStore';
import BottomBar from '../src/Components/BottomBar';

const checkHideBar = () => {
  if (BottomBar.hideBar == true) { 
    return null;
  } else {
    return <BottomBar />;
  }
};

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      
      <Stack.Navigator >
        <Stack.Screen name={ScreenNames.splash} component={Splash} options={{headerShown:false}} hideBar={true} />
        <Stack.Screen name={ScreenNames.catsStore} component={CatsStore}     
        options={{
          headerShown:false,
            headerTitle: 'Cats Store',
            headerStyle: {
              backgroundColor: '#241916', 
            },
            headerTintColor: 'white', 
          }}  />
        <Stack.Screen name={ScreenNames.cart} component={Cart} options={{headerShown:false}}/>
        <Stack.Screen name={ScreenNames.home} component={Home} options={{ headerShown: false }} hideBar={true}  />
        <Stack.Screen name={ScreenNames.login} component={Login}options={{headerShown:false}} />
        <Stack.Screen name={ScreenNames.ProductScreen} component={ProductScreen}options={{headerShown:false}} />
        <Stack.Screen name={ScreenNames.dogsStore} component={DogsStore} options={{headerShown:false}}/>
      </Stack.Navigator>
      {checkHideBar()}
      
    </NavigationContainer >
  );
};
export default MainNavigation;
const styles = StyleSheet.create({

})
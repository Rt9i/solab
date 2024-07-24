import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer, TabActions, TabRouter, createNavigatorFactory } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import ScreenNames from './ScreenNames';
import Home from '../src/screen/Home';
import Login from '../src/screen/Login';
import ProductScreen from '../src/screen/ProductScreen';
import SeeAllProducts from '../src/screen/SeeAllProducts';
import SettingsScreen from '../src/screen/SettingsScreen';
import CatsStore from '../src/screen/CatsStore';
import Cart from '../src/screen/Cart';
import Profile from '../src/screen/Profile';






const MainNavigation = ({initialRouteName }) => {

  const Stack = createNativeStackNavigator();
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
      
        <Stack.Screen name={ScreenNames.login} component={Login} />
        <Stack.Screen name={ScreenNames.splash} component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.home} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={ScreenNames.settings} component={SettingsScreen} />
        <Stack.Screen name={ScreenNames.cart} component={Cart} />
        <Stack.Screen name={ScreenNames.profile} component={Profile} />
        <Stack.Screen name={ScreenNames.catsStore} component={CatsStore} options={{ headerShown: false }} />
        
        <Stack.Screen
          name={ScreenNames.ProductScreen}
          component={ProductScreen}
          options={{
            headerTitle: '', // Set your custom header title
            headerStyle: {
              backgroundColor: 'white', // Customize header background color
            },
            headerTintColor: '#000000', // Set the back arrow and text color to black
            headerTitleAlign: 'center', // Align header title centrally
          }}
        />
        {/* <Stack.Screen name={ScreenNames.Tabs} component={TabNav} options={{ headerShown: false }} /> */}
        <Stack.Screen name={ScreenNames.seeAll} component={SeeAllProducts} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};
export default MainNavigation;
const styles = StyleSheet.create({

})
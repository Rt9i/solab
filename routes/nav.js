import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../src/screen/Splash';
import Login from '../src/screen/Login';
import Home from '../src/screen/Home';
import SettingsScreen from '../src/screen/SettingsScreen';
import Cart from '../src/screen/Cart';
import Profile from '../src/screen/Profile';
import CatsStore from '../src/screen/CatsStore';
import ProductScreen from '../src/screen/ProductScreen';
import SeeAllProducts from '../src/screen/SeeAllProducts';
import ScreenNames from './ScreenNames';
import WorkersHome from '../src/screen/WorkersHome';
import staffHome from '../src/screen/StaffHome';
import EditProduct from '../src/screen/EditProduct';




const Stack = createNativeStackNavigator();

const MainNavigation = ({initialRouteName}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name={ScreenNames.editProduct} component={EditProduct} />
      <Stack.Screen name={ScreenNames.StaffHome} component={staffHome} />
      <Stack.Screen name={ScreenNames.workerHome} component={WorkersHome} />
        <Stack.Screen
          name={ScreenNames.login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.splash}
          component={Splash}
          options={{headerShown: false}}
        />


        <Stack.Screen
          name={ScreenNames.home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ScreenNames.settings} component={SettingsScreen} />
        <Stack.Screen name={ScreenNames.cart} component={Cart} />
        <Stack.Screen name={ScreenNames.profile} component={Profile} />
        <Stack.Screen
          name={ScreenNames.catsStore}
          component={CatsStore}
          options={{headerShown: false}}
        />
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
        <Stack.Screen name={ScreenNames.seeAll} component={SeeAllProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainNavigation;

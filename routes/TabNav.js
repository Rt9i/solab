import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CatsStore from '../src/screen/CatsStore';
import DogsStore from '../src/screen/DogsStore';
import Cart from '../src/screen/Cart';
import ScreenNames from './ScreenNames';
import { useHeaderHeight } from '@react-navigation/elements';
const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const headerHeight = useHeaderHeight();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={ScreenNames.catsStore} component={CatsStore} options={{headerHeight:10}}/>
      <Tab.Screen name={ScreenNames.dogsStore} component={DogsStore} />
      <Tab.Screen name={ScreenNames.cart} component={Cart} />
    </Tab.Navigator>
  );
};

export default TabNav;

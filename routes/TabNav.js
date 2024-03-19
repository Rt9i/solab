import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CatsStore from '../src/screen/CatsStore';
import DogsStore from '../src/screen/DogsStore';
import Cart from '../src/screen/Cart';
import ScreenNames from './ScreenNames';
import { useHeaderHeight } from '@react-navigation/elements';
import { Image, Text, View, StyleSheet } from 'react-native';
import Images from '../src/assets/images/images';
import { useSelector } from 'react-redux';
import SolabContext from '../src/store/solabContext';

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const headerHeight = useHeaderHeight();
  const { cart } = useContext(SolabContext);

  const CustomTabBarLabel = ({ focused, title, icon, marginLeft, marginTop }) => (
    <View style={styles.tabBarLabel}>
      <View>
        <View style={{ marginTop }} >
          <Image source={icon} style={{ width: 24, height: 24, marginLeft }} />
        </View>
        <View>
          <Text style={[styles.tabBarLabelText, { color: focused ? '#7391c8' : 'black' }]}>
            {title}
          </Text>
        </View>
      </View>
      {title === 'Cart' && cart.length > 0 && (
        <View>
          <Text style={styles.itemsCounter}>{cart.length}</Text>
        </View>
      )}

    </View>

  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ScreenNames.catsStore}
        component={CatsStore}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabBarLabel
              focused={focused}
              title="CatsStore"
              marginLeft={24}

              icon={Images.catIcon()}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.dogsStore}
        component={DogsStore}
        options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabBarLabel
              focused={focused}
              title="DogsStore"
              marginLeft={24}
              icon={Images.dogIcon()}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.cart}
        component={Cart}
        options={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <CustomTabBarLabel
              focused={focused}
              title="Cart"
              icon={Images.cart()}
              cartLength={Cart.length}
            />
          ),
        })}
      />

    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({
  image: {
    marginLeft: 20,

  },
  itemsCounter: {
    color: 'black',
    backgroundColor: 'red',
    fontFamily: 'bigFont',
    fontSize: 10,
    borderRadius: 50,
    height: 20,
    width: 20,
    lineHeight: 20,
    textAlignVertical: 'center',

    textAlign: 'center',
  },
  tabBarLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  tabBarLabelText: {
    fontSize: 12,
    fontFamily: 'bigFont',
    height: 20,
    marginBottom: 2,
  },
});

// import React, {useContext} from 'react';
// import CatsStore from '../src/screen/CatsStore';

// import Cart from '../src/screen/Cart';
// import ScreenNames from './ScreenNames';
// import {useHeaderHeight} from '@react-navigation/elements';
// import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import Images from '../src/assets/images/images';
// import SolabContext from '../src/store/solabContext';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// const TabNav = () => {
//   const Tab = createBottomTabNavigator();
//   const {cart, strings, changeLanguage} = useContext(SolabContext);

//   const CustomTabBarLabel = ({
//     focused,
//     title,
//     icon,
//     marginLeft,
//     marginTop,
//     language,
//   }) => {
//     const renderCartLength = title === strings.cart;

//     return (
//       <View style={styles.tabBarLabel}>
//         <View>
//           <View style={{marginTop}}>
//             <Image source={icon} style={{width: 24, height: 24, marginLeft}} />
//           </View>
//           <View>
//             <Text
//               style={[
//                 styles.tabBarLabelText,
//                 {color: focused ? '#7391c8' : 'black'},
//               ]}>
//               {title}
//             </Text>
//           </View>
//         </View>
//         {renderCartLength && (
//           <View>
//             {cart.length > 0 && (
//               <Text style={styles.itemsCounter}>{cart.length}</Text>
//             )}
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <Tab.Navigator
//       swipeEnabled={true}
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#7391c8',
//         tabBarInactiveTintColor: 'black',
//         tabBarLabelStyle: styles.tabBarLabelText,
//         tabBarIndicatorStyle: styles.tabBarIndicator,
//         tabBarStyle: styles.tabBar,
//       }}>
//       <Tab.Screen
//         name={ScreenNames.catsStore}
//         component={CatsStore}
//         options={{
//           tabBarLabel: ({focused}) => (
//             <CustomTabBarLabel
//               focused={focused}
//               title={`${strings.catsStore}`}
//               marginLeft={24}
//               icon={Images.catIcon()}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name={ScreenNames.cart}
//         component={Cart}
//         options={({route}) => ({
//           headerShown: false,
//           tabBarLabel: ({focused}) => (
//             <CustomTabBarLabel
//               focused={focused}
//               title={`${strings.cart}`}
//               icon={Images.cart()}
//               cartLength={Cart.length}
//             />
//           ),
//         })}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNav;

// const styles = StyleSheet.create({
//   image: {
//     marginLeft: 20,
//   },
//   itemsCounter: {
//     marginLeft: 2,
//     color: 'black',
//     backgroundColor: 'red',
//     fontWeight: 'bold',
//     fontSize: 10,
//     borderRadius: 50,
//     height: 18,
//     width: 18,
//     lineHeight: 15,
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
//   tabBarLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabBarLabelText: {
//     fontSize: 12,
//     fontFamily: 'bigFont',
//     height: 20,
//     marginBottom: 2,
//    
//  
//   },
// });

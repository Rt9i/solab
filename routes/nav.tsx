// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Splash from '../app/Splash';
// import Login from '../app/Login';
// import Home from '../src/screen/Home';
// import SettingsScreen from '../app/SettingsScreen';
// import Cart from '../app/Cart';
// import Profile from '../app/Profile';
// import CatsStore from '../app/CatsStore';
// import ProductScreen from '../app/ProductScreen';
// import SeeAllProducts from '../app/SeeAllProducts';
// import ScreenNames from './ScreenNames';
// import WorkersHome from '../app/WorkersHome';
// import StaffHome from '../app/StaffHome';
// import EditProduct from '../app/EditProduct';

// // Define prop types for MainNavigation
// interface MainNavigationProps {
//   initialRouteName: string; // You can change the type if needed (e.g., string literal for allowed routes)
// }

// const Stack = createNativeStackNavigator();

// const MainNavigation: React.FC<MainNavigationProps> = ({initialRouteName}) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={initialRouteName}>
//         <Stack.Screen name={ScreenNames.editProduct} component={EditProduct} />
//         <Stack.Screen name={ScreenNames.StaffHome} component={StaffHome} />
//         <Stack.Screen name={ScreenNames.workerHome} component={WorkersHome} />
//         <Stack.Screen
//           name={ScreenNames.login}
//           component={Login}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={ScreenNames.splash}
//           component={Splash}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={ScreenNames.home}
//           component={Home}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen name={ScreenNames.settings} component={SettingsScreen} />
//         <Stack.Screen name={ScreenNames.cart} component={Cart} />
//         <Stack.Screen name={ScreenNames.profile} component={Profile} />
//         <Stack.Screen
//           name={ScreenNames.catsStore}
//           component={CatsStore}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name={ScreenNames.ProductScreen}
//           component={ProductScreen}
//           options={{
//             headerTitle: '', // Set your custom header title
//             headerStyle: {
//               backgroundColor: 'white', // Customize header background color
//             },
//             headerTintColor: '#000000', // Set the back arrow and text color to black
//             headerTitleAlign: 'center', // Align header title centrally
//           }}
//         />
//         <Stack.Screen name={ScreenNames.seeAll} component={SeeAllProducts} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({});

// export default MainNavigation;

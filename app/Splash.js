// import {Image, StyleSheet, View} from 'react-native';
// import React, {useContext, useEffect, useRef} from 'react';
// import ScreenNames from '../routes/ScreenNames';
// import Images from '../src/assets/images/images';
// import {
//   getUserByID,
//   getUserProducts,
//   getDataFromDataBase,
// } from '../src/res/api';
// import SolabContext from '../src/store/solabContext';
// import {useNavigation} from 'expo-router';

// const Splash = props => {
//   const {setUser, saveUserProducts, setData, user} = useContext(SolabContext);
//   const currentUserId = user?._id;
//   const hasFetchedData = useRef(false);
//   const nav = useNavigation();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (hasFetchedData.current) return;
//       hasFetchedData.current = true;

//       try {
//         const result = await getDataFromDataBase();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const updateUserAndFetchProducts = async () => {
//       if (!currentUserId) {
//         nav.replace('Login'); // Navigate to Login if no current user ID
//         console.log('working');

//         return;
//       }

//       try {
//         const newUser = await getUserByID(currentUserId);

//         if (!newUser) {
//           console.error('User data is invalid:', newUser);
//           nav.navigate('Login'); // Navigate to Login if the user is invalid
//           return;
//         }

//         setUser(newUser);
//         const response = await getUserProducts(currentUserId);
//         saveUserProducts(response);

//         if (newUser.role === 'client') {
//           nav.replace('home');
//         } else if (newUser.role === 'worker') {
//           nav.replace('workerHome');
//         } else if (newUser.role === 'staff') {
//           nav.replace('StaffHome');
//         }
//       } catch (error) {
//         console.error('Error fetching user or products:', error);
//         nav.navigate('Login'); // Navigate to Login on error
//       }
//     };

//     if (currentUserId) {
//       fetchData();
//       updateUserAndFetchProducts();
//     } else {
//       nav.navigate('Login'); // Navigate to Login if user is missing
//     }
//   }, [currentUserId]);

//   return (
//     <View style={styles.container}>
//       <Image source={Images.whiteLogo()} style={styles.image} />
//     </View>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     flex: 1,
//     width: 500,
//  
//   },
// });

// // src/screens/LoginScreen.js
// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
// import UserItem from '../Components/UserItem';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { auth } from '../myFirebase/firebase';

// GoogleSignin.configure({
//   webClientId: '', // From Firebase Console -> Project Settings -> Add App
// });

// const Login = props => {
//     const users = props.route.params;

//   console.log("params: " , props.route.params);

//   const renderUsers = () => {
//     return users?.map(user => <UserItem {...user} />);
//   };

//   // if (loading) {
//   //   return (
//   //     <View style={styles.loaderContainer}>
//   //       <ActivityIndicator size={'large'} />
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <ScrollView>{renderUsers()}</ScrollView>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

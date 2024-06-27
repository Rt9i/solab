// // src/screens/LoginScreen.js
// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
// import UserItem from '../Components/UserItem';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { auth } from '../myFirebase/firebase';


// GoogleSignin.configure({
//   webClientId: 'https://solab-server.onrender.com', // From Firebase Console -> Project Settings -> Add App
// });

// const Login = props => {
//   const { users = [] } = props.route.params || {};
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [code, setCode] = useState('');
//   const [confirm, setConfirm] = useState(null);

//   const renderUsers = () => {
//     return users?.map(user => <UserItem key={user.id} {...user} />);
//   };

//   const signInWithPhoneNumber = async (phoneNumber) => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to sign in with phone number');
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       await confirm.confirm(code);
//       Alert.alert('Success', 'Phone authentication successful!');
//     } catch (error) { 
//       console.error(error);
//       Alert.alert('Error', 'Failed to confirm code');
//     }
//   };

//   const onGoogleButtonPress = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
//       await auth().signInWithCredential(googleCredential);
//       Alert.alert('Success', 'Google Sign-In successful!');
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // User cancelled the sign-in
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // Operation in progress
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // Play services not available or outdated
//         Alert.alert('Error', 'Google Play Services not available');
//       } else {
//         // Some other error
//         console.error(error);
//         Alert.alert('Error', 'Failed to sign in with Google');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Login Screen</Text>

//       <TextInput
//         placeholder="Phone Number"
//         onChangeText={text => setPhoneNumber(text)}
//         value={phoneNumber}
//         style={styles.input}
//       />
//       <Button title="Send Verification Code" onPress={() => signInWithPhoneNumber(phoneNumber)} />

//       <TextInput
//         placeholder="Verification Code"
//         onChangeText={text => setCode(text)}
//         value={code}
//         style={styles.input}
//       />
//       <Button title="Confirm Code" onPress={confirmCode} />

//       <Button title="Sign In with Google" onPress={onGoogleButtonPress} />

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

// // googleLogin.js
// import React, { useEffect } from 'react';
// import { View, Button } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import { auth } from '../firebase'; 
// import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Import specific methods

// const GoogleLogin = () => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual Web Client ID
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential) // Use the auth instance
//         .then(user => {
//           console.log('User signed in:', user);
//         })
//         .catch(error => {
//           console.error('Error during sign-in:', error);
//         });
//     }
//   }, [response]);

//   return (
//     <View>
//       <Button
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//     </View>
//   );
// };

// export default GoogleLogin;

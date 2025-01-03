import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {makeRedirectUri} from 'expo-auth-session';
import Constants from 'expo-constants';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {app} from '../firebase'; // Ensure Firebase is initialized
import Images from '../assets/images/images';
// Let Expo handle the OAuth session in-app browser
WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

const GoogleLogin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState();

  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;
  const redirectUri = makeRedirectUri({
    useProxy: process.env.NODE_ENV === 'development',
    scheme: 'solab',
  } as any);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
  });
  const handleFirebaseLogin = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    try {
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      console.log('Firebase Login Successful:', {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
      });
      Alert.alert('Login Successful', `Welcome, ${user.displayName}`);
    } catch (error) {
      console.error('Firebase Login Failed:', error);
      Alert.alert('Login Failed', 'Could not log in with Firebase.');
    }
  };

  const fetchGoogleUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );
      const userInfo = await response.json();
      console.log('User Info:', userInfo);
      Alert.alert('Login Successful', `Welcome, ${userInfo.name}`);
    } catch (error) {
      console.error('Error Fetching User Info:', error);
      Alert.alert(
        'Failed to Fetch User Info',
        'Could not fetch user information.',
      );
    }
  };
  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;

      if (authentication?.idToken) {
        handleFirebaseLogin(authentication.idToken); // Log in to Firebase
      } else if (authentication?.accessToken) {
        fetchGoogleUserInfo(authentication.accessToken); // Fetch user profile
      } else {
        Alert.alert('Login Failed', 'No valid authentication tokens received.');
      }
    } else if (response?.type === 'error') {
      Alert.alert('Login Error', 'An error occurred during the login process.');
    }
  }, [response]);

  console.log('gogole login response: ', response);

  const GoogleSignInButton: React.FC<{onPress: () => void}> = ({onPress}) => (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Image source={Images.Gicon()} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <GoogleSignInButton onPress={() => promptAsync()} />
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    padding: 5,
    borderRadius: 5,
  },
  googleIcon: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 30,
    height: 30,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
});

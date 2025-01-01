import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {makeRedirectUri} from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {app} from '../firebase'; // Ensure Firebase is initialized

// Let Expo handle the OAuth session in-app browser
WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase Auth
const auth = getAuth(app);

interface GoogleUserInfo {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: any;
}

const GoogleLogin: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);

  // Retrieve environment variables from Expo configuration
  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

  // Dynamically configure the redirect URI
  const redirectUri = makeRedirectUri({
    useProxy: process.env.NODE_ENV === 'development', // Use proxy in development for simplicity
    scheme: 'solab', // Replace with your app's scheme for standalone builds
  } as any);

  // Debug the redirect URI
  console.log('Redirect URI:', redirectUri);

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri, // Use the dynamically created redirect URI
    scopes: ['openid', 'profile', 'email'],
    usePopup: true, // Ensure popup-based flow for web
  } as any);

  useEffect(() => {
    // Handle the Google Auth response
    if (response) {
      console.log('Google Auth Response:', response);

      if (response.type === 'success') {
        const {authentication} = response;
        if (authentication?.idToken) {
          handleFirebaseLogin(authentication.idToken);
        } else {
          console.warn('No ID token received.');
          Alert.alert('Login Failed', 'No ID token was provided.');
        }
      } else if (response.type === 'error') {
        console.error('OAuth Error:', response.error);
        Alert.alert('Login Failed', 'There was an issue completing the login.');
      } else if (response.type === 'dismiss' || response.type === 'locked') {
        console.warn('Login process interrupted.');
        Alert.alert(
          'Login Canceled',
          'The login process was canceled or interrupted.',
        );
      }
    }
  }, [response]);

  const handleFirebaseLogin = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    try {
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      setUserInfo({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
      } as any);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Login Successful', `Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Firebase authentication error:', error);
      Alert.alert('Login Failed', 'Could not authenticate with Firebase.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <Button
        title="Sign in with Google"
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      />
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>Welcome, {userInfo.name}</Text>
          <Text style={styles.userInfo}>Email: {userInfo.email}</Text>
        </View>
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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

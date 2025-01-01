import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert, Image} from 'react-native';
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
    scheme: 'solab', // Replace with your app's scheme if needed
  } as any);

  // Debug the redirect URI
  console.log('Redirect URI:', redirectUri);

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri, // Use the dynamically created redirect URI
    scopes: ['openid', 'profile', 'email'], // Ensure 'openid' is included
    usePopup: true, // Use popup flow for web
  } as any);

  useEffect(() => {
    // Handle the Google Auth response
    if (response) {
      console.log('Google Auth Response:', response);

      if (response.type === 'success') {
        handleGoogleResponse(response);
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

  const handleGoogleResponse = async (response: any) => {
    const {authentication} = response;

    if (authentication?.idToken) {
      handleFirebaseLogin(authentication.idToken);
    } else if (authentication?.accessToken) {
      // Fallback: Fetch user info using accessToken
      const userInfo = await fetchGoogleUserInfo(authentication.accessToken);
      setUserInfo(userInfo);
      console.log('Login Successful', `Welcome ${userInfo.name}`);
    } else {
      console.warn('No tokens received.');
      console.log('Login Failed', 'No ID or access token was provided.');
    }
  };

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
      console.log('Login Successful', `Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Firebase authentication error:', error);
      console.log('Login Failed', 'Could not authenticate with Firebase.');
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
      console.log('Google User Info:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      Alert.alert('Login Failed', 'Could not fetch user info.');
      return null;
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
        disabled={!request || userInfo != null}
      />
      {userInfo && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>Welcome, {userInfo.name}</Text>
          <Text style={styles.userInfo}>Email: {userInfo.email}</Text>
          <Image source={{uri: userInfo.picture}} style={styles.profileImage} />
        </View>
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  profileImage: {
    width: 100, // Set the width of the image
    height: 100, // Set the height of the image
    borderRadius: 50, // Make it circular
    marginVertical: 10,
  },
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

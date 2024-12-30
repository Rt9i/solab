import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { app } from '../firebase'; // Ensure Firebase is initialized

// Let Expo handle the OAuth session in-app browser
WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase Auth
const auth = getAuth(app);

// Define the shape of the user info if you want strong typing
interface GoogleUserInfo {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: any;
}

const GoogleLogin: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);

  // Safely extract environment variables from Expo
  const ANDROID_CLIENT_ID =
    Constants.expoConfig?.extra?.ANDROID_CLIENT_ID ||
    Constants.manifest?.extra?.ANDROID_CLIENT_ID;

  const IOS_CLIENT_ID =
    Constants.expoConfig?.extra?.IOS_CLIENT_ID ||
    Constants.manifest?.extra?.IOS_CLIENT_ID;

  const WEB_CLIENT_ID =
    Constants.expoConfig?.extra?.WEB_CLIENT_ID ||
    Constants.manifest?.extra?.WEB_CLIENT_ID;

  const REDIRECT_URI =
    Constants.expoConfig?.extra?.REDIRECT_URI ||
    Constants.manifest?.extra?.REDIRECT_URI;

  // Warn if any variables are missing
  if (!ANDROID_CLIENT_ID || !IOS_CLIENT_ID || !WEB_CLIENT_ID || !REDIRECT_URI) {
    console.warn(
      'Missing environment variables for Google Sign-In. Check your app.json or app.config.js.'
    );
  }

  // Configure Google OAuth
  const config = {
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
  };

  // useAuthRequest returns a tuple: [request, response, promptAsync]
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  /**
   * Sign the user into Firebase using the provided Google ID token.
   */
  const handleFirebaseAuth = async (idToken: string) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      console.log('Firebase user:', userCredential.user);
    } catch (error) {
      console.error('Firebase Authentication failed:', error);
    }
  };

  /**
   * Fetch user info from Google using the provided access token,
   * store the result in AsyncStorage, and update local state.
   */
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching user data:', errorData);
        return;
      }

      const user = (await res.json()) as GoogleUserInfo;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  /**
   * Listen for changes to the auth response. If successful,
   * log the user into Firebase and fetch additional user info.
   */
  useEffect(() => {
    if (response?.type === 'success') {
      const { idToken, accessToken } = response.authentication ?? {};
      if (idToken) handleFirebaseAuth(idToken);
      if (accessToken) fetchUserInfo(accessToken);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login</Text>
      <Button
        title="Sign in with Google"
        onPress={() => {
          promptAsync();
        }}
        disabled={!request} // Optionally disable if request isn't ready
      />
      {userInfo && (
        <Text style={styles.userInfo}>{JSON.stringify(userInfo, null, 2)}</Text>
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
  userInfo: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
});

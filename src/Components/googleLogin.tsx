import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../firebase'; // Ensure this points to your Firebase initialization file
import { getAuth } from 'firebase/auth';

// Ensure WebBrowser handles redirects
WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase Auth
const auth = getAuth(app);

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Config for Google Auth Request
  const config = {
    androidClientId: '1:516486248756:android:61d52187b54dc5ae15cd61',
    iosClientId: '1:516486248756:ios:8933e80fb148bc9a15cd61',
    webClientId: '1:516486248756:web:abceb6c7188e4d6115cd61',
    redirectUri: 'https://auth.expo.io/@rt9i/solab',
    scopes: ['openid', 'profile', 'email'],
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    console.log('Authentication response:', response); // Log the response
    if (response?.type === 'success' && response.authentication?.accessToken) {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const user = await res.json();
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Store user info
        setUserInfo(user); // Update user info state
      } else {
        const errorData = await res.json();
        console.error('Error fetching user data:', errorData);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Login Component</Text>
      <Button 
        title="Sign in with Google" 
        onPress={() => {
          console.log('Prompting Google login...'); // Log statement
          promptAsync(); 
        }} 
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    marginTop: 20,
    textAlign: 'center',
  },
});

import React, {useContext, useEffect, useState} from 'react';
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
import {makeRedirectUri, Prompt} from 'expo-auth-session';
import Constants from 'expo-constants';
import {getAuth, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {app} from '../firebase';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';
import {useNavigation} from 'expo-router';
import {getUserByGmail, GoogleLoginAndRegister} from '../res/api';
import PhoneModal from './getNumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

type UserData = {
  email: string | null;
  name: string | null;
  picture: string | null;
};
const GoogleLogin: React.FC = () => {
  const {currentUser, setCurrentUser, setUser, user}: any =
    useContext(SolabContext);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const nav = useNavigation();

  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;
  const ENCRYPTION_KEY = Constants.expoConfig?.extra?.ENCRYPTION_KEY;

  const redirectUri = makeRedirectUri({
    useProxy: process.env.NODE_ENV === 'development',
    scheme: 'solab',
  } as any);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
  });

  const encryptData = (data: any) => {
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        data,
        ENCRYPTION_KEY,
      ).toString();
      return encryptedData;
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  };

  const decryptData = (encryptedData: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  };

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

      setCurrentUser({
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
    } catch (error) {
      console.error('Firebase Login Failed:', error);
      window.alert('Login Failed', 'Could not log in with Firebase.');
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
      console.log('fetched user from function: ', userInfo);

      // setCurrentUser({
      //   name: userInfo.name,
      //   email: userInfo.email,
      //   picture: userInfo.picture,
      // });
      return userInfo;
    } catch (error) {
      console.error('Error Fetching User Info:', error);
      window.alert(
        'Failed to Fetch User Info',
        'Could not fetch user information.',
      );
    }
  };

  // useEffect(() => {
  //   if (currentUser) {

  //     getUserByGmail(currentUser.email).then(user => {
  //       console.log('got user email by: ', currentUser.email);

  //       if (!user) {
  //         console.log(currentUser.email, 'was not found in data base ');

  //         setModalVisible(true);
  //       }
  //     });
  //   }
  // }, [currentUser]);

  const GoogleSignInButton: React.FC<{onPress: () => void}> = ({onPress}) => (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Image source={Images.Gicon()} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );

  const handleGoogleSignIn = async () => {
    console.log('Attempting Google sign-in...');

    try {
      const result = await promptAsync({
        useProxy: false,
        redirectUri: 'https://abgrooming.netlify.app',
      } as any);

      if (!result || result.type === 'error') {
        throw new Error('Google login failed');
      }

      const authentication = result.authentication;
      console.log('Authentication:', authentication);

      if (authentication?.accessToken) {
        console.log('Access token found');

        const userInfo = await fetchGoogleUserInfo(authentication.accessToken);
        const existingUser = await getUserByGmail(userInfo.email);

        if (existingUser) {
          console.log(
            'User found in database, saving and redirecting...',
            existingUser,
          );

          const encryptedEmail = encryptData(userInfo.email);
          console.log('Email before encryption:', userInfo.email);
          console.log('Encrypted email:', encryptedEmail);

          await AsyncStorage.setItem('userEmail', encryptedEmail);
          console.log('Encrypted email saved to AsyncStorage');

          window.location.href = '/';
        } else {
          console.log('User was not found in database');
          setModalVisible(true);
        }
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <PhoneModal
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setIsPhoneVerified={setIsPhoneVerified}
        isPhoneVerified={isPhoneVerified}
      />

      <GoogleSignInButton onPress={() => handleGoogleSignIn()} />
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
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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

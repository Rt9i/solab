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
import {app} from '../firebase'; // Ensure Firebase is initialized
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';
import {useNavigation} from 'expo-router';
import {GoogleLoginAndRegister} from '../res/api';
import PhoneModal from './getNumber';
// Let Expo handle the OAuth session in-app browser
WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);
type User = {
  picture: string;
  name: string;
  email: string;
};

const GoogleLogin: React.FC = () => {
  const {currentUser, setCurrentUser} = React.useContext(SolabContext);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const nav = useNavigation();


  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

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
  const handleFirebaseLogin = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    try {
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      const userData = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
      };
      setCurrentUser(userData);
      console.log('Firebase Login Successful:', {
        id: user.uid,
        email: user.email,
        name: user.displayName,
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
      setCurrentUser(userInfo);
      console.log('User Info:', userInfo);
    } catch (error) {
      console.error('Error Fetching User Info:', error);
      window.alert(
        'Failed to Fetch User Info',
        'Could not fetch user information.',
      );
    }
  };

  const saveUserInfoToDatabase = async () => {
    if (!isPhoneVerified && !currentUser && !phoneNumber) {
      return window.alert('Phone number verification failed.');
    }
    const userData = {
      name: currentUser.name,
      email: currentUser.email,
      phoneNumber: phoneNumber,
      picture: currentUser.picture,
    };
    try {
      await GoogleLoginAndRegister(userData); // Your existing API call
      nav.navigate('index'); // Navigate to the next screen
    } catch (error) {
      window.alert('Error saving user data:', error);
    }
  };

  useEffect(() => {
    if (!response) return; // Exit early if response is null

    if (response.type === 'error') {
      window.alert(
        'Login Error',
        'An error occurred during the login process.',
      );
      return;
    }

    const authentication = response?.authentication;

    if (authentication?.idToken) {
      handleFirebaseLogin(authentication.idToken);
      nav.navigate('index');
    } else if (authentication?.accessToken) {
      fetchGoogleUserInfo(authentication.accessToken).then(userInfo => {
        setCurrentUser(userInfo);
        setModalVisible(true);
      });
    } else {
      window.alert('Login Failed', 'No valid authentication tokens received.');
    }
  }, [response]);

  const GoogleSignInButton: React.FC<{onPress: () => void}> = ({onPress}) => (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Image source={Images.Gicon()} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );

  const handleGoogleSignIn = async () => {
    console.log('Attempting Google sign-in...');

    setModalVisible(true);
    // const result = await promptAsync();

    // console.log('Result after promptAsync:', result);
    // if (result?.type === 'success') {
    //   window.location.href = '/';
    // }
  };

  return (
    <View style={styles.container}>
      <PhoneModal
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        saveUserInfoToDatabase={saveUserInfoToDatabase}
        setIsPhoneVerified={setIsPhoneVerified}
      />

      {!currentUser || Object.keys(currentUser).length === 0 ? (
        <GoogleSignInButton onPress={() => handleGoogleSignIn()} />
      ) : (
        <View>
          <Image
            source={{uri: currentUser?.picture ?? Images.profileIcon()}}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <Text> loged in</Text>
        </View>
      )}
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

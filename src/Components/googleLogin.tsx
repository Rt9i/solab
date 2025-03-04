import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {makeRedirectUri, Prompt} from 'expo-auth-session';
import Constants from 'expo-constants';
import {getAuth} from 'firebase/auth';
import {app} from '../firebase';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';

import PhoneModal from './getNumber';

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

type UserData = {
  email: string | null;
  name: string | null;
  picture: string | null;
};
const GoogleLogin: React.FC = () => {
  const {isModalVisible, setModalVisible}: any = useContext(SolabContext);
  const ENCRYPTION_KEY = Constants.expoConfig?.extra?.ENCRYPTION_KEY;
  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

  // const redirectUri = 'https://solabgrooming.netlify.app';
  const redirectUri = 'http://localhost:8081';

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${WEB_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email&access_type=offline`;

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const signIn = async () => {
    window.location.href = googleLoginUrl;
  };
  const GoogleSignInButton = () => (
    <TouchableOpacity style={styles.googleButton} onPress={() => signIn()}>
      <Image source={Images.Gicon()} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );

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

      <GoogleSignInButton />
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

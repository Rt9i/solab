import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';
import PhoneModal from './getNumber';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

type UserData = {
  email: string | null;
  name: string | null;
  picture: string | null;
};

const GoogleLogin: React.FC = () => {
  const {isModalVisible, setModalVisible}: any = useContext(SolabContext);

  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;

  const redirectUri = AuthSession.makeRedirectUri({scheme: 'solab'});
  console.log('redirect uri here: ', redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: redirectUri,
  });

  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  // نراقب response بعد تسجيل الدخول
  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;
      if (authentication?.accessToken) {
        fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: {Authorization: `Bearer ${authentication.accessToken}`},
        })
          .then(res => res.json())
          .then(data => {
            setUserInfo({
              email: data.email,
              name: data.name,
              picture: data.picture,
            });
            console.log('User info:', data);
          })
          .catch(err => console.log('Error fetching user info:', err));
      }
    }
  }, [response]);

  const signInWithGoogle = async () => {
    await promptAsync();
  };

  return (
    <View style={styles.container}>
      {/* <PhoneModal
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setIsPhoneVerified={setIsPhoneVerified}
        isPhoneVerified={isPhoneVerified}
      /> */}

      {!userInfo ? (
        <TouchableOpacity
          style={styles.googleButton}
          onPress={signInWithGoogle}
          disabled={!request}>
          <Image source={Images.Gicon()} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfo}>Welcome {userInfo.name}</Text>
          <Text style={styles.userInfo}>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
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

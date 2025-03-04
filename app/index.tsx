import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Platform,
  Text,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from '../src/store/solabContext';
import {
  getUserByID,
  getUserProducts,
  getDataFromDataBase,
  getUserByPhoneNumber,
  getUserByGmail,
  decryptData,
  fetchAccessToken,
} from '../src/res/api';
import {useFocusEffect, useRouter} from 'expo-router';
import Images from '@/src/assets/images/images';
import Constants from 'expo-constants';
import PhoneModal from '@/src/Components/getNumber';

const Index = () => {
  const navigation = useRouter();
  const {
    user,
    setUser,
    saveUserProducts,
    setData,
    logout,
    fetchGoogleUserInfo,
    setModalVisible,
    isModalVisible,
    setCurrentUser,
    currentUser,
  }: any = useContext(SolabContext);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [modalCallback, setModalCallback] = useState<
    ((phone: string) => void) | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);

  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

  const REDIRECT_URI = Constants.releaseChannel
    ? 'https://solabgrooming.netlify.app/' // Production URL
    : 'http://localhost:8081'; // Local development URL
  console.log('redirect url: ', REDIRECT_URI);

  const handelGoogleLogin = async (code: string) => {
    try {
      const result = await fetchAccessToken(code, WEB_CLIENT_ID, REDIRECT_URI);

      return result;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const nav = (name: string) => {
    navigation.navigate(name as any);
  };

  const fetchData = async () => {
    try {
      const result = await getDataFromDataBase();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getUser = async () => {
    try {
      // Try getting the phone number first
      let number = await AsyncStorage.getItem('userPhoneNumber');
      if (number) {
        console.log('Phone number found:', number);
        const userInfo = await getUserByPhoneNumber(number);

        console.log('User fetched by phone number:', userInfo);
        return userInfo;
      }

      // If phone number doesn't exist, try getting email
      const email = await AsyncStorage.getItem('userEmail');
      if (!email) {
        console.log('No email found in AsyncStorage.');
        return null;
      }

      console.log('Decrypted email:', email);
      const userInfo = await getUserByGmail(email);
      console.log('User fetched by email:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  const getPolicyAcceptValue = async () => {
    try {
      const value = await AsyncStorage.getItem('isAccepted');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        console.log('Retrieved isAccepted value:', parsedValue);
        return parsedValue;
      }
      return false;
    } catch (error) {
      console.error('Error retrieving isAccepted value:', error);
      return false;
    }
  };
  const waitForPhoneInput = () => {
    return new Promise<string>(resolve => {
      setModalCallback(() => resolve); // Save the callback to resolve later
      setModalVisible(true); // Show the modal
    });
  };

  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);

    let userByEmail = null; // Store user outside try-catch

    try {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      if (code) {
        console.log('Google Auth Code detected:', code);

        try {
          const fetchResult = await handelGoogleLogin(code);
          console.log('fetched result: ', fetchResult);

          if (!fetchResult || fetchResult == undefined) {
            console.warn('Google login failed or expired code. Continuing...');
            return (window.location.href = '/');
          }

          const user = await fetchGoogleUserInfo(fetchResult.access_token);
          setCurrentUser(user);
          console.log('user: ', user);

          userByEmail = await getUserByGmail(user.email); // Assign user to outer variable

          if (userByEmail) {
            if (rememberMe) {
              await AsyncStorage.setItem('user', JSON.stringify(userByEmail));
              console.log('Stored user in AsyncStorage:', userByEmail);
            }
            setUser(userByEmail);
          } else {
            const phoneRes = await waitForPhoneInput();
            console.log('phone modal response: ', phoneRes);
          }
        } catch (error) {
          console.warn(
            'Google login failed (possibly expired code). Skipping authentication:',
            error,
          );
        }
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }

    // ✅ Now this part executes whether we get the user or not
    console.log('Continuing app initialization...');

    const number = await AsyncStorage.getItem('userPhoneNumber');
    console.log('phone number from async: ', number);

    const usebyNumber = await getUserByPhoneNumber(number);
    setUser(usebyNumber);

    console.log('User entered phone number:', number);
    // Step 2: Continue initialization
    const policyAccept = await getPolicyAcceptValue();

    await fetchData();

    console.log('Policy accept result: ', policyAccept);
    if (policyAccept == false) {
      nav('/Policy');
      return console.log('Policy not accepted:', policyAccept);
    }

    if (!user || user?.error === true) {
      console.log('No user found. Redirecting to Home...');
      nav('Home');
      return;
    }

    if (!user._id) {
      console.error('Error: user._id is still undefined');
      return;
    }

    const response = await getUserProducts(user._id);
    saveUserProducts(response);

    switch (user.role) {
      case 'client':
        nav('/Home');
        break;
      case 'worker':
        nav('/WorkersHome');
        break;
      case 'staff':
        nav('/StaffHome');
        break;
      default:
        console.error('Invalid user role');
    }

    setLoading(false); // Ensure loading stops at the very end
  };

  useFocusEffect(
    React.useCallback(() => {
      initializeApp(); // Run when screen comes into focus
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image
          source={Images.whiteLogo()}
          resizeMode="contain"
          style={styles.image}
        />
        <PhoneModal
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          setIsPhoneVerified={setIsPhoneVerified}
          isPhoneVerified={isPhoneVerified}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        )}
        <View>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://www.termsfeed.com/live/0d17353b-348e-4ced-85ea-ef8c630a3f21',
              ).catch(err => console.error('Failed to open URL:', err))
            }>
            Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  link: {
    fontSize: 24,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
  },
  loader: {
    marginTop: 20,
  },
});

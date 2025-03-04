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

const Index = () => {
  const navigation = useRouter();
  const {setUser, saveUserProducts, setData, logout, fetchGoogleUserInfo}: any =
    useContext(SolabContext);
  const [loading, setLoading] = useState(false);
  const ENCRYPTION_KEY = Constants.expoConfig?.extra?.ENCRYPTION_KEY;
  const ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
  const IOS_CLIENT_ID = Constants.expoConfig?.extra?.IOS_CLIENT_ID;
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

  const REDIRECT_URI = Constants.releaseChannel
    ? 'https://solabgrooming.netlify.app/' // Production URL
    : 'http://localhost:8081'; // Local development URL
  console.log('redirect url: ', REDIRECT_URI);

  const handelingtoken = async (code: string) => {
    try {
      const result = await fetchAccessToken(code, WEB_CLIENT_ID, REDIRECT_URI);
      console.log('---------------------------');
      console.log('token stuffff:', result);
      console.log('---------------------------');
      fetchGoogleUserInfo(result.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code'); // Google sends back the auth code in the URL

    if (code) {
      handelingtoken(code);
    }
  }, []);

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
  const getphoneNumber = async () => {
    try {
      const encryptedNumber = await AsyncStorage.getItem('userPhoneNumber');

      if (!encryptedNumber) {
        console.log('No phone number found in storage.');
        return null;
      }

      const decryptedNumber = await decryptData(encryptedNumber);

      console.log('Decrypted phone number:', decryptedNumber);
      return decryptedNumber;
    } catch (e) {
      console.error('Decryption error:', e);
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

  const getUser = async () => {
    try {
      // Try getting the phone number first
      let asyncUserPhoneNumber = await getphoneNumber();
      if (asyncUserPhoneNumber) {
        console.log('Phone number found:', asyncUserPhoneNumber);
        const userInfo = await getUserByPhoneNumber(asyncUserPhoneNumber);
        console.log('User fetched by phone number:', userInfo);
        return userInfo;
      }

      // If phone number doesn't exist, try getting email
      const encryptedEmail = await AsyncStorage.getItem('userEmail');
      if (!encryptedEmail) {
        console.log('No email found in AsyncStorage.');
        return null;
      }

      const email = decryptData(encryptedEmail);
      if (!email) {
        console.log('Failed to decrypt email.');
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

  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);

    try {
      const policyAccept = await getPolicyAcceptValue();
      let userData = await getUser();

      await fetchData();

      console.log('Policy accept result: ', policyAccept);
      if (policyAccept == false) {
        nav('/Policy');
        return console.log('Policy not accepted:', policyAccept);
      }

      if (!userData || userData.error === true) {
        console.log('No user found. Redirecting to Home...');
        nav('Home');
        return;
      }

      console.log('User found:', userData);

      // Extract the actual user object if it's nested
      const user = userData.user ? userData.user : userData;

      console.log('Extracted user:', user);
      console.log('user _id: ', user._id);

      if (!user._id) {
        console.error('Error: user._id is still undefined');
        return;
      }

      setUser(user); // Set user context or state

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
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
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

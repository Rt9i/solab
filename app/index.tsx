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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    setCart,
    cart,

    redirectUri,
  }: any = useContext(SolabContext);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeSent, setVerificationCodeSent] =
    useState<boolean>(false);

  const [modalCallback, setModalCallback] = useState<
    ((phone: string) => void) | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [rememberme, setRememberMe] = useState<string | null>(null);

  const getItem = async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  };

  const setItem = async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };

  useEffect(() => {
    const fetchRememberMe = async () => {
      const rememberMe = await getItem('rememberMe');
      setRememberMe(rememberMe);
    };
    fetchRememberMe();
  }, []);

  // console.log('remember me: ', rememberme);
  const WEB_CLIENT_ID = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

  console.log('redirect url: ', redirectUri);

  const getUserToken = async (code: string) => {
    try {
      const result = await fetchAccessToken(code, WEB_CLIENT_ID, redirectUri);

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

  const getUserFromLocalStorage = async () => {
    try {
      let number = await getItem('userPhoneNumber');
      if (number) {
        const userInfo = await getUserByPhoneNumber(number);
        if (userInfo) {
          return userInfo;
        }
      }

      const email = await getItem('userEmail');
      if (!email) {
        console.log(`[LocalStorage] No email found.`);
        return null;
      }

      const userInfo = await getUserByGmail(email);
      if (userInfo) {
        return userInfo;
      }
      return null;
    } catch (error) {
      console.error(`[Error] Failed to get user from LocalStorage:`, error);
      return null;
    }
  };

  const getPolicyAcceptValue = async () => {
    try {
      const value = await getItem('isAccepted');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
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

  useEffect(() => {
    if (user?.products) {
      const userProducts = user.products;

      setCart(userProducts);
      // console.log('user products:', user.products);
    }
  }, [user]);

  const executeUser = async () => {
    try {
      console.log('2');

      const code =
        Platform.OS === 'web'
          ? new URLSearchParams(window.location.search).get('code')
          : null;

      console.log('3');
      console.log('code: ', code);

      if (!code) return null;

      const userToken = await getUserToken(code);
      if (!userToken) {
        console.log('4');
        console.warn('Google login failed or expired code.');
        return null;
      }
      const userInfo = await fetchGoogleUserInfo(userToken.access_token);
      setCurrentUser(userInfo);

      console.log('5');
      const getUser = await getUserByGmail(userInfo.email);
      console.log('5.5');
      const user = getUser?.user || null;

      if (user) {
        console.log('6');

        setUser(user);

        if (rememberme) {
          console.log('6.3');
          console.log('actually rememberd');
          if (user) {
            console.log('6.5');
            setItem('user', JSON.stringify(user));
          }
        }
        return;
      }
      console.log('7');
      const number = await waitForPhoneInput();
      console.log('number: ', number);
      console.log('user information: ', userInfo.email);

      const userAfterPhoneVerify = await getUserByGmail(userInfo.email);
      console.log('user After PhoneVerify: ', userAfterPhoneVerify);

      const userUser = userAfterPhoneVerify.user;
      console.log('user user ??? : ', userUser);

      if (userAfterPhoneVerify && userAfterPhoneVerify.user) {
        setUser(userAfterPhoneVerify.user);
      } else {
        console.log('No user data found after phone verification');
      }

      return userUser;
    } catch (e) {
      console.log(e);
    }
  };
  
  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);
    try {
      console.log('1');
      let user;

      // Retrieve user from localStorage
      const localUser = await getItem('user');
      console.log('local user:', localUser);

      const currentuser = localUser ? JSON.parse(localUser) : null;

      if (currentuser) {
        console.log(`[LocalStorage] Found user:`, currentuser);

        const userEmail = currentuser.email;
        const userPhoneNumber = currentuser.phoneNumber;

        console.log('User Phone Number:', userPhoneNumber);
        console.log('User Email:', userEmail);

        if (userPhoneNumber) {
          const getUser = await getUserByPhoneNumber(userPhoneNumber);
          user = getUser;
          console.log('User found by phone number:', user);
        } else {
          const getUser = await getUserByGmail(userEmail);
          user = getUser;
          console.log('User found by Gmail:', user);
        }

        setUser(user);
      } else {
        console.log(
          'No user found in localStorage. Executing new user flow...',
        );
        await executeUser();
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }
    const policyAccept = await getPolicyAcceptValue();
    await fetchData();
    if (policyAccept === false) {
      nav('/Policy');
    }
    console.log('9');
    if (!user || user?.error === true) {
      console.log('No user found in local storage. Redirecting to Home...');
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

    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      initializeApp();
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
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          setVerificationCodeSent={setVerificationCodeSent}
          verificationCodeSent={verificationCodeSent}
          modalCallback={modalCallback}
          setModalCallback={setModalCallback}
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

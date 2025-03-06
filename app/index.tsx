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

  const [modalCallback, setModalCallback] = useState<
    ((phone: string) => void) | null
  >(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const rememberme = localStorage.getItem('rememberMe');
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
      let number = localStorage.getItem('userPhoneNumber')?.trim();
      if (number) {
        // console.log(`[LocalStorage] Found phone number: ${number}`);
        const userInfo = await getUserByPhoneNumber(number);

        if (userInfo) {
          // console.log(`[User] Found user by phone number:`, userInfo);
          return userInfo;
        }
      }
      // If no valid phone number, try email
      const email = localStorage.getItem('userEmail')?.trim();
      if (!email) {
        console.log(`[LocalStorage] No email found.`);
        return null;
      }
      // console.log(`[LocalStorage] Found email: ${email}`);
      const userInfo = await getUserByGmail(email);
      if (userInfo) {
        // console.log(`[User] Found user by email:`, userInfo);
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
      const value = localStorage.getItem('isAccepted');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        // console.log('Retrieved isAccepted value:', parsedValue);
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
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      console.log('3');
      if (code) {
        const userToken = await getUserToken(code);
        if (!userToken) {
          console.log('4');
          console.warn('Google login failed or expired code.');
          // window.location.href = '/';
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
            console.log('9');
            console.log('actually rememberd');
            if (user) {
              console.log('10');
              localStorage.setItem('user', JSON.stringify(user));

              // console.log('saved user: ', user);
            }
            // console.log('user didnt exist to save : ', user);
          }
          return;
        }
        console.log('7');
        const number = await waitForPhoneInput();

        return number || undefined;
      }

      return null;
    } catch (e) {
      console.log(e);
    }
  };
  // console.log('what is user 1: ', user);
  const initializeApp = async () => {
    console.log('Initializing app...');
    setLoading(true);

    try {
      console.log('1');

      const localUser = localStorage.getItem('user');
      const user = localUser ? JSON.parse(localUser) : null;

      // console.log('user from storage ->', user);

      if (user && user !== null) {
        console.log(`[LocalStorage] Found user: ${user}`);
        const getUser = await getUserByGmail(user.email);
        const newUser = getUser.user;
        // console.log('new user: ', newUser);

        setUser(newUser);
      } else {
        console.log('executing');
        console.log('8');
        await executeUser();
      }

      // console.log('what is user 2: ', user);
      // const phoneRes = await waitForPhoneInput();
      // console.log('phone modal response: ', phoneRes);
    } catch (error) {
      console.error('Initialization error:', error);
    }

    // Check if user is logged in, otherwise redirect
    const policyAccept = await getPolicyAcceptValue();
    await fetchData();

    if (policyAccept === false) {
      nav('/Policy');
      // return console.log('Policy not accepted:', policyAccept);
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

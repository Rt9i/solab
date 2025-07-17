import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import {logIn, createUser, sendOTP, verifyOTP} from '../res/api';

import SolabContext from '../store/solabContext';
import {useNavigation} from 'expo-router';


import PhoneModal from './getNumber';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [isModalVisible, setisModalVisible] = useState(false);

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const clearTxt = () => {
    setPhoneNumber('');
    setPassword('');
    setUserName('');
  };

  const navigation = useNavigation();
  const {saveUser, clearAsyncStorage, strings, setUser} =
    useContext(SolabContext);

  const getItem = async key => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  };

  const setItem = async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };
  const handleLogin = async () => {
    if (loading) {
      return;
    }

    setErrors({});
    if (!phoneNumber || !password) {
      setErrors({
        phoneNumber: !phoneNumber ? 'Phone number is required' : '',
        password: !password ? 'Password is required' : '',
      });
      return;
    }
    if (password.length <= 4) {
      setErrors({password: 'Password must be longer than 4 characters'});
      return;
    }
    setLoading(true);

    try {
      const remember = await getItem('rememberMe');
      const response = await logIn(phoneNumber, password);
      console.log('number and pass: ', phoneNumber, '+', password);

      console.log('Login response:', response);

      if (response.auth && response.user) {
        if (remember) {
          console.log('remember me: ', remember);
          await setItem('user', JSON.stringify(response.user));
        } else {
          setUser(response.user);
        }

        navigation.navigate('index');
      } else {
        handleError(response.errorMessage, 'login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({phoneNumber: 'Phone number or password is wrong'});
    } finally {
      setLoading(false);
    }
  };

  const sendOtpCode = async () => {
    try {
      console.log('sending requeest');
      const response = await sendOTP('+972' + phoneNumber);
      if (response.ok === true) setVerificationCodeSent(true);
      console.log('otp response: ', response);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const verifyOTPCode = async () => {
    try {
      console.log('sending requeest');
      const response = await verifyOTP('+972' + phoneNumber, verificationCode);
      if (response.ok == true || response.success == true) {
        setIsPhoneVerified(true);

        const res = await createUser(userName, phoneNumber, password);
        console.log('create user res: ', res);

        setVerificationCode();
        handleSwitch();
        // if (Platform.OS == 'web') {
        //   toast.success(
        //     `${strings.registerMessage} ${strings.nowYouCanLogin}! 🎉`,
        //     {
        //       position: 'top-center',
        //       duration: 2000,
        //     },
        //   );
        // }
        console.log('verifcation rsponse: ', response);
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVerify = async () => {
    setErrors({});
    setLoading(true);

    try {
      if (!password) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: 'Password is required',
        }));
      }
      if (!phoneNumber) {
        setErrors(prevErrors => ({
          ...prevErrors,
          phoneNumber: 'Phone number is required',
        }));
      }
      if (!userName) {
        setErrors(prevErrors => ({
          ...prevErrors,
          userName: 'user name is required',
        }));
      }

      const res = await handleSendOtp();

      if (response.user) {
        // if (Platform.OS == 'web') {
        //   toast.success(
        //     `${strings.registerMessage} ${strings.nowYouCanLogin}! 🎉`,
        //     {
        //       position: 'top-center',
        //       duration: 2000,
        //     },
        //   );
        // }
        setRegisterMode(false);
        clearTxt();
      } else if (response.errorMessage) {
        // handleError(response.errorMessage, 'register');
      }
    } catch (error) {
      error;
    } finally {
      setLoading(false);
    }
  };
  const handleSendOtp = async () => {
    try {
      setLoading(true);

      if (Object.keys(errors).length == 0) {
        console.log('sending otp req');
        const res = await sendOtpCode();
        console.log('res in handleSendOtp: ', res);

        if (res.success === true) {
          console.log('indeed right');
          setVerificationCodeSent(true);
        } else {
          console.log('OTP request failed');
        }
      }

      setLoading(false); // This should be placed after the API call, once it's complete
    } catch (e) {
      console.log(e);
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };

  const handleError = (errorMessage, type) => {
    if (errorMessage.includes('duplicate key error')) {
      setErrors({phoneNumber: 'Phone number already exists'});
    } else if (type === 'login') {
      setErrors({phoneNumber: 'Phone number or password is wrong'});
    } else {
      setErrors({password: 'An error occurred. Please try again'});
    }
  };
  const handleSwitch = () => {
    setRegisterMode(!registerMode);
    setVerificationCode(false);
    setVerificationCodeSent(false);
    setErrors({});
    clearTxt();
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>{registerMode ? 'Register' : 'Log In'}</Text>

      {verificationCodeSent ? (
        <View style={{marginBottom: 10}}>
          <TextInput
            style={[styles.input, errors.code && styles.inputError]}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Code"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            accessibilityLabel="code input"
            testID="codeInput"
          />

          <Button
            title="Confirm"
            onPress={() => {
              verifyOTPCode();
            }}
            disabled={!verificationCode} // Disable the button if there's no verification code
          />
        </View>
      ) : (
        <View>
          {errors.userName && (
            <Text style={styles.errorText}>{errors.userName}</Text>
          )}
          {registerMode && (
            <TextInput
              style={[styles.input, errors.userName && styles.inputError]}
              value={userName}
              onChangeText={setUserName}
              placeholder="Name"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              accessibilityLabel="Name input"
              testID="userNameInput"
            />
          )}

          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.inputError]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            accessibilityLabel="Phone number input"
            testID="phoneNumberInput" // For testing
          />

          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                errors.password && styles.inputError,
              ]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              accessibilityLabel="Password input"
              testID="passwordInput" // For testing
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }>
              <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={registerMode ? handleVerify : handleLogin}
            disabled={loading}
            accessibilityLabel={
              registerMode ? 'Register button' : 'Log In button'
            }>
            <Text style={styles.buttonText}>
              {registerMode ? 'Verify' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, styles.switchButton]}
        onPress={() => handleSwitch()}
        disabled={loading}
        accessibilityLabel={registerMode ? 'Log In' : 'Register'}>
        <Text style={styles.buttonText}>
          {registerMode ? 'Switch to Log In' : 'Switch to Register'}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color="#007bff" />
          <Text style={styles.loadingText}>Loading ...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  show: {
    color: 'black',
    fontSize: 12,
    width: 50,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    color: 'black',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
  },
});

export default LoginForm;

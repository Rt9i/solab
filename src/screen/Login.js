import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logIn, createUser } from '../res/api';
import { useNavigation } from '@react-navigation/native';
import SolabContext from '../store/solabContext';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const clearTxt = () => {
    setPhoneNumber('');
    setPassword('');
    setUserName('');
  };

  const navigation = useNavigation();
  const { saveUser, clearAsyncStorage } = useContext(SolabContext);

  const handleLogin = async () => {
    setErrors({ phoneNumber: '', password: '' });
  
    if (!phoneNumber || !password) {
      setErrors({
        phoneNumber: !phoneNumber ? 'Phone number is required' : '',
        password: !password ? 'Password is required' : '',
      });
      return;
    }
  
    if (password.length <= 4) {
      setErrors({ password: 'Password must be longer than 4 characters' });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await logIn(phoneNumber, password);
      console.log('Login response:', response);
  
      if (response.auth && response.user) {
        await clearAsyncStorage();
        await saveUser(response.user); 
  
        // Fetch user products
        const productsResponse = await getUserProducts(response.user._id);
        if (productsResponse.products) {
          saveUserProducts(productsResponse.products); // Save products to context
        }
  
        navigation.navigate('Splash');
      } else {
        handleLoginError(response.errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        phoneNumber: 'Phone number or password is wrong',
        password: '',
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleLoginError = (errorMessage) => {
    if (errorMessage.includes('Phone number')) {
      setErrors({ phoneNumber: 'Phone number or password is wrong' });
    } else {
      setErrors({ password: 'Phone number or password is wrong' });
    }
  };

  const handleRegister = async () => {
    setErrors({ phoneNumber: '', password: '' });

    if (!userName || !phoneNumber || !password) {
      setErrors({
        phoneNumber: !phoneNumber ? 'Phone number is required' : '',
        password: !password ? 'Password is required' : '',
      });
      return;
    }

    if (password.length <= 4) {
      setErrors({ password: 'Password must be longer than 4 characters' });
      return;
    }

    setLoading(true);

    try {
      const response = await createUser(userName, phoneNumber, password);
      console.log('Register response:', response);
      if (response.user) {
        Alert.alert(
          'Success',
          'User registered successfully. You can now log in.'
        );
        setRegisterMode(false);
        clearTxt();
      } else {
        handleRegisterError(response.errorMessage);
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.message.includes('E11000 duplicate key error collection')) {
        setErrors({ phoneNumber: 'Phone number already exists' });
      } else {
        setErrors({ password: 'An error occurred. Please try again' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterError = (errorMessage) => {
    if (errorMessage.includes('Phone number')) {
      setErrors({ phoneNumber: 'Phone number already exists' });
    } else {
      setErrors({ password: errorMessage || 'Registration failed' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>{registerMode ? 'Register' : 'Log In'}</Text>
        {registerMode && (
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Name"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            accessibilityLabel="Name input"
            testID="userNameInput" // For testing
          />
        )}
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
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
            <Text style={styles.show}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={registerMode ? handleRegister : handleLogin}
          disabled={loading}
          accessibilityLabel={registerMode ? 'Register button' : 'Log In button'}
        >
          <Text style={styles.buttonText}>{registerMode ? 'Register' : 'Log In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.switchButton]}
          onPress={() => setRegisterMode(!registerMode)}
          disabled={loading}
          accessibilityLabel={registerMode ? 'Switch to Log In' : 'Switch to Register'}
        >
          <Text style={styles.buttonText}>{registerMode ? 'Switch to Log In' : 'Switch to Register'}</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  show: {
    marginBottom: 15,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    backgroundColor: '#6c757d',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6c757d',
  },
});

export default Login;

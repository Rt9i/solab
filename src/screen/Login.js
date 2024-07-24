import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {logIn, createUser} from '../res/api';
import {useNavigation} from '@react-navigation/native';
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

  const clearTxt = () => {
    setPhoneNumber('');
    setPassword('');
    setUserName('');
  };
  const navigation = useNavigation();
  const {saveUser} = useContext(SolabContext);

  const handleLogin = async () => {
    setErrors({phoneNumber: '', password: ''});

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
      const response = await logIn(phoneNumber, password);
      console.log('Login response:', response);

      if (response.auth && response.user) {
        saveUser(response.user); // Save the user data
        navigation.navigate('Splash');
      } else {
        // Assume that response.errorMessage will contain relevant information
        if (response.errorMessage.includes('Password')) {
          setErrors({password: 'Password is wrong'});
        } else if (response.errorMessage.includes('Phone number')) {
          setErrors({phoneNumber: 'Phone number is wrong'});
        } else {
          setErrors({password: response.errorMessage || 'Login failed'});
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({phoneNumber: 'Phone number is wrong', password: ''});
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setErrors({phoneNumber: '', password: ''});

    if (!userName || !phoneNumber || !password) {
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
      const response = await createUser(userName, phoneNumber, password);
      console.log('Register response:', response);
      if (response.user) {
        Alert.alert(
          'Success',
          'User registered successfully. You can now log in.',
        );
        setRegisterMode(false);
      } else {
        if (response.errorMessage.includes('Phone number')) {
          setErrors({phoneNumber: 'Phone number already exists'});
        } else {
          setErrors({password: response.errorMessage || 'Registration failed'});
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      setErrors({password: 'An error occurred. Please try again'});
    } finally {
      setLoading(false);
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
        />
        <Text style={styles.errorText}>{errors.password}</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
        />
        <Button
          title={registerMode ? 'Register' : 'Log In'}
          onPress={registerMode ? handleRegister : handleLogin}
          color="#007bff"
          disabled={loading} // Disable the button if loading is true
        />
        <Button
          title={registerMode ? 'Switch to Log In' : 'Switch to Register'}
          onPress={() => setRegisterMode(!registerMode)}
          color="#6c757d"
          disabled={loading} // Disable the button if loading is true
        />
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
    shadowOffset: {width: 0, height: 2},
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
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#007bff',
  },
});

export default Login;

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { logIn, createUser } from '../res/api';
import { useNavigation } from '@react-navigation/native';
import SolabContext from '../store/solabContext';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { saveUser } = useContext(SolabContext);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
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
        Alert.alert('Error', response.errorMessage || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!userName || !phoneNumber || !password) {
      Alert.alert('Error', 'Please enter all fields');
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
      } else {
        Alert.alert('Error', response.errorMessage || 'Registration failed');
      }
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', 'An error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Phone Number"
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
      />
      <TextInput
        style={styles.input}
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
      />
      <Button
        title={registerMode ? 'Switch to Log In' : 'Switch to Register'}
        onPress={() => setRegisterMode(!registerMode)}
        color="#6c757d"
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
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

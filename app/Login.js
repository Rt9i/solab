import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import GoogleLogin from '@/src/Components/googleLogin';
import SolabContext from '../src/store/solabContext';
import LoginForm from '../src/Components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';
import {Button} from 'react-native-web';

const Login = () => {
  const {user, setUser, clearAsyncStorage} = useContext(SolabContext);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadRememberMe = async () => {
      const storedValue = localStorage.getItem('rememberMe');
      console.log('getting value to save it here');

      if (storedValue === 'true') {
        setRememberMe(true);
      }
    };
    loadRememberMe();
  }, []);

  const handleRememberMe = () => {
    setRememberMe(prev => {
      const newValue = !prev;
      // console.log('remember value is:', newValue);

      if (newValue) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      return newValue; // Ensure state updates correctly
    });
  };

  return (
    <View style={styles.container}>
      {!user && <LoginForm />}
      {/* <Button title="clear user" onPress={() => clearAsyncStorage()} /> */}
      <TouchableOpacity onPress={handleRememberMe} style={styles.row}>
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
          {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </TouchableOpacity>

      <GoogleLogin />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

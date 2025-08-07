import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import GoogleLogin from '@/src/Components/googleLogin';
import SolabContext from '../src/store/solabContext';
import LoginForm from '../src/Components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from '@expo/vector-icons';

const Login = () => {
  const {user, setUser, clearAsyncStorage} = useContext(SolabContext);
  const [rememberMe, setRememberMe] = useState(false);

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

  const removeItem = async key => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  };

  useEffect(() => {
    const loadRememberMe = async () => {
      const storedValue = await getItem('rememberMe');
      console.log('getting value to save it here', storedValue);

      if (storedValue === 'true') {
        setRememberMe(true);
      }
    };
    loadRememberMe();
  }, []);

  const handleRememberMe = async () => {
    setRememberMe(prev => {
      const newValue = !prev;

      if (newValue) {
        setItem('rememberMe', 'true');
      } else {
        removeItem('rememberMe');
      }

      return newValue;
    });
  };

  return (
    <View style={styles.container}>
      {/* {!user && <LoginForm />} */}
      {/* <Button title="clear user" onPress={() => clearAsyncStorage()} /> */}

      <GoogleLogin />

      <TouchableOpacity onPress={handleRememberMe} style={styles.row}>
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
          {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </TouchableOpacity>
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

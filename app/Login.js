import {StyleSheet, Text, View} from 'react-native';
import loginForm from '../src/Components/loginForm';
import React from 'react';

const Login = () => {
  return <View style={styles.container}>
    {loginForm()}
    </View>;
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

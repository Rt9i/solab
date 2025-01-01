import {StyleSheet, Text, View} from 'react-native';
import loginForm from '../src/Components/loginForm';
import React from 'react';
import GoogleLogin from '@/src/Components/googleLogin';

const Login = () => {
  return (
    <View style={styles.container}>
      {/* {loginForm()} */}
      {GoogleLogin()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

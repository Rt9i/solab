import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import GoogleLogin from '@/src/Components/googleLogin';
import SolabContext from '../src/store/solabContext';
import LoginForm from '../src/Components/loginForm';

const Login = () => {
  const {currentUser} = useContext(SolabContext);

  return (
    <View style={styles.container}>
      {currentUser == null && <LoginForm />}
      <GoogleLogin />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    alignItems: 'center',
  },
});
 
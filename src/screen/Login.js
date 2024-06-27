import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAllUsers } from '../res/api';
import UserItem from '../Components/UserItem';

const Login = props => {
  const { users = [] } = props.route.params || {};

 

  const renderUsers = () => {
    return users?.map(user => <UserItem {...user} />);
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size={'large'} />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
   
      <ScrollView>{renderUsers()}</ScrollView>
    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
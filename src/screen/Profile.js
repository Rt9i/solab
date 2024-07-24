import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SolabContext from '../store/solabContext';

const Profile = () => {
  const { user } = useContext(SolabContext); // Get user data from context

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{user.phoneNumber}</Text>
      <Text style={styles.userName}>{user.userName}</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  phoneNumber: {
    fontSize: 30,
    color: 'black',
  },
  userName: {
    fontSize: 20,
    color: 'gray',
  },
});

export default Profile;

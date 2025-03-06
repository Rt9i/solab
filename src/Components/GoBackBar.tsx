import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';

const GoBackBar = () => {
  const nav = useNavigation();

  const goBack = () => {
    if (nav.canGoBack()) nav.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.button}>
        <Text style={styles.text}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoBackBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50, // Fixed height instead of percentage for better consistency
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', // iOS-like blue color for back buttons
  },
});

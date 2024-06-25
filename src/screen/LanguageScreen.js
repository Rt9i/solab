import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LanguageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Language Screen</Text>
      {/* Add your language selection UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageScreen;

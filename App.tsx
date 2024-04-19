import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainNavigation from './routes/nav';
import SolabProvider from './src/store/solabProvider';

const App = () => {
  return (
    <View style={styles.container}>
      <SolabProvider>
        <MainNavigation />
      </SolabProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  greensqr: {
    backgroundColor: 'green',
    height: 50,
    width: 50,
    marginRight: 20,
  },
  topContainer: {
    flexDirection: 'row',
  },
  firstUI: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});
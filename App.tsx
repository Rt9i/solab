import React, { useEffect, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './routes/nav';
import SolabProvider from './src/store/solabProvider';
import SolabContext from './src/store/solabContext';

const AppContent = () => {
  const { saveUser, isAuthenticated } = useContext(SolabContext);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          saveUser(JSON.parse(savedUser)); // Load user data into the provider
          setInitialRoute('Splash'); // Set initial route to Splash
        } else {
          setInitialRoute('Login'); // Set initial route to Login
        }
      } catch (error) {
        console.log('Failed to load user from storage:', error);
        setInitialRoute('Login'); // Set initial route to Login in case of error
      }
    };

    checkAuth();
  }, [saveUser]);

  if (initialRoute === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <MainNavigation initialRouteName={initialRoute} />;
};

const App = () => {
  return (
    <SolabProvider>
      <AppContent />
    </SolabProvider>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
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

export default App;

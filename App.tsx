import React, { useEffect, useContext, useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this is uncommented
import MainNavigation from './routes/nav';
import SolabProvider from './src/store/solabProvider';
import SolabContext from './src/store/solabContext';
import ScreenNames from './routes/ScreenNames';

const AppContent = () => {
  const { saveUser, isAuthenticated } = useContext(SolabContext);
  const [initialRoute, setInitialRoute] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        saveUser(JSON.parse(savedUser)); // Load user data into the provider
        setInitialRoute(ScreenNames.splash); // Set initial route to Splash
      } else {
        setInitialRoute(ScreenNames.login); // Set initial route to Login
      }
    } catch (error) {
      console.log('Failed to load user from storage:', error);
      setInitialRoute(ScreenNames.login); // Set initial route to Login in case of error
    }
  }, [saveUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});

export default App;

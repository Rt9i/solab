import React, {useEffect, useContext, useState, useCallback} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './routes/nav';
import SolabProvider from './src/store/solabProvider';
import SolabContext from './src/store/solabContext';
import ScreenNames from './routes/ScreenNames';

const AppContent = () => {
  const {saveUser} = useContext(SolabContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        saveUser(JSON.parse(savedUser));
        setInitialRoute(ScreenNames.splash);
      } else {
        setInitialRoute(ScreenNames.login);
      }
    } catch (error) {
      console.log('Failed to load user from storage:', error);
      setInitialRoute(ScreenNames.login);
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

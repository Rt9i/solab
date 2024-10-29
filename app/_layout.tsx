// app/_layout.tsx
import React, {useEffect, useContext, useState, useCallback} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {useColorScheme} from '@/hooks/useColorScheme';
import SolabProvider from '../src/store/solabProvider';
import SolabContext from '../src/store/solabContext';

import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const {saveUser} = useContext(SolabContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // const checkAuth = useCallback(async () => {
  //   try {
  //     const savedUser = await AsyncStorage.getItem('user');
  //     if (savedUser) {
  //       saveUser(JSON.parse(savedUser));
  //       setInitialRoute('splash');
  //     } else {
  //       setInitialRoute('login'); // Redirect to login if not authenticated
  //     }
  //   } catch (error) {
  //     console.log('Failed to load user from storage:', error);
  //     setInitialRoute('login'); // Fallback to login on error
  //   }
  // }, [saveUser]);

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  return (
    <>
      <Stack initialRouteName={initialRoute || 'index'}>
        <Stack.Screen name="Login" options={{headerShown: false}} />
        <Stack.Screen name="Home" options={{headerShown: false}} />
        <Stack.Screen name="StaffHome" />
        <Stack.Screen name="WorkersHome" />
        <Stack.Screen name="EditProduct" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="Cart" />
        <Stack.Screen name="Profile" />
        <Stack.Screen name="CatsStore" options={{headerShown: false}} />
        <Stack.Screen
          name="ProductScreen"
          options={{
            headerTitle: '',
            headerStyle: {backgroundColor: 'white'},
            headerTintColor: '#000000',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="SeeAllProducts" />
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast />
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SolabProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppContent />
      </ThemeProvider>
    </SolabProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f8f9fa',
  },
});

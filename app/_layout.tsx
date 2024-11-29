import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {useColorScheme} from '@/hooks/useColorScheme';
import SolabProvider from '../src/store/solabProvider';
import {useColorScheme} from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={initialRoute || 'index'}>
        {/* <Stack.Screen name="Login" options={{headerShown: false}} /> */}
        <Stack.Screen name="Home" options={{headerShown: false}} />
        <Stack.Screen name="StaffHome" />
        <Stack.Screen name="WorkersHome" />
        <Stack.Screen name="EditProduct" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="Cart" />
        <Stack.Screen name="Profile" />
        <Stack.Screen name="ProductScreen" />
        <Stack.Screen name="SeeAllProducts" />
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast />
    </ThemeProvider>
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
      <AppContent />
    </SolabProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native'; // Import NavigationContainer
import {Stack} from 'expo-router';
import SolabProvider from '../src/store/solabProvider';
import {useColorScheme} from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';
import Images from '@/src/assets/images/images';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackImageSource: Images.arrow(),
        }}>
        <Stack.Screen name="home" options={{headerShown: false}} />
        <Stack.Screen name="Policy" />
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

      {Platform.OS !== 'web' && <Toast />}
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
  backImage: {
    width: 24,
    height: 24,
    tintColor: '#000',
    resizeMode: 'contain',
  },
});

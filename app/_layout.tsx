import React, {useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import SolabProvider from '../src/store/solabProvider';
import {useColorScheme} from '@/hooks/useColorScheme';
import Images from '@/src/assets/images/images';

import Toast from 'react-native-toast-message';
import {Toaster} from 'react-hot-toast';
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const scheme = useColorScheme();
  const finalScheme = scheme || 'light';

  const theme =
    Platform.OS !== 'web'
      ? finalScheme === 'light'
        ? DarkTheme
        : DefaultTheme
      : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackImageSource: Images.arrow(),
        }}>
        <Stack.Screen name="Home" options={{headerShown: false}} />
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

      {/* {Platform.OS !== 'web' && <Toast  />} */}
      {Platform.OS === 'web' && <Toaster position="top-center" />}
    </ThemeProvider>
  );
}

export default function RootLayout() {
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
      {/* No second ThemeProvider here— just render AppContent */}
      <AppContent />
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
    
  },
});

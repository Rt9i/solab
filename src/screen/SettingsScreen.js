import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, UIManager, Button } from 'react-native';
import SolabContext from '../store/solabContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../assets/images/images';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SettingsScreen = () => {
  const { strings, changeLanguage, logout } = useContext(SolabContext);
  const navigation = useNavigation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const settings = [
    {
      name: 'Profile',
      image: Images.profileIcon(), // Update with appropriate profile icon
      onPress: () => {
        // Navigate to Profile screen with userId
        const userId = 'USER_ID'; // Replace with dynamic user ID if available
        navigation.navigate('Profile', { userId: '66a133852373371941757e0c' });
      },
    },
    {
      name: 'Languages',
      image: Images.languageIcon(),
      onPress: () => setIsLanguageOpen(!isLanguageOpen),
      arrow: isLanguageOpen ? '▲' : '▼', // Arrow symbol based on the state
    },
  ];

  const languages = [
    {
      name: 'English',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('en');
        navigation.goBack();
        setIsLanguageOpen(false);
      },
    },
    {
      name: 'עברית',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('he');
        navigation.goBack();
        setIsLanguageOpen(false);
      },
    },
    {
      name: 'عربي',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('ar');
        navigation.goBack();
        setIsLanguageOpen(false);
      },
    },
  ];
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('cart');
      // Add other keys if needed
    } catch (error) {
      console.log('Failed to clear AsyncStorage:', error);
    }
  };
  const checkAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys(); // Get all keys
      console.log('AsyncStorage keys:', keys);
  
      const allData = await AsyncStorage.multiGet(keys); // Get all key-value pairs
      console.log('AsyncStorage data:', allData);
    } catch (error) {
      console.log('Failed to check AsyncStorage:', error);
    }
  };
  
  // Call this function to inspect AsyncStorage
  const handleLogout = async () => {
    try {
      await clearAsyncStorage();
      await checkAsyncStorage(); // Check AsyncStorage contents
      navigation.navigate('Login');
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  };
  
  
  

  const renderSettings = () => {
    return settings.map((setting, index) => (
      <TouchableOpacity key={index} onPress={setting.onPress}>
        <View style={styles.settingItem}>
          <Image source={setting.image} style={styles.image} />
          <Text style={styles.settingText}>{setting.name}</Text>
          {setting.arrow && <Text style={styles.arrow}>{setting.arrow}</Text>}
        </View>
      </TouchableOpacity>
    ));
  };

  const renderLanguages = () => {
    return languages.map((language, index) => (
      <TouchableOpacity key={index} onPress={language.onPress}>
        <View style={styles.settingItem}>
          <Image source={language.image} style={styles.image} />
          <Text style={styles.settingText}>{language.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsList}>
        {renderSettings()}
        {isLanguageOpen && (
          <View style={styles.languageContainer}>
            {renderLanguages()}
          </View>
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6', // Light blue background color
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsList: {
    backgroundColor: '#FFFFFF', // White background for settings list
    borderRadius: 10,
    elevation: 5, // Adds shadow on Android
    padding: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light gray border bottom
  },
  settingText: {
    fontSize: 20,
    color: '#000', // Black text color
    marginLeft: 15,
    flex: 1, // To push the arrow to the right
  },
  image: {
    width: 30,
    height: 30,
  },
  arrow: {
    fontSize: 20,
    color: '#000',
    marginLeft: 10,
  },
  languageContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Light gray border top
    paddingTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30', // Red background for logout button
    borderRadius: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingsScreen;

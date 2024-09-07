import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
} from 'react-native';
import SolabContext from '../store/solabContext';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../assets/images/images';
import ScreenNames from '../../routes/ScreenNames';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SettingsScreen = () => {
  const {user, setUser, changeLanguage, logout, clearAsyncStorage} =
    useContext(SolabContext);
  const navigation = useNavigation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Update to use _id instead of id
  const currentUserId = user ? user._id : null;

  // Debugging logs
  console.log('Current user:', user);
  console.log('Current user ID:', currentUserId);

  const settings = [
    {
      name: 'Profile',
      image: Images.profileIcon(),
      onPress: () => {
        if (currentUserId) {
          navigation.navigate('Profile', {userId: currentUserId});
        } else {
          console.log('User ID is not available');
        }
      },
    },
    {
      name: 'Languages',
      image: Images.languageIcon(),
      onPress: () => setIsLanguageOpen(!isLanguageOpen),
      arrow: isLanguageOpen ? '▲' : '▼',
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

  const handleLogOut = () => {
    logout();
    navigation.navigate(ScreenNames.login);
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
          <View style={styles.languageContainer}>{renderLanguages()}</View>
        )}
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 15,
    flex: 1,
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
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingsScreen;

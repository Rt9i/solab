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
import SolabContext from '../src/store/solabContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../src/assets/images/images';
import ScreenNames from '../routes/ScreenNames';
import CustomModal from '@/src/Components/customModal';
import {delUser} from '@/src/res/api';
import {useNavigation} from 'expo-router';

// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const SettingsScreen = () => {
  const {user, setUser, changeLanguage, logout, clearAsyncStorage, strings} =
    useContext(SolabContext);
  const navigation = useNavigation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [message, setMessage] = useState(null);
  const currentUserId = user ? user._id : null;

  console.log('Current user ID:', currentUserId);

  const noUser = () => {
    setShowModal(false)
    navigation.navigate('Login');
  };

  const handleProfilePress = () => {
    if (currentUserId) {
      navigation.navigate('Profile', {userId: currentUserId});
    } else {
      setMessage(strings.loginMessage)
      setConfirm(() => noUser);
      setShowModal(true);
      console.log('User ID is not available');
    }
  };
  const settings = [
    {
      name: 'Profile',
      image: Images.profileIcon(),
      onPress: () => handleProfilePress(),
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

  const handleLogOut = async () => {
    logout();
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

  const handleDelete = () => {
    setMessage(strings.delUser);
    setConfirm(onConfirm);
    setShowModal(true);
  };

  const onCancel = () => setShowModal(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await delUser(user._id);
      if (res) {
        logout();
      }
      console.log('res: ', res);
      setLoading(false);
      setShowModal(false);
    } catch (e) {
      e;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsList}>
        {renderSettings()}
        {isLanguageOpen && (
          <View style={styles.languageContainer}>{renderLanguages()}</View>
        )}
        {user && (
          <View>
            <TouchableOpacity
              onPress={handleLogOut}
              style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.logoutButton}>
              <Text style={styles.logoutText}>Delete User</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <CustomModal
        message={message}
        visible={showModal}
        onCancel={onCancel}
        onConfirm={confirm}
        loading={loading}
      />
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

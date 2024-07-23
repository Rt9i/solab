import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import SolabContext from '../store/solabContext';
import {useNavigation} from '@react-navigation/native';
import Images from '../assets/images/images';

const SettingsScreen = () => {
  const {strings, changeLanguage} = useContext(SolabContext);
  const navigation = useNavigation();

  const settings = [
    {
      name: 'English',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('en');
        goBack();
      },
    },
    {
      name: 'עברית',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('he');
        goBack();
      },
    },
    {
      name: 'عربي',
      image: Images.languageIcon(),
      onPress: () => {
        changeLanguage('ar');
        goBack();
      },
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const renderSettings = () => {
    return settings.map((setting, index) => (
      <TouchableOpacity key={index} onPress={setting.onPress}>
        <View style={styles.settingItem}>
          <Image source={setting.image} style={styles.image} />
          <Text style={styles.settingText}>{setting.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsList}>{renderSettings()}</View>
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
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000', // Black text color
    marginBottom: 20,
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
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default SettingsScreen;

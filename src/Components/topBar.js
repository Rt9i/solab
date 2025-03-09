import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';
import {useNavigation} from 'expo-router';

const TopBar = () => {
  const {triggerScrollToTop, user, currentUser} = useContext(SolabContext);
  const navigation = useNavigation();
  const {
    cart,
    search,
    setSearch,
    setFilteredItemsState,
    getFilteredItemsForRow,
  } = useContext(SolabContext);
  const [searchText, setSearchText] = useState('');
  // Create a reference for the TextInput
  const searchInputRef = useRef(null);

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };
  const navProfile = () => {
    navigation.navigate('Profile');
  };
  const navLogin = () => {
    navigation.navigate('Login');
  };
  const goBack = () => {
    navigation.goBack();
  };

  const settingsBox = () => (
    <TouchableOpacity
      onPress={navigateToSettings}
      style={styles.touch}
      activeOpacity={0.8}>
      <View style={styles.box}>
        <Image source={Images.menu()} style={styles.img} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );

  const LoginBox = () => (
    <TouchableOpacity
      onPress={navLogin}
      style={styles.touch}
      activeOpacity={0.8}>
      <View style={styles.loginContainer}>
        <Text style={styles.login}>Login</Text>
      </View>
    </TouchableOpacity>
  );

  const profilePic = () => (
    <TouchableOpacity
      onPress={navProfile}
      style={styles.touch}
      activeOpacity={0.8}>
      <View style={styles.profileCont}>
        <Image
          source={{uri: user?.picture || Images.profileIcon()}}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
  const cartBox = () => (
    <TouchableOpacity
      onPress={navigateToCart}
      style={styles.touch}
      activeOpacity={0.8}>
      <View style={styles.cartContainer}>
        <Image source={Images.cart()} style={styles.img} resizeMode="contain" />

        {cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const arrow = () => (
    <TouchableOpacity
      onPress={() => goBack()}
      style={styles.touch}
      activeOpacity={1}>
      <View style={styles.arrow}>
        <Image source={Images.arrow()} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const handleSearchChange = text => {
    // Do not trim the text, keep all spaces
    const keywords = text.split(/\s+/).filter(Boolean); // Split by spaces and remove empty strings
    setSearchText(text);
    if (keywords.length > 0) {
      triggerScrollToTop();
      setSearch(keywords); // Store keywords (as an array)
      setFilteredItemsState(rowValue => getFilteredItemsForRow(rowValue));
    } else {
      setSearch([]); // If no keywords, set as empty array
      setFilteredItemsState([]);
    }
  };

  const clearSearch = () => {
    triggerScrollToTop();
    setSearch('');
    setSearchText('');
    setFilteredItemsState([]);
  };

  const openSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width:'100%',maxWidth:900,flexDirection:'row'}}>
        <View style={styles.leftContainer}>
          {arrow()}
          {settingsBox()}
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={openSearch}>
            <Image source={Images.search()} style={styles.searchIcon} />
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={handleSearchChange}
            />
          </ScrollView>

          {search.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              style={styles.clearIconContainer}>
              <Image source={Images.clear()} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
        {!user || user == null || user.error == true
          ? LoginBox()
          : profilePic()}

        {cartBox()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  login: {
    borderWidth: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#1877F2',

    elevation: 10,
  },

  arrow: {},
  image: {
    height: 30,
    width: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    height: 60,
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    margin: 4,
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },

  box: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 30,

    margin: 5,
  },
  cartContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: 'black', // Text color
    backgroundColor: 'transparent', // Ensure the background color is transparent to see the container color
  },
  clearIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearIcon: {
    width: 20,
    height: 20,
  },
});

export default TopBar;

import React, {useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';

const TopBar = () => {
  const {triggerScrollToTop} = useContext(SolabContext);
  const navigation = useNavigation();
  const {
    cart,
    search,
    setSearch,
    setFilteredItemsState,
    getFilteredItemsForRow,
  } = useContext(SolabContext);

  // Create a reference for the TextInput
  const searchInputRef = useRef(null);

  const navigateToSettings = () => {
    navigation.navigate(ScreenNames.settings);
  };

  const navigateToCart = () => {
    navigation.navigate(ScreenNames.cart);
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
    <TouchableOpacity onPress={() => goBack()} style={styles.touch}>
      <View style={styles.arrow}>
        <Image source={Images.arrow()} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const handleSearchChange = text => {
    const keywords = text.trim().toLowerCase().split(/\s+/);

    // Only update search and filtered items if there's text
    if (text.length > 0) {
      triggerScrollToTop();
      setSearch(keywords);
      setFilteredItemsState(rowValue => getFilteredItemsForRow(rowValue));
    } else {
      setSearch('');
      setFilteredItemsState([]); // Or however you want to reset the filtered items
    }
  };

  const clearSearch = () => {
    triggerScrollToTop();
    setSearch(''); // Clear the search text
    setFilteredItemsState([]); // Clear the filtered items
  };

  // Function to focus the search input
  const openSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
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

        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="gray"
          value={search}
          onChangeText={handleSearchChange}
        />

        {search.length > 0 && (
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearIconContainer}>
            <Image source={Images.clear()} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
      {cartBox()}
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    marginTop: 10,
  },
  image: {
    height: 30,
    width: 30,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    height: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  touch: {
    width: 50,
    height: 50,
  },
  box: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',

    left: -10,
  },
  img: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  cartContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
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

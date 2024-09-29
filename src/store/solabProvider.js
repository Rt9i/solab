import React, {useEffect, useState, useCallback, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
import {enStrings, heStrings, arStrings} from '../res/strings';
import {Alert} from 'react-native';
import ScreenNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import {updateUserProducts, saveProductsToDatabase} from '../res/api';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import data from '../res/Data';
import axios from 'axios';
const SolabProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [brands, setBrands] = useState([]);
  const [dogBrands, setDogBrands] = useState([]);
  const [language, setLanguage] = useState('he');
  const [strings, setStrings] = useState(heStrings);
  const [selectedIcons, setSelectedIcons] = useState();
  const [search, setSearch] = useState([]);
  const [filteredItemsState, setFilteredItemsState] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const debounceTimeout = useRef(null);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const [data, setData] = useState([]);

  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };

  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       console.log('====================================');
  //       console.log('SAAVING');
  //       console.log('====================================');
  //       await saveProductsToDatabase(data);
  //     } catch (error) {
  //       console.error('Failed to save product to data base :', error);
  //     }
  //   };

  //   saveData();
  // }, []);

  const triggerScrollToTop = () => {
    setScrollToTop(prev => !prev);
  };
  const getFilteredItemsForRow = rowValue => {
    const isSearchActive = search.length > 0;

    const filteredItems = getCategoryItemsData.filter(item => {
      const matchesSearch = isSearchActive
        ? search.some(keyword =>
            item.searchKeys?.some(key => key.toLowerCase().includes(keyword)),
          )
        : true;

      const matchesCategory =
        item.category?.includes(selectedCategory) &&
        item.category?.includes(rowValue);

      const matchesPetType = item.petType?.includes(selectedIcons);

      // If search is active, return items matching search and rowValue
      if (isSearchActive) {
        return matchesSearch && item.category?.includes(rowValue);
      }

      // Otherwise, return items matching category, rowValue, and petType
      return matchesCategory && matchesPetType;
    });

    // Ensure uniqueness of items by their ID
    return filteredItems.reduce((acc, item) => {
      if (
        !acc.find(existingItem => existingItem.productId === item.productId)
      ) {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    // console.log('====================================');
    // console.log('carrttt', cart);
    // console.log('====================================');
    const saveCartWithDebounce = async () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (user?._id && cart && cart.length > 0) {
          try {
            await updateUserProducts(user._id, cart);
            console.log('Cart sent to server:', cart);
          } catch (error) {
            console.error('Error updating cart on server:', error);
          }
        }
      }, 1700);
    };

    saveCartWithDebounce();

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [cart]);

  const changeLanguage = useCallback(async lang => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.log('Failed to save language to storage:', error);
    }
  }, []);

  useEffect(() => {
    setStrings(translations[language]);
  }, [language]);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.log('Failed to load language from storage:', error);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  const saveUser = useCallback(async userData => {
    // save the user to the provider and async storage
    try {
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true); // Set authenticated state
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }, []);

  const clearAsyncStorage = useCallback(async () => {
    try {
      // Log before clearing
      const userBefore = await AsyncStorage.getItem('user');
      const cartBefore = await AsyncStorage.getItem('cart');
      console.log('Before clearing:', {userBefore, cartBefore});

      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('cart');

      // Log after clearing
      const userAfter = await AsyncStorage.getItem('user');
      const cartAfter = await AsyncStorage.getItem('cart');
      console.log('After clearing:', {userAfter, cartAfter});
    } catch (error) {
      console.log('Failed to clear AsyncStorage:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await clearAsyncStorage(); // Ensure AsyncStorage is cleared
      setUser(null); // Clear user state
      setCart([]); // Clear cart state
      setIsAuthenticated(false); // Update authentication state
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  }, [clearAsyncStorage]);

  const addItem = (item, itemId) => {
    const existingItemIndex = cart.findIndex(item => item.productId === itemId);
    const updatedCart = [...cart];

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity++;
    } else {
      item.quantity = 1;
      updatedCart.push(item);
      setIsItemAdded(true);
    }

    setCart(updatedCart);
  };

  const addItemToCart = useCallback(
    (item, itemId) => {
      // Ensure the item has a productId (or id)
      console.log('====================================');
      console.log("itemidddd ",itemId);
      console.log('====================================');
      if (!item.productId) {
        console.error("Item is missing a productId");
        return; // Prevent adding an invalid item
      }
  
      const productId = item.productId || item.id; 
  
      // Find the existing item by productId
      const existingItemIndex = cart.findIndex(cartItem => cartItem.productId === productId);
  
      const updatedCart = [...cart];
  
      // Update the quantity if it exists, otherwise add the item
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCart.push({ ...item, productId, quantity: item.quantity || 1 });
        setIsItemAdded(true);
      }
  
      setCart(updatedCart);
    },
    [cart]
  );
  
  

  const checkRemoveItem = useCallback(itemId => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => removeItem(itemId),
      },
    ]);
  }, []);

  const removeItem = useCallback(
    itemId => {
      const updatedCart = cart.filter(item => item.productId !== itemId);
      setIsItemAdded(false);
      setCart(updatedCart);
    },
    [cart],
  );

  const removeItemFromCart = useCallback(
    (item, itemId) => {
      const existingItemIndex = cart.findIndex(
        item => item.productId === itemId,
      );
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      if (existingItemIndex !== -1) {
        if (existingItem.quantity === 1) {
          Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Remove',
                onPress: () => removeItem(itemId),
              },
            ],
          );
        } else {
          updatedCart[existingItemIndex].quantity--;
        }
        setCart(updatedCart);
      }
    },
    [cart],
  );
  const saveUserProducts = fetchedItems => {
    setCart(prevCart => {
      const newItems = fetchedItems.map(item => ({
        ...item,
        productId: item.productId || item.id,
      }));

      // Ensure no duplicates
      const updatedCart = [...prevCart];
      newItems.forEach(newItem => {
        if (
          !updatedCart.some(
            cartItem => cartItem.productId === newItem.productId,
          )
        ) {
          updatedCart.push(newItem);
        }
      });

      console.log('Updated cart:', updatedCart);
      return updatedCart;
    });
  };

  const contextValue = {
    cart,
    setCart,
    addItemToCart,
    addItem,
    removeItem,
    isItemAdded,
    setIsItemAdded,
    checkRemoveItem,
    removeItemFromCart,
    brands,
    setBrands,
    dogBrands,
    setDogBrands,
    strings,
    changeLanguage,
    selectedIcons,
    setSelectedIcons,
    search,
    setSearch,
    user,
    isAuthenticated,
    saveUser,
    logout,
    clearAsyncStorage,
    saveUserProducts,
    setUser,
    filteredItemsState,
    setFilteredItemsState,
    keywords,
    setKeywords,
    getFilteredItemsForRow,
    selectedCategory,
    setSelectedCategory,
    scrollToTop,
    setScrollToTop,
    triggerScrollToTop,
    updatedData,
    setUpdatedData,
    data,
    setData,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

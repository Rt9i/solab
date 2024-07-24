import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
import {Alert} from 'react-native';
import {enStrings, heStrings, arStrings} from '../res/strings';

const SolabProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [brands, setBrands] = useState([]);
  const [dogBrands, setDogBrands] = useState([]);
  const [language, setLanguage] = useState('he');
  const [strings, setStrings] = useState(heStrings);
  const [selectedIcons, setSelectedIcons] = useState();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null); // Added state for user
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };

  const changeLanguage = async lang => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.log('Failed to save language to storage:', error);
    }
  };

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

  // Load cart from AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        }
      } catch (error) {
        console.log('Failed to load cart from storage in context:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.log('Failed to save cart to storage in context:', error);
      }
    };

    saveCart();
  }, [cart]);

  // Load user from AsyncStorage on initialization
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Failed to load user from storage:', error);
      }
    };

    loadUser();
  }, []);

  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };
  
  

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('cart');
      // Add other keys if needed
    } catch (error) {
      console.log('Failed to clear AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      // Clear AsyncStorage
      await clearAsyncStorage();

      // Reset state
      setUser(null);
      setCart([]);
      setIsAuthenticated(false);

      // Redirect to login screen
      // This requires access to navigation, potentially from useNavigation hook
      // or passed as a prop
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  }

  const addItem = (item, itemId) => {
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
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

  const addItemToCart = (item, itemId) => {
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    const updatedCart = [...cart];
    setCart(updatedCart);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart.push(item);
      setIsItemAdded(true);
    }
    setCart(updatedCart);
  };

  const checkRemoveItem = itemId => {
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
  };

  const removeItem = itemId => {
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    if (existingItemIndex !== -1) {
      const updatedCart = cart.filter(
        (item, index) => index !== existingItemIndex,
      );
      setIsItemAdded(false);
      setCart(updatedCart);
    }
  };

  const removeItemFromCart = (item, itemId) => {
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
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
  };

  const contextValue = {
    cart,
    setCart,
    addItemToCart,
    removeItem,
    isItemAdded,
    setIsItemAdded,
    addItem,
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
    setIsAuthenticated,
    saveUser,
    logout,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

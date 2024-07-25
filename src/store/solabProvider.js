import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };

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
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.log('Failed to load cart from storage in context:', error);
      }
    };

    loadCart();
  }, []);

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

  const saveUser = useCallback(async userData => {
    try {
      setUser(userData); // Update the user state
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Save to AsyncStorage
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

  const addItemToCart = useCallback(
    (item, itemId) => {
      const existingItemIndex = cart.findIndex(item => item.id === itemId);
      const updatedCart = [...cart];
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCart.push(item);
        setIsItemAdded(true);
      }
      setCart(updatedCart);
    },
    [cart],
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
      const updatedCart = cart.filter(item => item.id !== itemId);
      setIsItemAdded(false);
      setCart(updatedCart);
    },
    [cart],
  );

  const removeItemFromCart = useCallback(
    (item, itemId) => {
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
    },
    [cart],
  );

  const contextValue = {
    cart,
    setCart,
    addItemToCart,
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
    setUser,
    saveUser, // Use saveUser function here
    logout,
    clearAsyncStorage,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

import React, {useEffect, useState, useCallback, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
import {enStrings, heStrings, arStrings} from '../res/strings';
import {Alert} from 'react-native';
import ScreenNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/native';
import {updateUserCart} from '../res/api';
import getCategoryItemsData from '../res/Data';

const SolabProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [brands, setBrands] = useState([]);
  const [dogBrands, setDogBrands] = useState([]);
  const [language, setLanguage] = useState('he');
  const [strings, setStrings] = useState(heStrings);
  const [selectedIcons, setSelectedIcons] = useState();
  const [search, setSearch] = useState('');
  const [filteredItemsState, setFilteredItemsState] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const debounceTimeout = useRef(null);
  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };
  const getFilteredItemsForRow = (rowValue) => {
    const isSearchActive = search.length > 0;

    const filteredItems = getCategoryItemsData.filter(item => {
      const matchesSearch = isSearchActive
        ? search.some(keyword =>
            item.searchKeys?.some(key =>
              key.toLowerCase().includes(keyword)
            )
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
      if (!acc.find(existingItem => existingItem.id === item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
  };
  useEffect(() => {
    const saveCartWithDebounce = async () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (user?._id && cart && cart.length > 0) {
          try {
            await updateUserCart(user._id, cart);
            console.log('Cart saved to server:', cart);
          } catch (error) {
            console.error('Error updating cart on server:', error);
          }
        } else {
          console.log('No cart items to save or user ID is missing');
        }
      }, 1700);
    };

    saveCartWithDebounce();

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [cart, user?._id]);

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

  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!user || !user._id) {
      console.error('User ID is undefined or invalid');
      return;
    }

    try {
      const response = await fetch(
        `https://solab-server.onrender.com/getUserProducts/${user._id}`,
      );
      const result = await response.json();

      if (response.ok) {
        setCart(result.products || []);
      } else {
        console.error('Failed to load cart from server:', result.errorMessage);
      }
    } catch (error) {
      console.error('Failed to load cart from server:', error);
    }
  };

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

  const saveUserProducts = useCallback(
    async products => {
      try {
        if (user) {
          // Update user products in state
          const updatedUser = {...user, products};
          setUser(updatedUser);
          // Save updated user data to AsyncStorage
          await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('User products saved successfully');
        } else {
          console.warn('No user data available to save products');
        }
      } catch (error) {
        console.error('Failed to save user products:', error);
      }
    },
    [user],
  );

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
    setUser,
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
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

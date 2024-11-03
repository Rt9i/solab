import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
import {enStrings, heStrings, arStrings} from '../res/strings';
import {Alert} from 'react-native';
import ScreenNames from '../../routes/ScreenNames';

import {updateUserProducts, saveProductsToDatabase} from '../res/api';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import data from '../res/Data';
import axios from 'axios';
import CustomModal from '../Components/customModal';
import {useNavigation} from 'expo-router';
const SolabProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [brands, setBrands] = useState([]);
  const [dogBrands, setDogBrands] = useState([]);
  const [language, setLanguage] = useState('he');
  const [strings, setStrings] = useState(heStrings);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredItemsState, setFilteredItemsState] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const debounceTimeout = useRef(null);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [updatedData, setUpdatedData] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [delModal, setDelModal] = useState(false);
  const nav = useNavigation();
  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };
  const pets = [
    {name: 'cat', id: 1, txt: strings.cat},
    {name: 'dog', id: 2, txt: strings.dog},
    // {name: 'bird', id: 3, txt: strings.dog},
  ];
  const rows = [
    {rows: 'firstRow', id: 1},
    {rows: 'secondRow', id: 2},
    {rows: 'thirdRow', id: 3},
    {rows: 'fourthRow', id: 4},
    {rows: 'fifthRow', id: 5},
    {rows: 'sixthRow', id: 6},
    {rows: 'seventhRow', id: 7},
    {rows: 'eigthRow', id: 8},
    {rows: 'ninthRow', id: 9},
    {rows: 'tenthRow', id: 10},
    {rows: 'eleventhRow', id: 11},
  ];

  const cat = [
    {Food: 'food'},
    {Meat: 'meat'},
    {Accessories: 'accessories'},
    {Clothes: 'clothes'},
    {Sprays: 'sprays'},
    {Toilet: 'toilet'},
    {Perfume: 'perfume'},
    {Treats: 'treats'},
    {bowl: 'bowl'},
  ];

  const triggerScrollToTop = () => {
    setScrollToTop(prev => !prev);
  };
  const getFilteredItemsForRow = useMemo(
    () => rowValue => {
      const isSearchActive = search.length > 0;

      const filteredItems = data.filter(item => {
        const matchesSearch = isSearchActive
          ? search.some(keyword =>
              item.searchKeys?.some(key =>
                key.toLowerCase().includes(keyword.toLowerCase()),
              ),
            )
          : true;

        const matchesCategory =
          !isSearchActive && selectedCategory
            ? item.category?.includes(selectedCategory)
            : true;

        const matchesRowValue = rowValue
          ? item.category.includes(rowValue)
          : true;

        const matchesPetType = selectedIcons.length
          ? item.petType?.some(pet => selectedIcons.includes(pet))
          : true;

        return (
          matchesSearch && matchesCategory && matchesRowValue && matchesPetType
        );
      });

      return filteredItems;
    },
    [search, selectedCategory, selectedIcons, data],
  );

  useEffect(() => {
    const saveCartWithDebounce = async () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (cart && cart.length >= 0) {
          try {
            if (user?._id) {
              await updateUserProducts(user._id, cart);
              console.log('Cart sent to server:', cart);
            } else {
              await AsyncStorage.setItem('cart', JSON.stringify(cart));
              console.log('Cart saved to AsyncStorage:', cart);
            }
          } catch (error) {
            console.error(
              'Error updating cart on server or saving to AsyncStorage:',
              error,
            );
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

  const saveCartToAsyncStorage = async cart => {
    if (user == null) {
      if (!cart) {
        console.log('No cart data to save');
        return;
      }

      try {
        const cartString = JSON.stringify(cart);
        await AsyncStorage.setItem('cart', cartString);
        console.log('Cart saved to AsyncStorage:', cartString);
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    }
  };

  const loadCartFromAsyncStorage = useCallback(async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        console.log('Loaded cart from AsyncStorage:', cart);
        setCart(cart);
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     saveCartToAsyncStorage(cart);
  //   }
  // }, [cart]);

  useEffect(() => {
    if (user == null) {
      loadCartFromAsyncStorage();
    }
  }, []);

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
          console.log('getting user from async storage');

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
    console.log('user data:', userData);

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
    console.log('In logout');
    try {
      setUser(null);
      setCart([]);
      setIsAuthenticated(false);
      await clearAsyncStorage();
      nav.navigate('index');
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  }, []);

  const addItem = useCallback(
    (item, itemId) => {
      const existingItemIndex = cart.findIndex(item => item._id === itemId);
      const updatedCart = [...cart];

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity++;
      } else {
        item.quantity = 1;
        updatedCart.push(item);
        setIsItemAdded(true);
      }

      setCart(updatedCart);
    },
    [cart],
  );

  const addItemToCart = useCallback(item => {
    if (!item._id) {
      console.error('Item is missing an _id');
      return;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem._id === item._id,
      );

      const updatedCart = [...prevCart];
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += item.quantity || 1;
      } else {
        updatedCart.push({...item, quantity: item.quantity || 1});
        setIsItemAdded(true);
      }
      return updatedCart;
    });
  }, []);

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
      const updatedCart = cart.filter(item => item._id !== itemId);
      setIsItemAdded(false);
      setDelModal(false);
      setSelectedItems([]);
      setSelectedItemId('');
      setCart(updatedCart);
    },
    [cart],
  );

  const confirmDelete = async () => {
    try {
      setDelLoading(true);
      const deleting = await removeItemFromDatabase(_id);
      console.log('Product deleted');
      const result = await getDataFromDataBase();
      setData(result);
      setDelLoading(false);
      goback();
    } catch (e) {}

    setModalVisible(false); // Close the modal
  };

  const cancelDelete = () => {
    setModalVisible(false); // Close the modal without deleting
  };

  const removeItemFromCart = useCallback(
    (item, itemId) => {
      const existingItemIndex = cart.findIndex(
        cartItem => cartItem._id === itemId, // Change to use _id
      );
      const updatedCart = [...cart];

      // Check if the item exists in the cart
      if (existingItemIndex !== -1) {
        const existingItem = updatedCart[existingItemIndex];

        // If quantity is 1, confirm removal
        if (existingItem.quantity === 1) {
          // setCart(cart.filter(item => item._id !== itemId));
          setSelectedItemId(itemId);
          return setDelModal(true);
        } else {
          updatedCart[existingItemIndex].quantity--;
        }

        // Update the cart state
        setCart(updatedCart);
      }
    },
    [cart], // Dependency array
  );

  const saveUserProducts = useCallback(
    fetchedItems => {
      setCart(prevCart => {
        const newItems = fetchedItems.map(item => ({
          ...item,
        }));

        // Ensure no duplicates
        const updatedCart = [...prevCart];
        newItems.forEach(newItem => {
          // Check for duplicates using _id
          if (!updatedCart.some(cartItem => cartItem._id === newItem._id)) {
            updatedCart.push(newItem);
          }
        });

        console.log('Updated cart:', updatedCart);
        return updatedCart;
      });
    },
    [setCart],
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
    rows,
    cat,
    pets,
    language,
    delModal,
    setDelModal,
    setSelectedItemId,
    selectedItemId,
    selectedItems,
    setSelectedItems,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

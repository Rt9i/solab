import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
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

  useEffect(() => {
    console.log('User:', user);
  }, []);

  const translations = {
    en: enStrings,
    he: heStrings,
    ar: arStrings,
  };
  const pets = [
    {name: 'cat', id: 1, txt: strings.cat},
    {name: 'dog', id: 2, txt: strings.dog},
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
    // console.log('====================================');
    // console.log('carrttt', cart);
    // console.log('====================================');
    const saveCartWithDebounce = async () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(async () => {
        if (cart && cart.length > 0) {
          try {
            if (user?._id) {
              // User exists, save the cart to the server
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
    if (!cart) {
      console.log('No cart data to save');
      return; // Exit if the cart is undefined or null
    }

    try {
      const cartString = JSON.stringify(cart);
      await AsyncStorage.setItem('cart', cartString);
      console.log('Cart saved to AsyncStorage:', cartString);
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  const loadCartFromAsyncStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        console.log('Loaded cart from AsyncStorage:', cart);
        setCart(cart); // Set the cart state with the parsed data
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      saveCartToAsyncStorage(cart); // Pass the current cart to the function
    }
  }, [cart, user]); // Add 'user' to the dependency array to trigger on user state change

  useEffect(() => {
    if (user) {
      loadCartFromAsyncStorage(); // Load cart from AsyncStorage if the user is logged in
    }
  }, [user]); // This will run when the user state changes

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
      await clearAsyncStorage();
      setUser(null);
      setCart([]);
      setIsAuthenticated(false);
      console.log('Logged out successfully');
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  }, []);

  const addItem = (item, itemId) => {
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
  };

  const addItemToCart = useCallback(
    item => {
      console.log('====================================');
      console.log('Item ID:', item._id); // Log the item's ID
      console.log('====================================');

      // Ensure the item has an _id
      if (!item._id) {
        console.error('Item is missing an _id');
        return; // Prevent adding an invalid item
      }

      const updatedCart = [...cart];

      // Find the existing item by _id
      const existingItemIndex = updatedCart.findIndex(
        cartItem => cartItem._id === item._id,
      );

      // Update the quantity if it exists, otherwise add the item
      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += item.quantity || 1; // Use item.quantity or default to 1
      } else {
        updatedCart.push({...item, quantity: item.quantity || 1}); // Add the item with a quantity
        setIsItemAdded(true); // Set flag to indicate an item was added
      }

      setCart(updatedCart); // Update the cart state
    },
    [cart], // Dependency array
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
      const updatedCart = cart.filter(item => item._id !== itemId);
      setIsItemAdded(false);
      setCart(updatedCart);
    },
    [cart],
  );

  const removeItemFromCart = useCallback(
    (item, itemId) => {
      // Find the existing item index using _id
      const existingItemIndex = cart.findIndex(
        cartItem => cartItem._id === itemId, // Change to use _id
      );
      const updatedCart = [...cart];

      // Check if the item exists in the cart
      if (existingItemIndex !== -1) {
        const existingItem = updatedCart[existingItemIndex];

        // If quantity is 1, confirm removal
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
                onPress: () => removeItem(itemId), // Call removeItem with itemId
              },
            ],
          );
        } else {
          // Decrease the quantity of the existing item
          updatedCart[existingItemIndex].quantity--;
        }

        // Update the cart state
        setCart(updatedCart);
      }
    },
    [cart], // Dependency array
  );

  const saveUserProducts = fetchedItems => {
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
    rows,
    cat,
    pets,
    language,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

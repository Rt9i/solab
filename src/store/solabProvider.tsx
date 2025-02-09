import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from './solabContext';
import {enStrings, heStrings, arStrings} from '../res/strings';
import {Alert} from 'react-native';
import {updateUserProducts, saveProductsToDatabase} from '../res/api';
import {useNavigation} from 'expo-router';

interface SolabProviderProps {
  children: ReactNode;
}
type Language = 'en' | 'he' | 'ar';

type UserData = {
  id: string;
  email: string | null;
  name: string | null;
  picture: string | null;
};
const SolabProvider: React.FC<SolabProviderProps> = ({children}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [dogBrands, setDogBrands] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('he');
  const [strings, setStrings] = useState<typeof heStrings>(heStrings);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [filteredItemsState, setFilteredItemsState] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('food');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [scrollToTop, setScrollToTop] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [delModal, setDelModal] = useState<boolean>(false);
  const nav = useNavigation();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);
  useEffect(() => {
    // console.log('current user :', currentUser?.name);
  }, [currentUser]);

  const translations: Record<Language, typeof enStrings> = {
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

  interface Item {
    _id: string;
    category: string[];
    petType: string[];
    searchKeys?: string[];
  }

  const getFilteredItemsForRow = useMemo(
    () =>
      (rowValue: string): Item[] => {
        const isSearchActive = search.length > 0;

        const filteredItems = data.filter((item: Item) => {
          const matchesSearch = isSearchActive
            ? search.some((keyword: string) =>
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
            matchesSearch &&
            matchesCategory &&
            matchesRowValue &&
            matchesPetType
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

  const changeLanguage = useCallback(async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.log('Failed to save language to storage:', error);
    }
  }, []);

  useEffect(() => {
    const currentStrings = translations[language];
    setStrings(currentStrings);
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
    currentUser,
    setCurrentUser,
  };

  return (
    <SolabContext.Provider value={contextValue}>
      {children}
    </SolabContext.Provider>
  );
};

export default SolabProvider;

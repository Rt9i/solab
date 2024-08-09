import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SolabContext from '../store/solabContext';
import CartRowItems from '../Components/CartRowItems';
import Images from '../assets/images/images';
import {updateUserCart} from '../res/api';
import {useFocusEffect} from '@react-navigation/native';

const Cart = props => {
  const {strings, user} = useContext(SolabContext);
  const {cart, removeItemFromCart, setCart} = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousCartState, setPreviousCartState] = useState([]);

  const debounceTimeout = useRef(null);

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
  
  useFocusEffect(
    React.useCallback(() => {
      // Save cart data to server when screen is focused
      if (user?.id && cart) {
        const saveCart = async () => {
          try {
            await updateUserCart(user.id, cart);
          } catch (error) {
            console.error('Error updating cart on server:', error);
          }
        };

        saveCart();
      }

      return () => {
        // Save cart data to server when screen loses focus
        if (user?.id && cart) {
          const saveCart = async () => {
            try {
              await updateUserCart(user.id, cart);
            } catch (error) {
              console.error('Error updating cart on server:', error);
            }
          };

          saveCart();
        }
      };
    }, [user?.id, cart]),
  );

  const getUserProductMap = () => {
    return user.products.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {});
  };

  const updateCartWithUserProducts = () => {
    const userProductMap = getUserProductMap();

    const updatedCart = cart
      .map(item => {
        const newQuantity = userProductMap[item.id];
        if (newQuantity) {
          return {...item, quantity: newQuantity};
        }
        return item;
      })
      .filter(item => userProductMap[item.id]);

    setCart(updatedCart);
  };

  useEffect(() => {
    if (user?.products) {
      updateCartWithUserProducts();
    }
  }, [user?.products]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          setPreviousCartState(parsedCart); // Initialize previous cart state
        }
      } catch (error) {
        console.log('Failed to load cart from storage:', error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.log('Failed to save cart to storage:', error);
      }
    };

    saveCart();
  }, [cart]);

  const clearCart = async () => {
    setCart([]);
    if (user && user._id) {
      await updateUserCart(user._id, []);
    }
  };

  const alertClear = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: clearCart,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cart.forEach(item => {
      const saleAmount = Number(item.saleAmmount) || null;
      const salePrice = Number(item.salePrice) || null;
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      if (saleAmount && salePrice && quantity >= saleAmount) {
        const numSales = Math.floor(quantity / saleAmount);
        const remainingQuantity = quantity % saleAmount;
        const totalSalePrice = numSales * salePrice;
        const totalRegularPrice = remainingQuantity * price;
        totalPrice += totalSalePrice + totalRegularPrice;
      } else {
        totalPrice += price * quantity;
      }
    });

    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  useEffect(() => {
    setIsSelectAll(
      cart.length > 0 && cart.every(item => selectedItems.includes(item.id)),
    );
  }, [selectedItems, cart]);

  const handleCheckBoxChange = async (isChecked, id) => {
    if (isChecked) {
      setSelectedItems(prevSelectedItems => {
        const newItems = [...prevSelectedItems, id];
        if (user && user._id) {
          updateUserCart(
            user._id,
            cart.filter(item => newItems.includes(item.id)),
          );
        }
        return newItems;
      });
    } else {
      setSelectedItems(prevSelectedItems => {
        const newItems = prevSelectedItems.filter(itemId => itemId !== id);
        if (user && user._id) {
          updateUserCart(
            user._id,
            cart.filter(item => newItems.includes(item.id)),
          );
        }
        return newItems;
      });
    }
  };

  const removeSelectedItems = async () => {
    const newCart = cart.filter(item => !selectedItems.includes(item.id));
    setCart(newCart);
    setSelectedItems([]);
    setIsSelectAll(false);
    if (user && user._id) {
      await updateUserCart(user._id, newCart);
    }
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = cart.map(item => item.id);
      setSelectedItems(allItemIds);
    }
  };

  const renderCart = ({item}) => {
    return (
      <CartRowItems
        {...item}
        id={item.id}
        hideImage={true}
        isSelected={selectedItems.includes(item.id)}
        onCheckBoxChange={handleCheckBoxChange}
      />
    );
  };

  const emptyCartMessage = () => {
    if (cart.length === 0) {
      return <Text style={styles.emptyText}>{strings.empty}</Text>;
    }
    return null;
  };

  useEffect(() => {
    // Only update the server if user and cart are available and cart has changed
    if (
      user?.id &&
      cart &&
      JSON.stringify(cart) !== JSON.stringify(previousCartState)
    ) {
      const updateCart = async () => {
        try {
          await updateUserCart(user.id, cart);
          setPreviousCartState(cart); // Update previous cart state
        } catch (error) {
          console.error('Error updating cart on server:', error);
        }
      };

      updateCart();
    }
  }, [cart, user?.id]); // Dependencies: will run when cart or user.id changes

  return (
    <LinearGradient
      colors={['#6CCAFF', '#6CCAFF', '#004C99']}
      locations={[0, 0.1, 1]}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.totalPrice}>
            {`${strings.price}`} = {totalPrice} {`${strings.priceTag}`}
          </Text>
        </View>

        <View style={styles.selectedDisplay}>
          <BouncyCheckbox
            style={styles.allTouch}
            isChecked={isSelectAll}
            onPress={handleSelectAll}
            fillColor="black"
            iconStyle={{borderColor: 'red'}}
            textStyle={{textDecorationLine: 'none'}}
            text={strings.selectAll}
          />
          <TouchableOpacity
            style={styles.cleartouch}
            onPress={removeSelectedItems}>
            <Image source={Images.trashCan()} style={styles.trashCan} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        key={item => item.id}
        ListEmptyComponent={emptyCartMessage}
        contentContainerStyle={
          cart.length === 0 ? styles.emptyCartContainer : undefined
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  allTouch: {
    width: 30,
    height: 30,
  },
  header: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cleartouch: {},
  trashCan: {
    width: 30,
    height: 30,
    tintColor: '#D9534F', // Red color for the trash can
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    width: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    textShadowColor: 'grey',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  selectedDisplay: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'PassionOne-Bold',
    fontSize: 40,
    opacity: 0.2,
    width: 250,
    borderWidth: 0.8,
    borderColor: 'white',
    borderRadius: 100,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  emptyCartContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;

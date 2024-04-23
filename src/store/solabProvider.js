import React, { useState } from 'react';
import SolabContext from './solabContext';
import { Alert } from 'react-native';

const SolabProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(false);

  const addItem = (item, itemId) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
    const updatedCart = [...cart];
    setCart(updatedCart);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity++;
    } else {
      updatedCart.push(item);
      setIsItemAdded(true);
    }
    setCart(updatedCart);
  };


  const addItemToCart = (item, itemId) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
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

  const checkRemoveItem = (item, itemId) => {

    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        {
          text: 'remove',
          onPress: () => removeItem(itemId),
        },
      ]
    );


  }


  const removeItem = (itemId) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
    if (existingItemIndex !== -1) {
      const updatedCart = cart.filter((item, index) => index !== existingItemIndex);
      setIsItemAdded(false);
      setCart(updatedCart);
    }
  };


  const removeItemFromCart = (item, itemId) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
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
              text: 'remove',
              onPress: () => removeItem(itemId),
            },
          ]
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

  };

  return <SolabContext.Provider value={contextValue}>{children}</SolabContext.Provider>;
};

export default SolabProvider;

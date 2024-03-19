import React, { useState } from 'react';
import SolabContext from './solabContext';

const SolabProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item, itemId) => {
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);
    if (existingItemIndex != -1) {
      quantity= quantity +quantity
    }

    setCart([...cart, item]);
  };

  const removeItemFromCart = (itemId) => {

    const existingItemIndex = cart.findIndex((item) => item.id === itemId);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];

      if (existingItem.quantity === 1) {

        updatedCart.splice(existingItemIndex, 1);
      } else {

        existingItem.quantity--;
      }

      setCart(updatedCart);
    };
  }


  const contextValue = {
    cart,
    setCart,
    addItemToCart,
    removeItemFromCart,

  };

  return <SolabContext.Provider
    value={contextValue}>{children}
  </SolabContext.Provider>;
};

export default SolabProvider;

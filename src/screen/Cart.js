import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import SolabContext from '../store/solabContext';
import CartRowItems from '../Components/CartRowItems';
import CartItems from '../Components/CartItems';
import Images from '../assets/images/images';
import DisplayItem from '../Components/DisplayItem';

const Cart = (props) => {
  const { strings, changeLanguage } = useContext(SolabContext);
  const { cart, removeItemFromCart, setCart } = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');
  const [totalPrice, setTotalPrice] = useState(0);

  const clearCart = () => {
    setCart([]);
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
      { cancelable: true }
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const showImage = () => {
    return (
      <Image source={Images.photo()} style={styles.smallimg} />
    );
  };

  const renderCart = ({ item }) => {
    if (item && item.id) {
      if (displayMode === 'row') {
        return <CartRowItems {...item} id={item.id} hideImage={true} onRemove={() => removeItemFromCart(item.id)} />;
      } else {
        return <CartItems {...item} hideImage={true} onRemove={() => removeItemFromCart(item.id)} />;
      }
    } else {
      return null;
    }
  };

  const emptyCartMessage = () => {
    if (cart.length === 0) {
      return <Text style={styles.emptyText}>{strings.empty}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.toptxt}>
        <Text style={styles.carttxt}>{strings.cart}</Text>
      </View>

      <View style={styles.selectedDisplay}>
        <DisplayItem
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        <TouchableOpacity style={styles.cleartouch} onPress={alertClear}>
          <Text style={styles.clearCart}>{strings.clearCart}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.items, displayMode === 'row' && { alignItems: 'center' }]}>
        <Text style={styles.totalPrice}>
          {`${strings.price}`} = {totalPrice} {`${strings.priceTag}`}
        </Text>
        {emptyCartMessage()}
        <FlatList
          data={cart}
          renderItem={renderCart}
          keyExtractor={(item) => item.id}
          numColumns={displayMode === 'row' ? 3 : 1}
          key={displayMode}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          paddingHorizontal={4}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cleartouch: {
    marginTop: 40,
  },
  clearCart: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: 100,
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    width: 150,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginHorizontal: 115,
    marginBottom: 20,
  },
  selectedDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  toptxt: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 140,
    borderColor: 'black',
    width: 120,
    height: 60,
  },
  carttxt: {
    fontSize: 40,
    fontFamily: 'Angkor-Regular',
    fontFamily: 'bigFont',
    color: 'white',
    shadowColor: 'black',
    textShadowOffset: { width: 7, height: 5 },
    textShadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3F3F3F',
  },
  items: {
    borderWidth: 2,
    borderRadius: 20,
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 220,
    color: 'white',
    fontFamily: 'PassionOne-Bold',
    fontSize: 40,
    opacity: 0.2,
    width: 250,
    borderWidth: 0.8,
    borderColor: 'white',
    borderRadius: 100,
  },
});

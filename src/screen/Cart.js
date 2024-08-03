import React, {useContext, useEffect, useState} from 'react';
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
import CartItems from '../Components/CartItems';
import Images from '../assets/images/images';
import {updateUserCart} from '../res/api';

const Cart = props => {
  const {strings, user} = useContext(SolabContext);
  const {cart, removeItemFromCart, setCart} = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
console.log("...the cart now ", cart)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
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
      await updateUserCart(user._id, []); // Send empty cart to server
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
    cart.map(item => {
      if (
        item.saleAmmount &&
        item.salePrice &&
        item.quantity >= item.saleAmmount
      ) {
        const numSales = Math.floor(item.quantity / item.saleAmmount);
        const remainingQuantity = item.quantity % item.saleAmmount;
        const totalSalePrice = numSales * item.salePrice;
        const totalRegularPrice = remainingQuantity * item.price;
        totalPrice += totalSalePrice + totalRegularPrice;
      } else {
        totalPrice += item.price * item.quantity;
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
          ); // Update server with new cart items
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
          ); // Update server with updated cart items
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
      await updateUserCart(user._id, newCart); // Update server with new cart items
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
    // Only update the server if user and cart are available
    if (user?.id && cart) {
      const updateCart = async () => {
        try {
          await updateUserCart(user.id, cart);
        } catch (error) {
          console.error('Error updating cart on server:', error);
        }
      };

      updateCart();
    }
  }, [cart]); // Dependencies: will run when cart or user.id changes

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

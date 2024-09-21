import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SolabContext from '../store/solabContext';
import CartRowItems from '../Components/CartRowItems';
import Images from '../assets/images/images';
import { updateUserProducts } from '../res/api';

const Cart = props => {
  const { strings, user } = useContext(SolabContext);
  const { cart, removeItemFromCart, setCart } = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousCartState, setPreviousCartState] = useState([]);

  const debounceTimeout = useRef(null);
console.log("cart: ", cart)

  // const getUserProductMap = () => {
  //   if (!user?.products) return {};
  //   return user.products.reduce((acc, item) => {
  //     acc[item.productId] = item.quantity;
  //     return acc;
  //   }, {});
  // };

  // Update cart items based on user products
  // const updateCartWithUserProducts = () => {
  //   const userProductMap = getUserProductMap();

  //   const updatedCart = cart
  //     .map(item => {
  //       const newQuantity = userProductMap[item.id];
  //       if (newQuantity) {
  //         return { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     })
  //     .filter(item => userProductMap[item.id]);

  //   setCart(updatedCart);
  // };

  // useEffect(() => {
  //   if (user?.products) {
  //     updateCartWithUserProducts();
  //   }
  // }, [user?.products]); 
  
  // Clear the cart and update the user's products on the server
  const clearCart = async () => {
    setCart([]);
    if (user && user._id) {
      await updateUserProducts(user._id, []);
    }
  };

  const alertClear = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearCart, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    let total = 0;

    cart.forEach(item => {
      const { saleAmount, salePrice, price, quantity } = item;

      const saleAmountNum = Number(saleAmount) || 0;
      const salePriceNum = Number(salePrice) || 0;
      const priceNum = Number(price) || 0;
      const quantityNum = Number(quantity) || 0;

      if (saleAmountNum > 0 && salePriceNum > 0 && quantityNum >= saleAmountNum) {
        const numSales = Math.floor(quantityNum / saleAmountNum);
        const remainingQuantity = quantityNum % saleAmountNum;
        const totalSalePrice = numSales * salePriceNum;
        const totalRegularPrice = remainingQuantity * priceNum;
        total += totalSalePrice + totalRegularPrice;
      } else {
        total += priceNum * quantityNum;
      }
    });

    setTotalPrice(total);
  };

  // Update the cart whenever it changes
  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  // Update select all state based on selected items
  useEffect(() => {
    setIsSelectAll(
      cart.length > 0 && cart.every(item => selectedItems.includes(item.id))
    );
  }, [selectedItems, cart]);

  // Handle checkbox change
  const handleCheckBoxChange = (isChecked, id) => {
    setSelectedItems(prevSelectedItems => {
      const newItems = isChecked
        ? [...prevSelectedItems, id]
        : prevSelectedItems.filter(itemId => itemId !== id);

      return newItems;
    });
  };

  // Remove selected items from cart and update on server
  const removeSelectedItems = async () => {
    const newCart = cart.filter(item => !selectedItems.includes(item.id));
    setCart(newCart);
    setSelectedItems([]);
    setIsSelectAll(false);
    if (user && user._id) {
      await updateUserProducts(user._id, newCart);
    }
  };

  // Handle select all items
  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = cart.map(item => item.id);
      setSelectedItems(allItemIds);
    }
  };

  // Render each cart item
  const renderCart = ({ item }) => (
    <CartRowItems
      {...item}
      id={item.id}
      hideImage={true}
      isSelected={selectedItems.includes(item.id)}
      onCheckBoxChange={handleCheckBoxChange}
    />
  );

  // Display a message if the cart is empty
  const emptyCartMessage = () => {
    if (cart.length === 0) {
      return <Text style={styles.emptyText}>{strings.empty}</Text>;
    }
    return null;
  };


  useEffect(() => {
    if (user?.id && JSON.stringify(cart) !== JSON.stringify(previousCartState)) {
      const updateCart = async () => {
        try {
          await updateUserProducts(user.id, cart);
          setPreviousCartState(cart); // Update previous cart state
        } catch (error) {
          console.error('Error updating cart on server:', error);
        }
      };

      updateCart();
    }
  }, [cart, user?.id]);

  return (
    <LinearGradient
      colors={['#6CCAFF', '#6CCAFF', '#004C99']}
      locations={[0, 0.1, 1]}
      style={styles.container}
    >
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
            iconStyle={{ borderColor: 'red' }}
            textStyle={{ textDecorationLine: 'none' }}
            text={strings.selectAll}
          />
          <TouchableOpacity
            style={styles.cleartouch}
            onPress={removeSelectedItems}
          >
            <Image source={Images.trashCan()} style={styles.trashCan} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCart}
        keyExtractor={(item) => item.id || item.productId}
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
    textShadowOffset: { width: 1, height: 1 },
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

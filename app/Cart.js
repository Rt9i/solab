import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SolabContext from '../src/store/solabContext';
import CartRowItems from '../src/Components/CartRowItems';
import Images from '../src/assets/images/images';
import {updateUserProducts} from '../src/res/api';
import CustomModal from '@/src/Components/customModal';
import Toast from 'react-native-toast-message';

const Cart = props => {
  const {
    strings,
    user,
    language,
    cart,
    removeItemFromCart,
    setCart,
    removeItem,
    delModal,
    setDelModal,
    selectedItemId,
    selectedItems,
    setSelectedItems,
  } = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');

  const [isSelectAll, setIsSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousCartState, setPreviousCartState] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getArray = () => {
    if (selectedItems <= 0) {
      return cart;
    } else {
      return selectedItems;
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;

    getArray().forEach(item => {
      const {saleAmount, salePrice, price, quantity} = item;

      const saleAmountNum = Number(saleAmount) || 0;
      const salePriceNum = Number(salePrice) || 0;
      const priceNum = Number(price) || 0;
      const quantityNum = Number(quantity) || 0;

      if (
        saleAmountNum > 0 &&
        salePriceNum > 0 &&
        quantityNum >= saleAmountNum
      ) {
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

  useEffect(() => {
    console.log(selectedItemId);

    calculateTotalPrice();
  }, [cart, selectedItems]);

  const handleCheckBoxChange = (isChecked, item) => {
    setSelectedItems(prevSelectedItems => {
      if (isChecked) {
        return [...prevSelectedItems, item];
      } else {
        return prevSelectedItems.filter(
          selectedItem => selectedItem._id !== item._id,
        );
      }
    });
  };
  const removeSelectedItems = async () => {
    if (selectedItems.length > 0) {
      // Filter out selected items from the cart
      const newCart = cart.filter(
        item =>
          !selectedItems.some(selectedItem => selectedItem._id === item._id),
      );

      // Update cart and clear selectedItems
      setCart(newCart);
      setSelectedItems([]); // Clear selected items after updating cart
      setIsSelectAll(false); // Reset select-all

      // Sync updated cart with backend if user is logged in
      if (user && user._id) {
        await updateUserProducts(user._id, newCart);
      }
    } else {
      console.log('No items selected for removal');
    }
  };

  const handleSelectAll = useCallback(() => {
    if (isSelectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart);
    }

    setIsSelectAll(!isSelectAll);
  }, [isSelectAll, cart]);
  useEffect(() => {
    console.log('selected items: ', selectedItems);
  }, [selectedItems]);

  const renderCart = ({item}) => (
    <CartRowItems
      {...item}
      id={item._id}
      hideImage={true}
      isSelected={selectedItems.some(
        selectedItem => selectedItem._id === item._id,
      )}
      onCheckBoxChange={isChecked => handleCheckBoxChange(isChecked, item)}
      img={item.img}
      key={item.productId}
    />
  );

  // Display a message if the cart is empty
  const emptyCartMessage = () => {
    if (cart.length === 0) {
      return <Text style={styles.emptyText}>{strings.empty}</Text>;
    }
    return null;
  };

  const showRemoveModal = () => {
    if (selectedItems.length > 0) {
      setModalVisible(true);
    } else {
      console.log('No items selected for removal.');
    }
  };
  const confirmRemove = () => {
    removeSelectedItems();
    setSelectedItems([]);
    setModalVisible(false);
  };

  const cancelRemove = () => {
    setModalVisible(false);
  };
  const selectAproduct = () =>
    Toast.show({
      type: 'info',
      text1: 'Please select a product',
      position: 'top',
      visibilityTime: 3000,
    });

  const checkOut = async () => {
    const orderData = {
      userId: user._id,
      items: selectedItems,
      totalPrice: totalPrice,
    };

    try {
      // await saveOrderToDatabase(orderData);
      console.log('Order placed successfully:', orderData);

      setCart([]);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleCardPress = () => {
    if (!user) {
      console.log('LOG IN RN');
      return;
    }
    if (selectedItems.length <= 0) {
      selectAproduct();
      return;
    }
    console.log('checking out ');

    // checkOut();
  };
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

        {cart.length > 0 && (
          <View style={styles.selectedDisplay}>
            <TouchableOpacity onPress={handleSelectAll} activeOpacity={1}>
              <View style={styles.insideCheck}>
                {(language === 'ar' || language === 'he') && (
                  <Text style={styles.selectAll}>{strings.selectAll}</Text>
                )}
                <BouncyCheckbox
                  isChecked={isSelectAll}
                  onPress={handleSelectAll}
                  fillColor="black"
                  checkIconColor="white"
                  style={{marginRight: -15}}
                />

                {language == 'en' && (
                  <Text style={styles.selectAll}>{strings.selectAll}</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cleartouch}
              onPress={() => handleCardPress()}>
              <Image source={Images.card()} style={styles.card} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cleartouch}
              onPress={() => showRemoveModal()}>
              <Image source={Images.trashCan()} style={styles.trashCan} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <CustomModal
        message={strings.delMessage}
        visible={modalVisible}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        loading={false}
      />
      <CustomModal
        message={strings.delMessage}
        visible={delModal}
        onConfirm={item => removeItem(selectedItemId)}
        onCancel={() => setDelModal(false)}
      />
      <FlatList
        data={cart}
        renderItem={renderCart}
        keyExtractor={item => item._id}
        ListEmptyComponent={emptyCartMessage}
        contentContainerStyle={
          cart.length === 0 ? styles.emptyCartContainer : undefined
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 40,
    height: 40,
  },
  insideCheck: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: 100,
    borderRadius: 10,
    borderWidth: 0.2,
    padding: 3,
  },

  boxCont: {
    width: 120,
  },
  selectAll: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  allTouch: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    width: 30,
    height: 30,
    tintColor: '#D9534F',
    resizeMode: 'contain',
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
    elevation: 10,

  
  },

  selectedDisplay: {
    marginTop: 10,
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginHorizontal: 30,
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    // fontFamily: 'PassionOne-Bold',
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

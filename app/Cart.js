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

const Cart = props => {
  const {strings, user, language} = useContext(SolabContext);
  const {cart, removeItemFromCart, setCart} = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousCartState, setPreviousCartState] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const calculateTotalPrice = () => {
    let total = 0;

    cart.forEach(item => {
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
    calculateTotalPrice();
  }, [cart]);

  useEffect(() => {
    setIsSelectAll(
      cart.length > 0 && cart.every(item => selectedItems.includes(item._id)),
    );
  }, [selectedItems, cart]);

  const handleCheckBoxChange = (isChecked, itemId) => {
    console.log(`Toggling item: ${itemId}`);

    setSelectedItems(prevSelectedItems => {
      const newItems = isChecked
        ? [...prevSelectedItems, itemId]
        : prevSelectedItems.filter(selectedId => selectedId !== itemId);

      console.log(`Selected Items: ${newItems}`);
      return newItems;
    });
  };

  const removeSelectedItems = async () => {
    if (selectedItems.length > 0) {
      const newCart = cart.filter(item => {
        const itemId = item._id;
        return !selectedItems.includes(itemId);
      });

      setCart(newCart);
      setSelectedItems([]);
      setIsSelectAll(false);

      if (user && user._id) {
        await updateUserProducts(user._id, newCart);
      }
    } else {
      console.log('cart is empty');
    }
  };

  const handleSelectAll = useCallback(() => {
    if (isSelectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = cart.map(item => item._id);
      setSelectedItems(allItemIds);
    }
    setIsSelectAll(!isSelectAll);
  }, [isSelectAll, cart]);

  const renderCart = ({item}) => (
    <CartRowItems
      {...item}
      id={item._id}
      hideImage={true}
      isSelected={selectedItems.includes(item._id)}
      onCheckBoxChange={handleCheckBoxChange}
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
    setModalVisible(false);
  };

  const cancelRemove = () => {
    setModalVisible(false);
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
    textShadowColor: 'grey',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
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

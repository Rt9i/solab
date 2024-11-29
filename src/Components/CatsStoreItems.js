import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';
import AddOrLess from './AddOrLess';
import Toast from 'react-native-toast-message';

const CatsStoreItems = ({selectedCategory, ...props}) => {
  const {strings, changeLanguage, user, row} = useContext(SolabContext);
  const meatImg = {
    resizeMode: 'contain',
    height: 110,
  };

  const navigation = useNavigation();
  const {
    availableStock,
    _id,
    brand,
    name,
    taste,
    price,
    img,
    hideImage,
    dis,
    productId,
    quantity,
    category,
    kg,
    searchKeys,
    saleAmount,
    salePrice,
    petType,
  } = props;
  const {cart, setCart, addItemToCart, rows} = useContext(SolabContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const {isItemAdded, setIsItemAdded} = useContext(SolabContext);

  const [showRows, setShowRows] = useState(false);

  const onCardPress = () => {
    const Item = {...props};
    navigation.navigate('ProductScreen', {data: Item});
  };

  const addToShop = () => {
    const Item = {...props};
    addItemToCart(Item, Item.productId);
    Toast.show({
      type: 'success',

      text1: strings.productAdded,
      text2: strings.itemaddsucces + '!🎉',
      position: 'top', // Show toast from the top
      visibilityTime: 1000,
    });
  };
  const handleEditProducts = () => {
    navigation.navigate('EditProduct', props);
  };

  return (
    <View
      style={user?.role === 'staff' ? styles.itemWidthStaff : styles.itemWidth}>
      <View style={styles.items}>
        {user?.role == 'staff' && (
          <View style={styles.stock}>
            <Text style={styles.stocktext}>{availableStock}</Text>
          </View>
        )}
        {(availableStock === 0 || availableStock === null) && (
          <View style={styles.notavailableStock}>
            <Text style={styles.stockTxt}>Out of Stock</Text>
          </View>
        )}

        <TouchableOpacity onPress={onCardPress} activeOpacity={0.6}>
          <Image
            source={img}
            style={[
              styles.img,
              selectedCategory === 'catMeat' ? meatImg : null,
            ]}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View style={styles.bottomcontainer}>
            <Text style={styles.bottomtxt1}>{` ${taste}`}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.bottomtxt2}>
              {`${price} ${strings.priceTag}`}
            </Text>
            {kg !== 0 && <Text style={styles.bottomtxt4}>{`${kg} kg`}</Text>}
          </View>
        </View>

        {user?.role === 'staff' && (
          <TouchableOpacity
            onPress={() => handleEditProducts()}
            style={styles.editButtonContainer}>
            <View style={{width: 50, height: 50}}>
              <Image source={Images.edit()} style={styles.edit} />
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.center}>
          <TouchableOpacity activeOpacity={0.7} onPress={addToShop}>
            <View style={styles.cart}>
              <Image source={Images.addCart()} style={styles.addCart} />
              <Text style={styles.carttxt}>{strings.addToCart}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {saleAmount > 0 && (
        <View style={styles.sale}>
          <View style={styles.saleLabel}>
            <Text style={styles.saleText}>
              {saleAmount} = {salePrice} {strings.priceTag}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CatsStoreItems;

const styles = StyleSheet.create({
  rowsContainer: {
    position: 'relative',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,

    zIndex: 5,
  },
  rowItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  stocktext: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 16,
  },
  stock: {
    zIndex: 4,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  editButtonContainer: {
    zIndex: 5,
    width: 30,
    height: 30,
    marginBottom: 15,
  },
  stockTxt: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  notavailableStock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemWidthStaff: {
    width: 140,
    height: 290,
    marginBottom: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  edit: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    zIndex: 1,
    position: 'absolute',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4, // Higher than the notavailableStock
    position: 'relative', // Ensure it has positioning context
  },

  sale: {
    position: 'absolute',
    top: 10,
    right: 70, // Adjust to position it within the frame
    width: 89, // Adjust to fit within the item frame
    height: 20, // Adjust to fit within the item frame
    backgroundColor: '#D9534F',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    overflow: 'hidden',
    zIndex: 1,
  },
  saleLabel: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  saleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    // fontFamily: 'bigFont',
    transform: [{rotate: '-45deg'}],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkMark: {
    backgroundColor: 'grey',
    width: 40,
    height: 39,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },
  addCart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    zIndex: 20,
  },
  itemWidth: {
    width: '100%',
    height: '100%',
    marginBottom: 2,
    borderRadius: 5,
  },
  items: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(20, 70, 200, 0.1)',

    overflow: 'hidden', // Ensure content doesn't overflow
  },
  img: {
    marginTop: 15,
    resizeMode: 'contain',
    width: '100%',
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  infoContainer: {
    padding: 8,
    flex: 1,
  },
  bottomcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '70%',
  },
  bottomtxt1: {
    fontSize: 10,
    textAlignVertical: 'center',
    // fontFamily: 'bigFont',
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomtxt2: {
    fontSize: 12,
    textAlignVertical: 'center',
    // fontFamily: 'bigFont',
    color: 'black',
  },
  bottomtxt4: {
    fontSize: 12,
    textAlignVertical: 'center',
    // fontFamily: 'bigFont',
    color: 'black',
    marginLeft: 5,
  },
  props: {
    flex: 1,
    height: 55,
    width: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cart: {
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderWidth: 0.3,
    borderColor: 'black',
    flexDirection: 'row',
    marginBottom: 5,
    height: 22,
    width: 120,
    alignItems: 'center',
    bottom: 10,
    zIndex: 20,
  },
  carttxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22,
  },
});

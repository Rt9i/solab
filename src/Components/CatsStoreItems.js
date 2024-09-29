import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';
import AddOrLess from './AddOrLess';

const CatsStoreItems = ({selectedCategory, ...props}) => {
  const {strings, changeLanguage} = useContext(SolabContext);
  const meatImg = {
    resizeMode: 'contain',
    height: 110,
  };

  const navigation = useNavigation();
  const {
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
    saleAmount,
    salePrice,
    petType,
  } = props;
  const {cart, setCart, handleAddItem, addItem} = useContext(SolabContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const {isItemAdded, setIsItemAdded} = useContext(SolabContext);
  const {removeItem} = useContext(SolabContext);

  // useEffect(() => {
  //   const isInCart = cart.some(item => item.productId === id);
  //   console.log("isincarto: ",isInCart);
  //   setIsAddedToCart(isInCart);
  // }, [cart]);

  const onCardPress = () => {
    const Item = {...props};
    console.log('====================================');
    console.log('produt id man :', productId);

    console.log('====================================');
    navigation.navigate(ScreenNames.ProductScreen, {data: Item});
  };

  // const addToShop = () => {
  //   const Item = {...props};
  //   addItem(Item, Item.productId);
  // };

  return (
    <View style={styles.itemWidth}>
      <View style={styles.items}>
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
            <Text
              style={styles.bottomtxt2}>{`${price} ${strings.priceTag}`}</Text>
            {kg && <Text style={styles.bottomtxt4}>{` ${kg} kg`}</Text>}
          </View>
        </View>

        <View style={styles.center}>
          <TouchableOpacity activeOpacity={0.7} onPress={onCardPress}>
            <View style={styles.cart}>
              <Image source={Images.addCart()} style={styles.addCart} />
              <Text style={styles.carttxt}>{strings.addToCart}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {saleAmount && (
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'bigFont',
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
  },
  itemWidth: {
    width: 140,
    height: 250,
    marginBottom: 2,
    borderRadius: 5, // Added border radius to the item frame
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  items: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: 'rgba(20, 70, 200, 0.1)',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
    fontFamily: 'bigFont',
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
    fontFamily: 'bigFont',
    color: 'black',
  },
  bottomtxt4: {
    fontSize: 12,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
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

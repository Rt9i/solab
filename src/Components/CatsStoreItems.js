import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../routes/ScreenNames'
import strings from '../res/strings'
import SolabContext from '../store/solabContext'
import Images from '../assets/images/images'

strings
const CatsStoreItems = ({ selectedCategory, ...props }) => {
  const meatImg = {
    resizeMode: 'contain',

    height: 160,

  };

  const navigation = useNavigation();
  const { brand, name, taste, price, img, hideImage, dis, id, quantity: initialQuantity, category } = props;
  const { cart, setCart } = useContext(SolabContext);
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { isItemAdded, setIsItemAdded } = useContext(SolabContext);
  const { removeItem } = useContext(SolabContext);
  useEffect(() => {
    const isInCart = cart.some(item => item.id === id);
    setIsAddedToCart(isInCart);
  }, [cart]);


  const onCardPress = () => {
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };

  const addToShop = () => {
    const Item = { ...props };

    const existingCartItem = cart.find((cartItem) => cartItem.id === id);
    if (isAddedToCart) {
      if (isAddedToCart) {
        console.log("is added to the cart" + isAddedToCart)
        // Alert.alert(
        //   'Remove Item',
        //   'Are you sure you want to remove this item?',
        //   [
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {
        //       text: 'Remove',
        //       onPress: () => removeItem(id),
        //     },
        //   ]
        // );
        removeItem(id)

      }

    } else {

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        setCart([...cart]);
        console.log(existingCartItem.quantity);
      } else {
        Item.quantity = quantity;
        const updatedCart = [...cart, Item];
        setCart(updatedCart);
        console.log(Item.quantity);
      }
    }


    setIsAddedToCart(true);

  };



  return (
    <View style={styles.itemWidth}>


      <View style={styles.disContainer}>
        <Text style={styles.dis}>{`${dis}`}</Text>
      </View>


      <View style={styles.items}>

        <View style={styles.photo}>
          <TouchableOpacity onPress={onCardPress} activeOpacity={0.6}>
            <Image
              source={props.img}
              style={[styles.img, selectedCategory === 'Meat' ? meatImg : null]}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.bottomcontainer}>

          <TouchableOpacity activeOpacity={0.7} onPress={addToShop}>
            <View style={styles.cart}>
              {isAddedToCart ? (
                <Image source={Images.checkMark()} style={styles.checkMark} />
              ) : (
                <Image source={Images.addCart()} style={styles.addCart} />
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.props}>
            <Text style={styles.bottomtxt1}>{` ${taste}`}</Text>
            <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

export default CatsStoreItems

const styles = StyleSheet.create({
  checkMark: {
    backgroundColor: 'grey',
    width: 40,
    height: 39,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },
  addCart: {
    backgroundColor: 'grey',
    width: 40,
    height: 39,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },
  disContainer: {
    flex: 2,
  },
  itemWidth: {
    paddingTop: 10,

    flexDirection: 'row-reverse',
    marginBottom: 2,
  },
  disbox: {
    flex: 2,
    height: '100%',

  },
  dis: {
    width: '100%',
    height: 200,
    fontFamily: 'bigFont',
    color: '#9e978e',
    backgroundColor: '#393939',
    fontSize: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

  },
  itemsContainer: {
    backgroundColor: '#3F3F3F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    flexWrap: 'wrap',
  },
  items: {

    flexDirection: 'column',
    height: 200,
    width: 110,
  },
  topContainer: {
    flexDirection: 'row',
  },
  img: {

    width: 110,
    height: 155,

    borderRadius: 10,

  },
  bottomcontainer: {
    flex: 1.2,
    flexDirection: 'row-reverse',
  },
  bottomtxt1: {
    flex: 1,
    paddingBottom: 2,
    backgroundColor: 'grey',
    fontSize: 10,
    textAlignVertical: 'center',
    backgroundColor: 'grey',
    fontFamily: 'bigFont',
    borderWidth: 1,
    color: 'black',
  },

  bottomtxt2: {
    flex: 1,
    fontSize: 12,
    backgroundColor: 'grey',
    textAlignVertical: 'center',
    backgroundColor: 'grey',
    fontWeight: 'bold',
    borderWidth: 1,
    color: 'black',
  },

  props: {
    flex: 1,
    flexDirection: 'column',
  },

  cart: {
    flex: 1,
    width: 40,
  },
  carttxt: {
    fontSize: 46,
    fontFamily: 'bigFont',
    color: 'black',
    backgroundColor: '#595552',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 58,
  },

  photo: {
    flex: 5,


  },

})
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../routes/ScreenNames'
import strings from '../res/strings'
import SolabContext from '../store/solabContext'
import Images from '../assets/images/images'
import AddOrLess from './AddOrLess'
strings
const CatsStoreItems = ({ selectedCategory, displayMode, ...props }) => {
  const meatImg = {
    resizeMode: 'contain',
    height: 110,
  };

  const navigation = useNavigation();
  const { brand, name, taste, price, img, hideImage, dis, id, quantity, category } = props;
  const { cart, setCart, handleAddItem, addItem } = useContext(SolabContext);
  // const [quantity, setQuantity] = useState(initialQuantity || 1);
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

    addItem(Item, Item.id)

  };




  return (
    <View style={styles.itemWidth}>


      <View style={styles.items}>

        <View style={styles.photo}>
          <TouchableOpacity onPress={onCardPress} activeOpacity={0.6}>
            <Image
              source={props.img}
              style={[styles.img, selectedCategory === 'catMeat' ? meatImg : null]}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.bottomcontainer}>


          <View style={styles.props}>
            <Text style={styles.bottomtxt1}>{` ${taste}`}</Text>
            <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
          </View>


          <TouchableOpacity activeOpacity={0.7} onPress={addToShop}>
            <View style={styles.cart}>
              {isAddedToCart ? (
                <AddOrLess itemId={id} Item={props} />

              ) : (
                <Image source={Images.addCart()} style={styles.addCart} />
              )}
            </View>
          </TouchableOpacity>


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
    width: 110,
    height: 20,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },
  disContainer: {
    width: 250,

  },
  itemWidth: {
    width: 115,
    height: 250,
    flexDirection: 'row-reverse',
    marginBottom: 2,

    marginHorizontal: 2,

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
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'column',
    height: 220,
    width: 110,
    marginRight: 5,
    backgroundColor: 'rgba(20, 70, 200, 0.1)',

  },
  topContainer: {
    flexDirection: 'row',
  },
  img: {
    resizeMode: 'contain',
    width: 110,
    height: 110,

    borderRadius: 10,

  },
  bottomcontainer: {
    flex: 3.5,
    flexDirection: 'column',
   
    alignItems: 'center',

  },
  bottomtxt1: {
    paddingBottom: 2,
    fontSize: 10,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
  },

  bottomtxt2: {
    paddingBottom: 2,
    fontSize: 12,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
    bottom: 1,

  },

  props: {
    flex: 1,
    height: 55,
    width: 110,

    flexDirection: 'column',
    justifyContent: 'space-between',


  },

  cart: {

    width: 110,
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

    width: '100%',
    flex: 4,

  },

})
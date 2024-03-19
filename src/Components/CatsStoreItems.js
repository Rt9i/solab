import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../routes/ScreenNames'
import strings from '../res/strings'
import SolabContext from '../store/solabContext'

strings
const CatsStoreItems = props => {

  const navigation = useNavigation();
  const { brand, name, taste, price, img, hideImage, dis, id, quantity: initialQuantity } = props;
  const { cart, setCart } = useContext(SolabContext);
  const [quantity, setQuantity] = useState(initialQuantity || 1);



  const checkiFCarInCart = () => {
    const carObj = cart.find((cartItem) => cartItem.id === id);
    return !!carObj;
  };


  const onCardPress = () => {
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };

  const addToShop = () => {
    const Item = { ...props };
    const existingCartItem = cart.find((cartItem) => cartItem.id === id);

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
  };

  const alertAdd = () => {

    Alert.alert(
      'Add to cart',
      `${brand} ${price} ${strings.priceTag}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add', onPress: () => {

            Alert.alert(
              'Item Added',
              `${brand} ${price} ${strings.priceTag} added to the cart`
            );
            addToShop();

          }
        },
        { text: 'Add more', onPress: () => onCardPress() },
      ]
    );



  }

  return (
    <View style={styles.items}>
      <View style={styles.photo}>
        <TouchableOpacity onPress={onCardPress}>
          {<Image source={img} style={styles.img} />}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomcontainer}>

        <TouchableOpacity onPress={alertAdd}>
          <View style={styles.cart}>
            <Text style={styles.carttxt}>+</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.props}>
          <Text style={styles.bottomtxt1}>{` ${taste}`}</Text>
          <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
        </View>
      </View>
    </View>
  )
}

export default CatsStoreItems

const styles = StyleSheet.create({
  disbox: {
    flex: 2,
    height: '100%',
    backgroundColor: 'grey',
  },
  dis: {
    width: 280,
    height: 200,
    fontWeight: 'bold',
    color: '#9e978e',
    backgroundColor: '#393939',
    fontSize: 15,
    borderBottomWidth: 2,
    borderColor: 'black',
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
    backgroundColor: 'grey',
    flexDirection: 'column',
    height: 200,
    width: 100,
  },


  topContainer: {
    flexDirection: 'row',
  },


  img: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
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
    backgroundColor: 'black',
  },

})
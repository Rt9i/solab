import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';

import SolabContext from '../store/solabContext';


const CartItems = props => {

  const Item = { ...props };
  const { brand, name, taste, price, img, hideImage, dis, id, onRemove, initialQuantity, quantity } = props;
  const { addItem, removeItemFromCart, checkRemoveItem } = useContext(SolabContext);
  const navigation = useNavigation();


  const onCardPress = () => {
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };


  return (

    <View style={styles.container}>
      <View style={styles.itemcontainer}>
        <Text style={styles.dis}>{`${dis}`}</Text>
        <View style={styles.addOrLesscont}>
          <View style={styles.addOrLess}>
            <TouchableOpacity onPress={() => addItem(Item, id)} style={styles.pluscontainer}>
              <View style={styles.plus}>
                <Text style={styles.plus}>+</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.input}>{quantity}</Text>
            <TouchableOpacity onPress={() => removeItemFromCart(Item, id)} style={styles.minuscontainer}>
              <View style={styles.minus}>
                <Text style={styles.minus}>-</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.X}>
            <TouchableOpacity onPress={() => checkRemoveItem(Item, id)} style={styles.Xtouch}>
              <Text style={styles.xtxt}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.items}>

        <View style={styles.photo}>
          <TouchableOpacity onPress={onCardPress}>
            {<Image source={img} style={styles.img} />}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomcontainer}>
          <View style={styles.props}>
            <Text style={styles.bottomtxt1}>{` ${brand}`}</Text>
            <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
          </View>
        </View>

      </View>
    </View>

  );
};

export default CartItems;

const styles = StyleSheet.create({
  Xtouch: {
    height: 50

  },
  xtxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'brown',
    lineHeight: 25,
  },
  X: {
    marginLeft: 40,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 20,

  },
  addOrLesscont: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',


  },
  input: {
    width: 30,
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'black',
  },
  pluscontainer: {
    width: 20,

  },
  minuscontainer: {
    width: 20,

  },
  minus: {
    fontFamily: 'bigFont',
    fontSize: 25,
    alignContent: 'center',
    backgroundColor: 'red',
    lineHeight: 41,

    color: 'white',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  plus: {

    textAlign: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: 'bigFont',
    fontSize: 25,
    alignContent: 'center',
    backgroundColor: 'green',
    lineHeight: 41,
    color: 'white',
  },
  addOrLess: {
    flexDirection: 'row',
    marginRight: 50,
    padding: 1,
    borderRadius: 20,
    height: 40,
    width: 72,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemcontainer: {
    flex: 2.6,
    backgroundColor: '#3B3B3B',
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  dis: {
    fontFamily: 'bigFont',
    fontSize: 10,
    width: 165,


  },

  quantity: {
    textAlign: 'center',
    height: 20,
    color: 'white',
  },
  bottomtxt1: {
    flex: 1,
    backgroundColor: 'grey',
    textAlignVertical: 'center',
    backgroundColor: 'grey',
    fontFamily: 'bigFont',
    borderWidth: 1,
    color: 'black',
  },
  bottomtxt2: {
    flex: 1,
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

  carttxt: {
    flex: 2,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'purple',
    textAlign: 'center',

    alignItems: 'center',


  },
  cart: {
    flex: 1,
    width: 40,

  },
  bottomcontainer: {
    flex: 1.2,
    flexDirection: 'row-reverse',

  },
  items: {
    flex: 1,
    flexDirection: 'column',
    width: 110,
  },
  photo: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 5,
    paddingBottom: 1,
    backgroundColor: 'black',
  },
  store: {
    flex: 18,

    flexDirection: 'column',



  },

  container: {
    margin: 5,
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row-reverse',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  img: {
    borderTopLeftRadius: 10,
    width: 100,
    height: 130,

  },
})
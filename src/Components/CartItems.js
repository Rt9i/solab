import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';


const CartItems = props => {
  const Item = { ...props };
  const { brand, name, taste, price, img, hideImage, dis, id, onRemove, initialQuantity,quantity } = props;

  const navigation = useNavigation();

  const onCardPress = () => {
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };
 const renderCartItem = () => {
  return (
    <View style={styles.items}>

      <View style={styles.photo}>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={onCardPress}>
          {<Image source={img} style={styles.img} />}
        </TouchableOpacity>
      </View>

      <View style={styles.bottomcontainer}>

        <TouchableOpacity activeOpacity={0.5} onPress={() => onRemove(id)}>
          <View style={styles.cart}>
            <Text style={styles.carttxt}>-</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.props}>
          <Text style={styles.bottomtxt1}>{` ${brand}`}</Text>
          <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
        </View>

      </View>

    </View>
  );
};

  return <View>{renderCartItem()}</View>;
};

export default CartItems;

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
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
    marginHorizontal: 2,
    flex: 5,
    backgroundColor: 'grey',
    flexDirection: 'column',
    width: 110,


  },
  photo: {

    flex: 5,

    backgroundColor: 'black',
  },
  store: {
    flex: 18,
    backgroundColor: 'grey',
    flexDirection: 'column',



  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3B3B3B',
  },

  img: {

    width: 100,
    height: 130,
    backgroundColor: 'black',
  },
})
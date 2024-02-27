import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import { Items } from '../res/Data';


const Cart = props => {
  const navigation = useNavigation();
  const { brand, name, taste, price, img, hideImage } = props; 
  const product = props.route.params.data;

  const onCardPress =() =>{
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };

  console.log("product:", product)
  return (

    <View style={styles.container}>
 

      <TouchableOpacity >
        <Text style={styles.purchase}>Purchase</Text>
      </TouchableOpacity>

      <View style={styles.items}>

        <View style={styles.photo}>
          <TouchableOpacity onPress={onCardPress}>
            {!hideImage && <Image source={product.img} style={styles.img} />}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomcontainer}>

          <TouchableOpacity>
            <View style={styles.cart}>
              <Text style={styles.carttxt}>-</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.props}>
            <Text style={styles.bottomtxt1}>{` ${product.brand}`}</Text>
            <Text style={styles.bottomtxt2}>{` ${product.taste}`}</Text>
          </View>

        </View>

      </View>
    </View>


  )
}

export default Cart

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    lineHeight: 40,
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
    margin: 5,
    flex: 5,
    backgroundColor: 'grey',
    flexDirection: 'column',
    marginBottom: 100,
    width: 100,
    marginBottom: 550,

  },
  photo: {

    flex: 5,

    backgroundColor: 'black',
  },

  purchase: {
    flex: 1,
    borderWidth: 1,
    width: 100,
    fontSize: 20,
    paddingTop: 30,
    paddingBottom:10,
    lineHeight:1,
    borderRadius: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'orange',

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

    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },


})
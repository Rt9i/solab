import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CartItems = () => {
  const renderCartItem = () => {
    const CatsStoreItems = Items.map(Items => {
     
      return (
        
        <Items
          key={Items.id}
          brand={Items.brand}
          taste={Items.taste}
          img={Items.img}
          dis={Items.dis}
        />

      );

    });

    return renderCartItem;
  };
  return (
    <View>
      
      

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

export default CartItems

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
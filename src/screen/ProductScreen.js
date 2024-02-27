import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CatsStoreItems from '../Components/CatsStoreItems';
import { Items } from '../res/Data';
import Images from '../assets/images/images';


const ProductScreen = props => {
  const product = props.route.params.data;

  const [ammount, setAmmount] = useState(0);

  const onAddPress = () => {
    setAmmount(ammount + 1);
    console.log(ammount)
  }
  const onRemovePress = () => {
    if (ammount > 0) {

      setAmmount(ammount - 1);

    } else {
      Alert.alert('zero is the min')
    }

    console.log(ammount)
  }


  console.log("product:", product)
  return (
    <View style={styles.container}>
      <Image source={product.img} style={styles.image} />
      <Text style={styles.title}>{`${product.brand} ${product.taste}`}</Text>
      <Text style={styles.dis}>{`${product.dis}`}</Text>

      <View style={styles.bottomcomp}>

        <View style={styles.addToCart}>
        <Text style={styles.addToCartTxt}>Add to cart</Text>

        </View>
        <View style={styles.addOrRemove}>

          <TouchableOpacity style={styles.plusTouch} onPress={onAddPress}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>

          <Text style={styles.theAmmount}>{ammount}</Text>

          <TouchableOpacity style={styles.minusTouch} onPress={onRemovePress}>
            <Text style={styles.minus}>-</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 340,
    resizeMode: 'contain',
    backgroundColor: "black",
    borderRadius: 100,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    borderWidth: 2,
    marginLeft: 50,
    borderRadius: 50,
    borderWidth: 3,
    height: 60,
    width: 300,
  },
  dis: {
    fontSize: 20,

    borderRadius: 10,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'grey',
  },
  addOrRemove: {

    flexDirection: 'row',
    borderWidth: 4,
    width: 200,
    borderRadius: 20,
    paddingRight: 15,
  },
  plus: {
    fontSize: 45,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    backgroundColor: 'green',
    borderRadius: 20,
    lineHeight: 39,
    marginTop: 20,
    width: 25,
    height: 25,
  },
  minus: {
    fontSize: 50,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    backgroundColor: 'red',
    borderRadius: 20,
    lineHeight: 37,
    marginTop: 25,
    width: 19,
    height: 20,

  },

  theAmmount: {
    fontSize: 45,
    marginLeft: 15,
    color: 'black',
    fontWeight: 'bold',
  },

  plusTouch: {

    height: 60,
    marginTop: 10,
    marginLeft: 10,
    paddingRight: 50,
    width: 20,
    borderRadius: 50,
  },

  minusTouch: {

    height: 60,
    marginTop: 10,
    marginLeft: 10,
    paddingRight: 50,
    width: 20,
    borderRadius: 50,
  },
  bottomcomp: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column-reverse',
  },
  addToCart: {
borderRadius:1,


  },
  addToCartTxt:{
  fontSize:30,
  color:'black',
  fontWeight:'bold',
  borderWidth:1,
  borderRadius:10,
  padding:2,
  backgroundColor:'grey',
  margin:5,
  },
})
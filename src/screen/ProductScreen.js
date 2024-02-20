import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StoreItems from '../Components/StoreItems';

const ProductScreen = (props) => {
    const car = props.route.params.StoreItems;
    console.log("cars:",StoreItems)
  return (
    <View>
      <Text>ProductScreen</Text>
      <Image />
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})
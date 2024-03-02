import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import Item from '../Components/CatsStoreItems'
import { Items } from '../res/Data';
import CartItems from '../Components/CartItems';


const Cart = props => {
  const navigation = useNavigation();
  const renderItem = () => {
    const CatsStoreItems = Items.map(Items => {

      return(null);

    });

    return CatsStoreItems;
  };


  return (

    <View style={styles.container}>
      <TouchableOpacity >
        <Text style={styles.purchase}>Purchase</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.itemsContainer}>{renderItem()}</View>
      </ScrollView>
    </View>


  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
  },

  itemsContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  purchase: {
    flex: 1,
    borderWidth: 1,
    width: 100,
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
    lineHeight: 1,
    borderRadius: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'orange',

  },


})
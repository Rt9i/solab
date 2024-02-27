import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Item from '../Components/CatsStoreItems'
import { Items } from '../res/Data'

const CatsStore = () => {
  const renderItem = () => {
    const CatsStoreItems = Items.map(Items => {
      return (

        <Item
          brand={Items.brand}
          taste={Items.taste}
          img={Items.img}
          dis={Items.dis}
        />
        





      );

    });

    return CatsStoreItems;
  };
  return (
    <View style={styles.container}>

      <View style={styles.selectBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={null} >
            <Text style={styles.food}>Food</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={null} >
            <Text style={styles.accessories}>Accessories</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={null} >
            <Text style={styles.clothes}>Clothes</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={null} >
            <Text style={styles.clothes}>bug sprays</Text>
          </TouchableOpacity>

        </ScrollView>




      </View>

      <View style={styles.itemsContainer}>
        <ScrollView>
          <View>{renderItem()}</View>
        </ScrollView>



      </View>
    </View>
  )
}

export default CatsStore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#518CFF',
  },

  selectBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#518CFF',

  },
  itemsContainer: {
    flex: 9,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#3F3F3F',
    paddingleft: 10,
  },
  items: {

    flexDirection: 'column',
    backgroundColor: 'grey',
    marginLeft: 4,
    marginTop: 5,
    height: 200,
    width: 125,
  },
  food: {
    backgroundColor: 'lime',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  accessories: {
    backgroundColor: 'cyan',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  clothes: {
    backgroundColor: 'cyan',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,

  },
  image: {


  },
  imgtxt: {
    flex: 1,
    color: 'white',
    padding: 10,
    backgroundColor: 'black',
    height: 40,

  },

  bottomtxt: {
    flex: 1,

    backgroundColor: 'grey',

  },
})
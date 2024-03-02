import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Item from '../Components/CatsStoreItems'
import { Items } from '../res/Data'
import Images from '../assets/images/images'
import { useState } from 'react';

const CatsStore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const renderBar = () => {
    const categories = [
      { id: 1, name: 'Food', image: Images.catFood() },
      { id: 2, name: 'Leash', image: Images.leash() },
      { id: 3, name: 'Clothes', image: Images.catClothes() },
      { id: 4, name: 'Bug Sprays', image: Images.spray() },
    ];
    return (
      <View style={styles.topBar}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              { backgroundColor: selectedCategory === category.id ? '#907761' : '#69503c' },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  const renderItem = () => {
    const CatsStoreItems = Items.map(Items => {

      return (

        <Item
          key={Items.id}
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


      <View style={styles.topBar}>
        {renderBar()}

      </View>





      <View style={styles.itemsContainer}>

        <ScrollView>
          <View style={styles.eachitem}>{renderItem()}</View>
        </ScrollView>

      </View>
    </View>
  )
}

export default CatsStore

const styles = StyleSheet.create({
  topBar: {
    height: 60,
    marginTop:15,
    marginBottom:10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 1,

  },
  category: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

  },
  categoryText: {
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#69503c',
  },
  selectBar: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#69503c',
  },
  eachitem: {
    flexDirection: 'column',
  },
  itemsContainer: {
    flex: 9,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#3F3F3F',
  },
  items: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    height: 200,
    width: 125,
  },
  food: {
    backgroundColor: '#553d2a',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  accessories: {
    backgroundColor: '#907761',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  clothes: {
    backgroundColor: '#907761',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  image: {},
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
});

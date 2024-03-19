import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import Cart from './Cart';

const CatsStore = () => {
  const { getCategoryItems } = getCategoryItemsData();
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const filteredItems = getCategoryItems(selectedCategory);



  const renderBar = () => {
    const categories = [
      { id: 'Food', name: 'Food', image: Images.catFood() },
      { id: 'Leash', name: 'Leash', image: Images.leash() },
      { id: 'Clothes', name: 'Clothes', image: Images.catClothes() },
      { id: 'Sprays', name: 'Sprays', image: Images.spray() },
    ];

    return (
      <View style={styles.topBar}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              { backgroundColor: selectedCategory === category.id ? '#4e5e7f' : '#7391c8' },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.upper}>

          <View style={styles.loggo}>
            <Image source={Images.blackLoggo()} style={styles.image} />
          </View>

          <View style={styles.solab}>
            <View style={styles.row}>
              <Text style={styles.solabText}>solab</Text>
              <Text style={styles.groomingText}> Grooming</Text>
            </View>
            <View style={styles.bottomLine}></View>
          </View>

        </View>

        <View style={styles.topBar}>{renderBar()}</View>


        <View style={styles.sale}>
          <Image source={Images.litterSale()} style={styles.saleimg} />
          <Image source={Images.premioSale()} style={styles.saleimg} />
        </View>

        <View style={styles.display}>
          <View style={styles.itemscontainer}>
            <FlatList
              data={filteredItems}
              renderItem={({ item }) => (
                <CatsStoreItems
                  key={item.id}
                  brand={item.brand}
                  taste={item.taste}
                  img={item.img}
                  dis={item.dis}
                  price={item.price}
                  id={item.id}
                  quantity={item.quantity}


                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default CatsStore

const styles = StyleSheet.create({
  food: {
    fontFamily: 'bigFont',
    fontSize: 40,
  },
  saleimg: {
    height: 130,
    width: '50%',
    resizeMode: 'contain',
  },
  sale: {
    flex: 1,
    flexDirection: 'row',
    height: 130,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,

  },
  itemscontainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  display: {
    flex: 8,
    width: 390,
    marginLeft: 10,
    flexDirection: 'row',
    padding: 2,

  },
  bottomLine: {
    height: 5,
    width: 270,
    borderBottomWidth: 3,
    marginBottom: 45,
  },
  image: {
    width: 55,
    height: 55,

  },
  upper: {
    flex: 1,
    flexDirection: 'row',

    marginTop: 5,
  },
  loggo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 100,
    paddingBottom: 40,
    marginLeft: 20,
  },
  solab: {
    flex: 1,
    height: 99,
    width: 260,
    marginRight: 40,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',


  },
  solabText: {
    color: '#00B9F4',
    fontFamily: 'bigFont',
    fontSize: 30,
  },
  groomingText: {
    color: 'black',
    fontFamily: 'bigFont',
    fontSize: 30,
  },
  topBar: {
    height: 50,
    width: 330,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    flex: 1,
    borderWidth: 2,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 50,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
  categoryText: {
    color: 'black',
    fontFamily: 'smallFont',
    
  },
  container: {


    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4c6a92',
  },
  selectBar: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  eachitem: {
    flexDirection: 'column',
    width: 100,
    height: 100,
  },
  itemsContainer: {
    flex: 1,
    height: 200,
    width: 100,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  items: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    height: 200,
    width: 100,
  },
  food: {

    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  accessories: {

    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  clothes: {

    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    marginLeft: 5,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
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
});

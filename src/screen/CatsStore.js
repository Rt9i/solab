import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';


const CatsStore = () => {
  const { getCategoryItems } = getCategoryItemsData();
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const filteredItems = getCategoryItems(selectedCategory);
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('column');


  const rowOrcolumn = () => {
    return (
      <View style={styles.choiceDisplay}>

        <Text style={styles.displaytxt}>{strings.display}</Text>

        <View style={styles.rowOrcolumn}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setDisplayMode('row')} style={[styles.rowItems, { backgroundColor: displayMode === 'row' ? '#4e5e7f' : '#7391c8' }]} >

            <View style={styles.rowbox}>
              <View style={styles.row}>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>

              </View>
              <View style={styles.row}>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>

              </View>
            </View>

          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => setDisplayMode('column')} style={[styles.column, { backgroundColor: displayMode === 'column' ? '#4e5e7f' : '#7391c8' }]}>

            <View style={styles.columnbox}>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>

              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>

              </View>
            </View>

          </TouchableOpacity>
        </View>

      </View>

    )



  }
  const showImage = () => {
    return (
      <Image source={Images.photo()} style={styles.smallimg} />
    )


  }
  const renderItem = ({ item }) => (
    <CatsStoreItems
      key={item.id}
      brand={item.brand}
      taste={item.taste}
      img={item.img}
      dis={item.dis}
      price={item.price}
      id={item.id}
      quantity={item.quantity}
      displayMode={displayMode}
    />
  );
  const renderBar = () => {
    const categories = [
      { id: 'Food', name: `${strings.DryFood}`, image: Images.catFood() },
      { id: 'Meat', name: `${strings.meat}`, image: Images.Meat() },
      { id: 'Leash', name: `${strings.leash}`, image: Images.leash() },
      { id: 'Clothes', name: `${strings.Clothes}`, image: Images.catClothes() },
      { id: 'Sprays', name: `${strings.Sprays}`, image: Images.spray() },

    ];

    return (
      <View style={styles.topBar}>
        {categories.map((category) => (
          <TouchableOpacity
            activeOpacity={0.8}
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
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.touch}>
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
        </TouchableOpacity>
        <View style={styles.topBar}>{renderBar()}</View>


        <View style={styles.sale}>
          <Image source={Images.litterSale()} style={styles.saleimg} />
          <Image source={Images.premioSale()} style={styles.saleimg} />
        </View>

        <View >
          {rowOrcolumn()}

        </View>


        <View style={styles.display}>
          <View style={styles.itemscontainer}>
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              key={displayMode}
              keyExtractor={(item) => item.id}
              numColumns={displayMode === 'row' ? 3 : 1}
              scrollEnabled={false}
              contentContainerStyle={{ marginHorizontal: 2 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



export default CatsStore

const styles = StyleSheet.create({
  displaytxt: {
    fontFamily: 'bigFont',
    color: "white",
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  choiceDisplay: {
    borderTopRightRadius: 10,
    borderTopLeftRadius:10,

    borderWidth: 2,
    marginLeft: 20,
    height: 70,
    width: 88,
    backgroundColor: 'grey',
  },
  smalltxt: {
    fontSize: 8,
    fontFamily: 'smallFont',

  },
  columnbox1: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 2,
  },
  smallimg: {
    height: 10,
    width: 10,
  },
  box1: {
    width: 10,
    height: 10,
    marginTop: 5,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },
  box2: {
    width: 10,
    height: 10,
    marginTop: 20,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },

  rowbox: {
    flexDirection: 'column',

  },
  columnbox: {
    flexDirection: 'column',

  },
  touch: {

    height: 70,
  },
  column: {
    marginLeft: 0.2,
    backgroundColor: 'grey',
    width: 40,
    height: 40,
    borderWidth: 2,
  },
  rowItems: {
    fontSize: 20,
    borderWidth: 2,
    backgroundColor: 'black',
    width: 44,
    height: 40,

  },
  rowOrcolumn: {
    width: 200,
    flex: 1,
    flexDirection: 'row',
  },
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
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  display: {
    flex: 8,
    width: 360,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    padding: 2,
    backgroundColor: 'grey',
    borderWidth: 3,
    marginRight: 50,
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
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },


  groomingText: {
    color: 'black',
    fontFamily: 'bigFont',
    fontSize: 30,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  topBar: {
    height: 50,
    width: 340,
    marginTop: 15,
    marginLeft: 14,
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
    marginRight: 5,
    paddingTop: 8,
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
    backgroundColor: '#84a1d2',
    width: 68,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 1,
  },
  container: {


    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6CCAFF',
  },
});

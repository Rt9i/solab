import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';


const CatsStore = () => {
  const { getCategoryItems } = getCategoryItemsData();
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const filteredItems = getCategoryItems(selectedCategory);
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');


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
      selectedCategory={selectedCategory}

    />

  );
  const renderBar = () => {
    const accessoriesStyle = {
      borderWidth: 1,
      fontSize: 10,

    };
    const meatImg = {
      width: 50,
      height: 140,

    };

    const categories = [
      { id: 'Food', name: `${strings.DryFood}`, image: Images.catFood() },
      { id: 'Meat', name: `${strings.meat}`, image: Images.Meat() },
      { id: 'Leash', name: `${strings.accessories}`, image: Images.leash() },
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
            <Text style={[styles.categoryText, category.id === 'Leash' ? accessoriesStyle : null]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ScreenNames.home)} style={styles.touch}>
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


        <View style={styles.sale}>
          <Text style={styles.saletxt}>Sale</Text>
          <View style={styles.salecontainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <Image source={Images.litterSale()} style={styles.saleimg2} />
              <Image source={Images.premioSale()} style={styles.saleimg} />
              <Image source={Images.premioSale()} style={styles.saleimg} />
            </ScrollView>
          </View>

        </View>
        <View style={styles.topBar}>{renderBar()}</View>




        <View style={styles.selectedDisplay} >
          {rowOrcolumn()}

        </View>



        <View style={styles.itemscontainer}>

          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            key={displayMode}
            keyExtractor={(item) => item.id}
            numColumns={displayMode === 'row' ? 3 : 1}
            scrollEnabled={false}

          />
        </View>

      </ScrollView>
    </View>
  );
};



export default CatsStore

const styles = StyleSheet.create({
  accessoriesstyle: {
    fontSize: 10,
  },

  selectedDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    marginLeft: 40,



  },
  sale: {
    alignItems: 'center',


  },
  saletxt: {
    textShadowColor: 'brown',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'bigFont',
    fontSize: 20,
    color: 'red',
    backgroundColor: 'black',
    width: 200,
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 0.7,
    borderColor: 'red',

  },
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
    borderTopLeftRadius: 10,
    borderWidth: 2,

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
    marginBottom: 1,
    height: 10,
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
    marginLeft: 5,
    height: 130,
    width: 130,

  },
  saleimg2: {
    marginLeft: 5,
    height: 130,
    width: 155,

  },
  salecontainer: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    height: 130,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: 'white',

  },
  itemscontainer: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'black',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,

    paddingLeft: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  display: {
    alignItems: 'center',
    width: '100%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,

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
    fontSize: 12,
    height: 20,
    width: 68,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6CCAFF',
  },
});

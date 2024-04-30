import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData from '../res/Data';
import Images from '../assets/images/images';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import DisplayItem from '../Components/DisplayItem';
import CatsBarItems from '../Components/CatsBarItems';
import CheckOptionItems from '../Components/CheckOptionItems';
import Sizes from '../res/sizes';

const CatsStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('catFood');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedBrands, setSelectedBrands] = useState('');
  const [optionsVisible, setOptionsVisible] = useState(false);


  const getFilteredItems = () => {
    let filteredItems = getCategoryItemsData;


    filteredItems = filteredItems.filter(item =>
      item.category.includes(selectedCategory)
    );



    filteredItems = filteredItems.filter(item =>
      selectedBrands.includes(item.brand)
    );


    return filteredItems;
  };


  useEffect(() => {
    getFilteredItems()
  }, [selectedCategory], selectedBrands)

  const renderItem = ({ item }) => {
    return (
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
        category={item.category}

      />
    );
  };

  const onCategoryPress = (val) => {
    setSelectedCategory(val)
    setOptionsVisible(false)
  }

  const filteredItems = getFilteredItems();
  // console.log('filterTrueBrands:', JSON.stringify(filterTrueBrands()));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ minHeight: Sizes.screenHeight }} >


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
        {/* 
        <View style={styles.sale}>
          <Text style={styles.saletxt}>{strings.sale}</Text>
          <View style={styles.salecontainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <Image source={Images.litterSale()} style={styles.saleimg2} />
              <Image source={Images.premioSale()} style={styles.saleimg} />
              <Image source={Images.premioSale()} style={styles.saleimg} />
            </ScrollView>
          </View>
        </View> */}

        <View style={styles.CatsBarItemsContainer}>

          <CatsBarItems style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryPress} />
        </View>

        <View style={styles.selectedDisplay} >
          <View style={styles.displayer}>

            <DisplayItem
              setDisplayMode={setDisplayMode}
              displayMode={displayMode}
            />

          </View>
          <View style={styles.checkItems}>
            <CheckOptionItems
              optionsVisible={optionsVisible}
              setOptionsVisible={setOptionsVisible}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedCategory={selectedCategory}
              getFilteredItems={getFilteredItems}

            />

          </View>
        </View>

        <View style={styles.itemscontainer}>
          {filteredItems.length > 0 ? (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              key={displayMode}
              keyExtractor={(item) => item.id.toString()}
              numColumns={displayMode === 'row' ? 3 : 1}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyText}>{strings.selectABrand}</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

export default CatsStore

const styles = StyleSheet.create({
  emptyText: {
    marginTop: 150,
    marginBottom: 150,
    borderRadius: 20,
    padding: 10,
    color: 'white',
    fontFamily: 'bigFont',
    textAlign: 'center',
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  touch: {
    height: 70,
  },
  sale: {
    alignItems: 'center',
  },
  saletxt: {
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
  salecontainer: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 140,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  itemscontainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'black',
    elevation: 24,
    marginHorizontal: 10,
    borderRadius: 20,

    flex: 1,

  },
  container: {
    flex: 1,
    zIndex: 0,
    flexDirection: 'column',
    backgroundColor: '#6CCAFF',
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomLine: {
    height: 5,
    width: 270,
    borderBottomWidth: 3,
    marginBottom: 45,
  },
  saleimg2: {
    marginLeft: 5,
    height: 130,
    width: 155,
  },
  saleimg: {
    marginLeft: 5,
    height: 130,
    width: 130,
  },
  CatsBarItemsContainer: {
    justifyContent: 'center',

  },
  CatsBarItems: {
  },
  selectedDisplay: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    zIndex: 1,

    height: 'auto',

  },
  displayer: {
    width: 90,
  },
  checkItems: {

    zIndex: 1,

  },
  scroll: {


  }
});

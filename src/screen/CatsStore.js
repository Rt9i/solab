import React, { useEffect, useState } from 'react';
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

const CatsStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('catFood');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [selectedBrands, setSelectedBrands] = useState('monges');
  const [optionsVisible, setOptionsVisible] = useState(false);

  const brandsInData = getCategoryItemsData.map(item => item.brand);

  const getFilteredItems = () => {
    return getCategoryItemsData.filter(item =>
      item.category.includes(selectedCategory) && selectedBrands.includes(item.brand)
    );
  };


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
      category={item.category}
    />
  );

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

        <View style={styles.CatsBarItemsContainer}>

          <CatsBarItems style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} />
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
            />

          </View>
        </View>

        <View style={styles.itemscontainer}>
          {getFilteredItems().length > 0 ? (
            <FlatList
              data={getFilteredItems()}
              renderItem={renderItem}
              key={displayMode}
              keyExtractor={(item) => item.id}
              numColumns={displayMode === 'row' ? 3 : 1}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyText}>select a brand</Text>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

export default CatsStore

const styles = StyleSheet.create({
  emptyText: {
    height: 200,
    color: 'white',

    textAlign: 'center',
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
    elevation: 24,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingLeft: 20,

  },
  container: {
    flex: 1,
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
    marginHorizontal: 20,
  },
  CatsBarItems: {
  },
  selectedDisplay: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
  },
  displayer: {
    width: 90,
  },
  checkItems: {
    width: 90,

    marginBottom: 25,
    zIndex: 1,

  },
});

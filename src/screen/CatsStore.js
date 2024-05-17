import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData, { rowTitlesByCategory } from '../res/Data';
import Images from '../assets/images/images';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import DisplayItem from '../Components/DisplayItem';
import CatsBarItems from '../Components/CatsBarItems';
import CheckOptionItems from '../Components/CheckOptionItems';
import Sizes from '../res/sizes';
import SlideAndSnapAnimation from '../animations/SlideAndSnapAnimation';
import RowContainer from '../Components/RowContainer';
import ScrollUp from '../Components/scrollUp';

const CatsStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('catFood');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);

  const getRowFilteredItems = (value) => {
    return getCategoryItemsData.filter(
      item => item.category.includes(selectedCategory) && item.category.includes(value)
    );
  }

  const handleRows = () => {

    const rows = [
      {
        text: '',
        catMeat: 'teeeeeext',
        catAccessories: 'this is cat accesories',
        items: 'firstRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'second',
        catMeat: 'second teeeeext',
        items: 'secondRow',
        selectedCategory: 'catFood',

      },
      {
        text: 'third',
        items: 'thirdRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'fourth',
        items: 'fourthRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'fifth',
        items: 'fifthRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'sixth',
        items: 'sixthRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'seventh',
        items: 'seventhRow',
        selectedCategory: 'catFood',
      },
      {
        text: 'seventh',
        items: 'eigthRow',
        selectedCategory: 'catMeat',
      },
      {
        text: 'seventh',
        items: 'ninthRow',
        selectedCategory: 'catMeat',
      },
    ]

    

    return rows.map((row, index) => {
      return <RowContainer

        row={row}
        text={rowTitlesByCategory[selectedCategory]?.[index]}
        catMeatTxt={row.catMeat}
        items={getRowFilteredItems(row.items)}
        renderItem={renderItem}
        selectedCategory={selectedCategory}
      />
    })
  }


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


  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

  };




  return (
    <View style={styles.container}>

      <ScrollView style={styles.scroll} contentContainerStyle={{ minHeight: Sizes.screenHeight }} >


        {/* {solabTxt()} */}

        <View style={styles.sale}>
          <SlideAndSnapAnimation onScroll={handleScroll} />
        </View>

        <View style={styles.catsBarItemsContainer}>

          <CatsBarItems
            style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryPress} />
        </View>

        {handleRows()}

       
      </ScrollView>
      <ScrollUp />
    </View>
  );
};

export default CatsStore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#6CCAFF',
  },
  sale: {
    alignItems: 'center',
    height: 230,
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
  catsBarItemsContainer: {
    justifyContent: 'center',
  },
  scroll: {},
});

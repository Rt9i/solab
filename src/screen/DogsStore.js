import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Animated } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData, { rowTitlesByCategory } from '../res/Data';
import { useNavigation } from '@react-navigation/native';

import Sizes from '../res/sizes';
import SlideAndSnapAnimation from '../animations/SlideAndSnapAnimation';
import CatsBarItems from '../Components/CatsBarItems';
import ScrollUp from '../Components/scrollUp';
import RowContainer from '../Components/RowContainer';


const DogsStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('dogFood');

  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef();

  const getRowFilteredItems = (value) => {
    return getCategoryItemsData.filter(
      item => item.category.includes(selectedCategory) && item.category.includes(value)
    );
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


  const handleRows = () => {

    const rows = [
      {
        items: 'firstRow',
      },
      {
        items: 'secondRow',
      },
      {
        items: 'thirdRow',
      },
      {
        items: 'fourthRow',
      },
      {
        items: 'fifthRow',
      },
      {
        items: 'sixthRow',
      },
      {
        items: 'seventhRow',
      },
      {
        items: 'eigthRow',
      },
      {
        items: 'ninthRow',
      },
      {
        items: 'abudodorow',
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

//dog
  const dog = [
    { Food: 'dogFood' },
    { Meat: 'dogMeat' },
    { Accessories: 'dogAccessories', },
    { Clothes: 'dogClothes', },
    { Sprays: 'dogSprays', },
    { Toilet: 'dogToilet', },
    { Perfume: 'dogPerfume', },
    { Treats: 'dogTreats' },
    { bowl: 'DogBowl' },
   
  
  ];


  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollUp(scrollPosition > 250);
  };


  const handleScrollUpPress = () => {
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ minHeight: Sizes.screenHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        <View style={styles.sale}>
          <SlideAndSnapAnimation onScroll={handleScroll} />
        </View>
        <View style={styles.catsBarItemsContainer}>

          <CatsBarItems
            style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryPress}
            Array={dog }
          />


        </View>
        {handleRows()}
      </ScrollView>
      {showScrollUp && <ScrollUp scrollViewRef={scrollViewRef} onPress={handleScrollUpPress} />}
    </View>
  );
};



export default DogsStore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
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

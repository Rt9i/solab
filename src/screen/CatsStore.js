import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, Text, Button } from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData, { rowTitlesByCategory } from '../res/Data';
import { useNavigation } from '@react-navigation/native';
import CatsBarItems from '../Components/CatsBarItems';
import Sizes from '../res/sizes';
import SlideAndSnapAnimation from '../animations/SlideAndSnapAnimation';
import RowContainer from '../Components/RowContainer';
import ScrollUp from '../Components/scrollUp';
import LinearGradient from 'react-native-linear-gradient';
import SolabContext from '../store/solabContext';
import Login from './Login';
import ScreenNames from '../../routes/ScreenNames';
import { getAllUsers } from '../res/api';

const CatsStore = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('catFood');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef();


  const { strings, changeLanguage, } = useContext(SolabContext);

  const getRowFilteredItems = (value) => {
    return getCategoryItemsData.filter(
      item => item.category.includes(selectedCategory) && item.category.includes(value)
    );
  }

  const handleRows = () => {
    const rows = [
      { items: 'firstRow' },
      { items: 'secondRow' },
      { items: 'thirdRow' },
      { items: 'fourthRow' },
      { items: 'fifthRow' },
      { items: 'sixthRow' },
      { items: 'seventhRow' },
      { items: 'eigthRow' },
      { items: 'ninthRow' },
      { items: 'tenthRow' },
    ];
    return rows.map((row, index) => (
      <RowContainer
        row={row}
        text={rowTitlesByCategory[selectedCategory]?.[index]}
        catMeatTxt={row.catMeat}
        items={getRowFilteredItems(row.items)}
        renderItem={renderItem}
        selectedCategory={selectedCategory}
      />
    ))
  }
  const renderItem = ({ item }) => {
    return (
      <CatsStoreItems
        salePrice={item.salePrice}
        saleAmmount={item.saleAmmount}
        kg={item.kg}
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

  const cat = [
    { Food: 'catFood' },
    { Meat: 'catMeat' },
    { Accessories: 'catAccessories' },
    { Clothes: 'catClothes' },
    { Sprays: 'catSprays' },
    { Toilet: 'catToilet' },
    { Perfume: 'catPerfume' },
    { Treats: 'catTreats' },
    { bowl: 'catBowl' },
  ];

  return (

    <LinearGradient
      colors={['#6CCAFF', '#6CCAFF', '#0066FF']}
      locations={[0, 0.58, 1]}
      style={styles.container}
    >

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ minHeight: Sizes.screenHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        <View>
          <Button title=" English" onPress={() => changeLanguage('en')} />
          <Button title=" עברית" onPress={() => changeLanguage('he')} />
          <Button title=" عربي" onPress={() => changeLanguage('ar')} />
        </View>

        <View style={styles.sale}>
          <SlideAndSnapAnimation onScroll={handleScroll} />
        </View>


        <View style={styles.catsBarItemsContainer}>
          <CatsBarItems
            style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryPress}
            Array={cat}
          />
        </View>

        {handleRows()}
      </ScrollView>
      {showScrollUp && <ScrollUp scrollViewRef={scrollViewRef} onPress={handleScrollUpPress} />}

    </LinearGradient>
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

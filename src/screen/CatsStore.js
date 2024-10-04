import React, {useContext, useState, useRef, useMemo} from 'react';
import {View, StyleSheet, ScrollView, Animated, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../Components/topBar';
import SolabContext from '../store/solabContext';
import RowContainer from '../Components/RowContainer';
import BottomBar from '../Components/BottomBar';
import ScrollUp from '../Components/scrollUp';
import CatsBarItems from '../Components/CatsBarItems';
import Swipe from '../Components/Swipe';
import CatsStoreItems from '../Components/CatsStoreItems';
import Sizes from '../res/sizes';
import {useNavigation} from '@react-navigation/native';

import Images from '../assets/images/images';

const CatsStore = props => {
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const {
    selectedIcons,
    search,
    setSelectedCategory,
    selectedCategory,
    data,
    getFilteredItemsForRow,
  } = useContext(SolabContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef(null);
  const rows = useMemo(
    () => [
      {rows: 'firstRow', id: 1},
      {rows: 'secondRow', id: 2},
      {rows: 'thirdRow', id: 3},
      {rows: 'fourthRow', id: 4},
      {rows: 'fifthRow', id: 5},
      {rows: 'sixthRow', id: 6},
      {rows: 'seventhRow', id: 7},
      {rows: 'eigthRow', id: 8},
      {rows: 'ninthRow', id: 9},
      {rows: 'tenthRow', id: 10},
    ],
    [],
  );
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <CatsStoreItems
          _id={item._id}
          salePrice={item.salePrice}
          saleAmount={item.saleAmount}
          kg={item.kg}
          key={item.id}
          brand={item.brand}
          taste={item.taste}
          img={{uri: item.img}}
          dis={item.dis}
          price={item.price}
          productId={item.productId}
          quantity={item.quantity}
          displayMode={displayMode}
          selectedCategory={selectedCategory}
          category={item.category}
          petType={item.petType}
          name={item.name}
          searchKeys={item.searchKeys}
        />
      </View>
    );
  };

  const onCategoryPress = val => {
    setSelectedCategory(val);
    setOptionsVisible(false);
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollUp(scrollPosition > 250);
  };

  const handleScrollUpPress = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const cat = [
    {Food: 'food'},
    {Meat: 'meat'},
    {Accessories: 'accessories'},
    {Clothes: 'clothes'},
    {Sprays: 'sprays'},
    {Toilet: 'toilet'},
    {Perfume: 'perfume'},
    {Treats: 'treats'},
    {bowl: 'bowl'},
  ];

  return (
    <LinearGradient
      colors={['#6CCAFF', '#6CCAFF', '#004C99']}
      locations={[0, 0.1, 1]}
      style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{minHeight: Sizes.screenHeight}}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}>
        <View style={styles.sale}>
          <Swipe />
        </View>

        <View style={styles.catsBarItemsContainer}>
          <CatsBarItems
            style={styles.CatsBarItems}
            selectedCategory={selectedCategory}
            setSelectedCategory={onCategoryPress}
            Array={cat}
          />
        </View>

        {rows.map(row => {
          const filteredItems = getFilteredItemsForRow(row.rows);
          // console.log('Row ID:', row.id, 'Filtered Items:', filteredItems);

          return (
            <RowContainer
              key={row.id}
              row={row}
              items={filteredItems}
              renderItem={renderItem}
              selectedCategory={selectedCategory}
            />
          );
        })}
      </ScrollView>

      <BottomBar />
      {showScrollUp && (
        <ScrollUp scrollViewRef={scrollViewRef} onPress={handleScrollUpPress} />
      )}
    </LinearGradient>
  );
};

export default CatsStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6CCAFF',
  },
  scroll: {
    flex: 1,
  },
  catsBarItemsContainer: {
    justifyContent: 'center',
  },
  itemContainer: {
    marginLeft: 10,
  },
});

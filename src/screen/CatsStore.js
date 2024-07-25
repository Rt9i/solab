import React, {useContext, useState, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import getCategoryItemsData from '../res/Data';
import {useNavigation} from '@react-navigation/native';
import CatsBarItems from '../Components/CatsBarItems';
import Sizes from '../res/sizes';
import Swipe from '../Components/Swipe';
import RowContainer from '../Components/RowContainer';
import ScrollUp from '../Components/scrollUp';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../Components/topBar';
import SolabContext from '../store/solabContext';
import BottomBar from '../Components/BottomBar';
import CatsStoreItems from '../Components/CatsStoreItems';

const CatsStore = props => {
  const [selectedCategory, setSelectedCategory] = useState('food');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const {selectedIcons, search} = useContext(SolabContext);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef(null);

  const getFilteredItemsForRow = useMemo(
    () => rowValue => {
      const isSearchActive = search.length > 0;

      const filteredItems = getCategoryItemsData.filter(item => {
        if (isSearchActive) {
          return (
            item.name &&
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.category.includes(rowValue)
          );
        }

        return (
          item.category.includes(selectedCategory) &&
          item.category.includes(rowValue) &&
          item.petType &&
          item.petType.includes(selectedIcons)
        );
      });

      const uniqueItems = filteredItems.reduce((acc, item) => {
        if (!acc.find(existingItem => existingItem.id === item.id)) {
          acc.push(item);
        }
        return acc;
      }, []);

      return uniqueItems;
    },
    [search, selectedCategory, selectedIcons],
  );

  const rows = useMemo(
    () => [
      {items: 'firstRow', id: 1},
      {items: 'secondRow', id: 2},
      {items: 'thirdRow', id: 3},
      {items: 'fourthRow', id: 4},
      {items: 'fifthRow', id: 5},
      {items: 'sixthRow', id: 6},
      {items: 'seventhRow', id: 7},
      {items: 'eigthRow', id: 8},
      {items: 'ninthRow', id: 9},
      {items: 'tenthRow', id: 10},
    ],
    [],
  );

  const renderRow = ({item}) => (
    <RowContainer
      row={item}
      items={getFilteredItemsForRow(item.items)}
      renderItem={renderItem}
      selectedCategory={selectedCategory}
    />
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
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
        petType={item.petType}
        name={item.name}
      />
    </View>
  );

  const onCategoryPress = val => {
    setSelectedCategory(val);
    setOptionsVisible(false);
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setShowScrollUp(scrollPosition > 250);
  };

  const handleScrollUpPress = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true}); // Using ref to scroll
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

        {rows.map(row => (
          <RowContainer
            key={row.id}
            row={row}
            items={getFilteredItemsForRow(row.items)}
            renderItem={renderItem}
            selectedCategory={selectedCategory}
          />
        ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: Sizes.screenHeight,
  },
  catsBarItemsContainer: {
    justifyContent: 'center',
  },
  itemContainer: {
    marginLeft: 10,
  },
});

import React, {useContext, useState, useRef} from 'react';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import CatsStoreItems from '../Components/CatsStoreItems';
import getCategoryItemsData from '../res/Data';
import {useNavigation} from '@react-navigation/native';
import CatsBarItems from '../Components/CatsBarItems';
import Sizes from '../res/sizes';
import SlideAndSnapAnimation from '../animations/SlideAndSnapAnimation';
import RowContainer from '../Components/RowContainer';
import ScrollUp from '../Components/scrollUp';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../Components/topBar';
import SolabContext from '../store/solabContext';
import BottomBar from '../Components/BottomBar';

const CatsStore = props => {
  const [selectedCategory, setSelectedCategory] = useState('food');
  const navigation = useNavigation();
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const {selectedIcons, search, setSearch} = useContext(SolabContext);

  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef();

  const getFilteredItemsForRow = rowValue => {
   
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
  };

  const handleRows = () => {
    const rows = [
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
    ];

    return rows.map(row => (
      <View  key={row.id}>
        <RowContainer
          row={row}
          items={getFilteredItemsForRow(row.items)}
          renderItem={renderItem}
          selectedCategory={selectedCategory}
        />
      </View>
    ));
  };

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
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
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

        <View>{handleRows()}</View>
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
  cont: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  imgcont: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 45,
    height: 45,
    borderRadius: 30,
    flexDirection: 'row',
    marginLeft: 5,
  },
  img: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
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
  itemContainer: {
    marginLeft: 10
  },
});

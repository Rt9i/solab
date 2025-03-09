import React, {useContext, useState, useRef, useMemo, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import TopBar from '../src/Components/topBar';
import SolabContext from '../src/store/solabContext';
import RowContainer from '../src/Components/RowContainer';
import BottomBar from '../src/Components/BottomBar';
import ScrollUp from '../src/Components/scrollUp';
import CatsBarItems from '../src/Components/CatsBarItems';
import Swipe from '../src/Components/Swipe';
import CatsStoreItems from '../src/Components/CatsStoreItems';
import Sizes from '../src/res/sizes';
import Images from '@/src/assets/images/images';
import {useFocusEffect, useNavigation} from 'expo-router';
import {TouchableOpacity} from 'react-native';

const CatsStore = props => {
  const [displayMode, setDisplayMode] = useState('row');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const {
    selectedIcons,
    search,
    setSelectedCategory,
    selectedCategory,
    data,
    getFilteredItemsForRow,
    cat,
    rows,
  } = useContext(SolabContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef(null);
  const nav = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (!data || data.length === 0) {
        console.warn('No data found, navigating back to index...');
        nav.navigate('index');
      }
    }, [data, nav]),
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <CatsStoreItems
          _id={item._id}
          availableStock={item.availableStock}
          salePrice={item.salePrice}
          saleAmount={item.saleAmount}
          kg={item.kg}
          key={item._id}
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

  // Memoize the rows to check if any row is empty
  const emptyRows = useMemo(() => {
    return rows.every(row => {
      const filteredItems = getFilteredItemsForRow(row.rows);
      return filteredItems.length === 0;
    });
  }, [rows, getFilteredItemsForRow]);
  const arrowPress = () => {
    return console.log('presseed');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6CCAFF', '#6CCAFF', '#004C99']}
        locations={[0, 0.1, 1]}
        style={styles.container}>
        <TopBar />
        <ScrollView
          style={styles.scroll}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}>
          <View style={styles.sale}>
            <Swipe />
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.catsBarItemsContainer}>
              <CatsBarItems
                style={styles.CatsBarItems}
                selectedCategory={selectedCategory}
                setSelectedCategory={onCategoryPress}
                Array={cat}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            {rows.map((row, index) => {
              const filteredItems = getFilteredItemsForRow(row.rows);
              return (
                <View
                  key={row.id}
                  style={{width: '100%', flexDirection: 'row ', maxWidth: 800}}>
                  <RowContainer
                    index={index + 1}
                    key={row.id}
                    row={row.rows}
                    items={filteredItems}
                    renderItem={renderItem}
                    selectedCategory={selectedCategory}
                  />
                </View>
              );
            })}
          </View>
          {emptyRows && <Text style={styles.txt}>No items available</Text>}
        </ScrollView>

        <BottomBar />
        {showScrollUp && (
          <ScrollUp
            scrollViewRef={scrollViewRef}
            onPress={handleScrollUpPress}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CatsStore;

const styles = StyleSheet.create({
  img2: {
    height: 40,
    width: 40,
    transform: [{rotate: '-180deg'}], // Rotate the image by -180 degrees
  },
  img: {
    height: 40,
    width: 40,
  },
  imgCont: {
    height: '100%',
    width: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  sale: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  catsBarItemsContainer: {
    height: 100,
    width: '100%',
    maxWidth: 600,
  },
  itemContainer: {
    height: '100%',
    width: '100%',
  },
});

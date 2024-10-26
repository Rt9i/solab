import React, {useContext, useState, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
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
import {useNavigation} from '@react-navigation/native';

import Images from '../src/assets/images/images';

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
    cat,
    rows,
  } = useContext(SolabContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollViewRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <CatsStoreItems
          _id={item._id}
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
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

import React, {useContext, useState, useRef, useMemo, useEffect} from 'react';
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
import Images from '@/src/assets/images/images';
import {useFocusEffect, useNavigation} from 'expo-router';

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
      console.log('go back bozo');

      if (data <= 0) {
        nav.navigate('index');
      }

      // Optional: You can return a cleanup function if needed
      return () => {
        // Cleanup if necessary
      };
    }, [data, nav]), // Dependencies array
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

          {rows.map((row, index) => {
            const filteredItems = getFilteredItemsForRow(row.rows);

            return (
              <RowContainer
                index={index + 1}
                key={row.id} // Make sure row.id is unique for each key
                row={row.rows}
                items={filteredItems} // Ensure this is defined and valid
                renderItem={renderItem} // Make sure renderItem is a valid function
                selectedCategory={selectedCategory} // Ensure this prop is defined
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

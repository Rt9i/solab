import {FlatList, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router'; // Using Expo Router's hook

import CatsStoreItems from '@/src/Components/CatsStoreItems';
import SolabContext from '@/src/store/solabContext';

const SeeAllProducts = () => {
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

  // Using the router to get the parameters
  const router = useLocalSearchParams();
  const items = router.items ? JSON.parse(router.items) : [];


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

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={items} 
        renderItem={({item, index}) => renderItem({item, index})}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default SeeAllProducts;

const styles = StyleSheet.create({
  itemContainer: {
    height: 300,
    width: 130,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 20,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';

const SeeAllProducts = ({ route }) => {
  const { items, renderItem } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={items}
        renderItem={({ item, index }) => renderItem({ item, index })}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default SeeAllProducts;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingVertical: 20,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

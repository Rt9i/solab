import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import Images from '../assets/images/images';

const OrderItems = ({products, otherParams}: any) => {
  if (!products || products.length === 0) {
    return <Text style={styles.emptyText}>No items in this order.</Text>;
  }
  console.log('products: ', products);

  const renderItems = (item: any) => {
    const imageSource = item?.img?.uri;

    console.log('img: ', imageSource);
    return (
      <View style={styles.card}>
        <Text style={styles.brand}>{item.brand || 'Unknown Brand'}</Text>
        <Text style={styles.taste}>{item.taste || 'No Taste Info'}</Text>
        <Text style={styles.description}>{item.dis || 'No Description'}</Text>

        {imageSource ? (
          <Image
            source={{uri: imageSource}}
            style={{width: 100, height: 100, resizeMode: 'contain'}}
          />
        ) : (
          <Text>No Image Available</Text>
        )}

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {item.salePrice ? (
            <>
              <Text style={styles.salePrice}>${item.salePrice}</Text>
              <Text style={styles.originalPrice}>${item.price}</Text>
            </>
          ) : (
            <Text style={styles.price}>${item.price || 'N/A'}</Text>
          )}
        </View>

        <Text style={styles.quantity}>Quantity: {item.quantity || 1}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Items</Text>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItems(item)}
      />
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({
  container: {padding: 15},
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  brand: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  taste: {fontSize: 14, color: '#666', marginBottom: 5},
  description: {fontSize: 12, color: '#888', marginBottom: 5},
  priceContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  price: {fontSize: 16, fontWeight: 'bold', color: '#27ae60'},
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantity: {fontSize: 12, color: '#555'},
  category: {fontSize: 12, color: '#777'},
  emptyText: {fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20},
});

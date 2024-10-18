import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import SolabContext from '../src/store/solabContext';
import Images from '../src/assets/images/images';

const ProfileScreen = () => {
  const {user} = useContext(SolabContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  // Log user data for debugging
  console.log('User data:', user);

  // Check if products exist and are correctly formatted
  const products = user.products || [];
  console.log('Products:', products);

  return (
    <View style={styles.container}>
      <Image source={Images.profileIcon()} style={styles.profileImage} />
      <Text style={styles.userName}>{user.userName || 'User Name'}</Text>
      <Text style={styles.userPhone}>{user.phoneNumber || 'Phone Number'}</Text>

      {/* Render list of products */}
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={item => item.productId.toString()}
          renderItem={({item}) => (
            <View style={styles.productContainer}>
              <Image source={{uri: item.img}} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>
                  {item.productName || 'Product Name'}
                </Text>
                <Text style={styles.productPrice}>
                  ${item.price || 'Price'}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noProductsText}>No products found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  noProductsText: {
    fontSize: 18,
    color: '#999',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
  },
});

export default ProfileScreen;

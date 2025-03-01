import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import SolabContext from '../src/store/solabContext';
import Images from '../src/assets/images/images';
import {FlashList} from '@shopify/flash-list';
import Sizes from '@/src/res/sizes';

const ProfileScreen = () => {
  const {user} = useContext(SolabContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const products = user.products || [];
  const renderedItem = item => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.img}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.brand || 'Product Name'}</Text>
        <Text style={styles.productPrice}>${item.price || 'Price'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{uri: user.picture}} style={styles.profileImage} />
      <Text style={styles.userName}>{user.userName || 'User Name'}</Text>
      <Text style={styles.userPhone}>{user.phoneNumber || 'Phone Number'}</Text>

      <View style={{flex: 1, width: Sizes.screenWidth}}>
        <FlashList
          // Removed style={{ flex: 1 }} from FlashList
          data={products}
          estimatedItemSize={85} // Set estimated item size
          contentContainerStyle={{paddingBottom: 2}}
          keyExtractor={item => item._id} // Ensure items have a unique _id
          renderItem={({item}) => renderedItem(item)}
        />
      </View>
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
  errorText: {
    fontSize: 18,
    color: '#ff0000',
  },
});

export default ProfileScreen;

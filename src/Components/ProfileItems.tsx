import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ProfileItems = ({item}) => {
  return (
    <View style={styles.productContainer}>
              <Image source={{uri: item.img}} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>
                  {item.brand || 'Product Name'}
                </Text>
                <Text style={styles.productPrice}>
                  ${item.price || 'Price'}
                </Text>
              </View>
            </View>
  )
}

export default ProfileItems

const styles = StyleSheet.create({
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
  
})
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import OrderItems from '@/src/Components/OrderItems';

const OrdersPage = () => {
  const params = useLocalSearchParams();

  // Parse the products if they exist
  const products = params.products ? JSON.parse(params.products as any) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders Page</Text>

      <OrderItems products={products} otherParams={params} />
    </View>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  header: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
});

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {FlashList} from '@shopify/flash-list'; // Import FlashList
import {useRouter} from 'expo-router';
import SolabContext from '../src/store/solabContext';
import Images from '@/src/assets/images/images'; // Import your images

const StaffHome = () => {
  const {setSelectedIcons} = useContext(SolabContext);
  const router = useRouter(); // Get the router instance

  const navigateStore = () => {
    setSelectedIcons('cat');
    router.navigate('CatsStore'); // Use router to navigate to CatsStore
  };

  const navEditProducts = () => {
    router.navigate('EditProduct'); // Navigate to EditProduct
  };

  // Navigation items
  const items = [
    {
      id: '1',
      title: 'Add Product',
      image: Images.edit(),
      onPress: navEditProducts,
    },
    {
      id: '2',
      title: 'Cats Store',
      image: Images.cat(),
      onPress: navigateStore,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.box} onPress={item.onPress}>
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.boxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Staff Home</Text>
      <View style={styles.list}>
        <FlashList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          estimatedItemSize={120}
          horizontal={true}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default StaffHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    height: 175,
    elevation: 24,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  listContent: {},
  box: {
    backgroundColor: 'white',

    height: 160,
    elevation: 4,
    borderRadius: 10,
    padding: 16,
    margin: 4,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8, // Space between icon and text
  },
  boxText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

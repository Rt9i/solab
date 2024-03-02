import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { FlatList } from 'react-native';

import CatsStoreItems from '../Components/CatsStoreItems';
import { Items } from '../res/Data';
import Images from '../assets/images/images';
import { Picker } from '@react-native-picker/picker';

const ProductScreen = props => {
  const product = props.route.params.data;

  const Numbers = () => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [arrayValues, setArrayValues] = useState(Array.from({ length: 50 }, (_, index) => index + 1));


    const renderItem = ({ item }) => (

      <TouchableOpacity
        style={[styles.item, item === selectedNumber && styles.selectedItem]}
        onPress={() => setSelectedNumber(item)}
      >
        <Text style={styles.itemText}>{item}</Text>

      </TouchableOpacity>

    );
    console.log(selectedNumber);
    return (

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <FlatList
          data={arrayValues}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          numColumns={60}
        />
      </ScrollView>


    );
  };

  console.log("product:", product)
  return (
    <View style={styles.container}>
      <Image source={product.img} style={styles.image} />
      <Text style={styles.title}>{`${product.brand} ${product.taste}`}</Text>
      <Text style={styles.dis}>{`${product.dis}`}</Text>

      <View style={styles.bottomcomp}>

        <View style={styles.numcontainer}>
          <Text style={styles.presstxt}>{"<    "}press{"    >"}</Text>
          <Numbers />
        </View>


        <View style={styles.addToCart}>
          <TouchableOpacity>
            <Text style={styles.addToCartTxt}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  presstxt: {
    fontSize: 15,
    color: 'black',

  },
  selectedItem: {
    backgroundColor: 'green',
    borderWidth: 2,
    justifyContent: 'center',
    textAlign: 'center',
    height: 45,
  },

  scroll: {
    height: 10,
    width: 150,
    borderBottomWidth: 1,
  },
  numcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },


  itemText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },

  itemText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },

  item: {
    backgroundColor: 'grey',
    color: 'black',
    padding: 10,
    fontSize: 18,
    height: 50,

  },
  container: {
    flex: 1,
    backgroundColor: '#795548',
  },
  image: {
    width: '100%',
    height: 340,
    resizeMode: 'contain',
    backgroundColor: "#071e31",
    borderRadius: 100,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft:50,
    fontSize: 30,
    borderWidth: 2,
    backgroundColor: '#1e87db',
    borderRadius: 50,
    borderWidth: 3,
    width: 300,
  },
  dis: {
    fontSize: 20,
    padding: 5,
    borderRadius: 25,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'grey',
  },
  bottomcomp: {
    marginLeft: '25%',
    flex: 1,
    marginBottom: 165,
    width: 200,

  },
  addToCart: {
    flex: 1.4,
    borderRadius: 1,
    alignItems: 'center',
    textAlign: 'center',

  },
  addToCartTxt: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
    backgroundColor: 'grey',
    margin: 5,
  },
})
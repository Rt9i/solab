import React, { useContext, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';

import SolabContext from '../store/solabContext';
import LinearGradient from 'react-native-linear-gradient';

const ProductScreen = props => {
  const navigation = useNavigation();
  const product = props.route.params.data;
  const { addItemToCart } = useContext(SolabContext);
  const [quantity, setQuantity] = useState('');
  const { strings } = useContext(SolabContext);

  const handleAddToCart = () => {
    const quantityInt = parseInt(quantity);

    if (isNaN(quantityInt) || quantityInt <= 0) {
      Alert.alert('Invalid number', 'Please enter a valid number.');
      return;
    }

    const item = { ...product, quantity: quantityInt };
    addItemToCart(item, item.id);
    navigation.navigate(ScreenNames.cart);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', 'white', 'black']}
        locations={[0, 0.58, 1]}
        style={styles.container}
      >
        <Image source={product.img} style={styles.image} />

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
            placeholder={strings.enterNumber}
            placeholderStyle={styles.placeholder}
            placeholderTextColor="rgba(0,0,0,0.4)"
          />

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>{strings.addToCart}</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>



    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({

  placeholder: {
    fontStyle: 'italic',
  },
  input: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 11,
    backgroundColor: 'white',
    width: 100,
  },
  container: {
    flex: 1,


  },
  image: {
    width: '100%',
    height: 340,
    resizeMode: 'contain',
    backgroundColor: "#071e31",
    borderRadius: 100,
  },
  // title: {
  //   color: 'black',
  //   fontWeight: 'bold',
  //   fontSize: 30,
  //   marginVertical: 10,
  // },
  // dis: {
  //   fontSize: 20,
  //   padding: 5,
  //   borderRadius: 25,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   backgroundColor: 'grey',
  //   marginBottom: 20,
  // },
  inputContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

  },
  label: {
    fontSize: 20,
    marginRight: 10,
    color: 'black',
  },

  addToCartButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

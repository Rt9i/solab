import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SolabContext from '../store/solabContext';
import LinearGradient from 'react-native-linear-gradient';


const ProductScreen = (props) => {
  const navigation = useNavigation();
  const product = props.route.params.data;
  const { addItemToCart, cart, user } = useContext(SolabContext); // Ensure cart is fetched from context
  const [quantity, setQuantity] = useState('1');
  const { strings } = useContext(SolabContext);

  const handleAddToCart = async () => {
    const quantityInt = parseInt(quantity);

    if (isNaN(quantityInt) || quantityInt <= 0) {
      Alert.alert('Invalid number', 'Please enter a valid number.');
      return;
    }

    const item = { ...product, quantity: quantityInt };

    try {

      addItemToCart(item, item.id); 

      navigation.goBack();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };


 

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0', '#e0e0e0']}
        style={styles.gradient}>
        <Image source={{ uri:product.img}} style={styles.image} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
            placeholder={strings.enterNumber}
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>{strings.addToCart}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{product.dis}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 10,
    color: 'black',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addToCartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default ProductScreen;

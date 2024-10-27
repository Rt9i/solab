import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import SolabContext from '../src/store/solabContext';
import {LinearGradient} from 'expo-linear-gradient';
import MessageModal from '@/src/Components/messageModal';
import Images from '@/src/assets/images/images';
import Toast from 'react-native-toast-message';
const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route params

  const {data: product} = route.params;
  const {addItemToCart, strings} = useContext(SolabContext);
  const [quantity, setQuantity] = useState('1');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

  const handleAddToCart = () => {
    const quantityInt = parseInt(quantity);
    if (isNaN(quantityInt) || quantityInt <= 0) {
      Toast.show({
        type: 'error',
        text1: strings.enterNumber,

        position: 'top', // Optionally set this if you want error toast at the top too
        visibilityTime: 2000, // Show for 3 seconds
      });
      return;
    }

    addItemToCart({...product, quantity: quantityInt});
    Toast.show({
      type: 'success',

      text1: strings.productAdded,
      text2: strings.itemaddsucces + '!🎉',
      position: 'top', // Show toast from the top
      visibilityTime: 2000, // Show for 3 seconds
    });

    navigation.goBack();
  };

  const isValidUrl = string => /^(https?:\/\/)/.test(string); // Simple regex for URL check
  const imageSource = product?.img?.uri || product?.img;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0', '#e0e0e0']}
        style={styles.gradient}>
        <Image
          style={styles.image}
          source={{
            uri: imageSource,
          }}
          contentFit="contain"
          transition={1000}
        />

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
        <View>
          <Text style={styles.descriptionTitle}>{strings.dis} :</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{product.dis}</Text>
          </View>
        </View>

        <MessageModal
          message={modalMessage}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
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
    shadowOffset: {width: 0, height: 2},
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
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addToCartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  descriptionTitle: {
    alignSelf: 'flex-end',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default ProductScreen;

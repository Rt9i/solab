import React, {useContext, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import SolabContext from '../src/store/solabContext';
import {LinearGradient} from 'expo-linear-gradient';
import MessageModal from '@/src/Components/messageModal';


const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {data: product} = route.params;
  const {addItemToCart, strings} = useContext(SolabContext);
  const [quantity, setQuantity] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  console.log('img: ', product.img);

  const handleAddToCart = () => {
    const quantityInt = parseInt(quantity);
    if (isNaN(quantityInt) || quantityInt <= 0) {
      if (Platform.OS == 'web') {
        // toast.error(strings.enterNumber, {
        //   position: 'top-center',
        //   duration: 2000,
        // });
      }

      return;
    }

    addItemToCart({...product, quantity: quantityInt});
    if (Platform.OS == 'web') {
      // toast.success(`${strings.productAdded} ! `, {
      //   position: 'top-center',
      //   duration: 2000,
      // });
    }

    navigation.goBack();
  };

  const imageSource = product?.img?.uri || product?.img;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0', '#e0e0e0']}
        style={styles.gradient}>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'contain'}]}
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
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Web-specific shadow
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4, // Android-specific shadow
      },
    }),
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
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)', // Web shadow
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
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
    borderColor: '#ddd',
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Web shadow
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
      },
    }),
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

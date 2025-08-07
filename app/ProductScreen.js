import React, {useContext, useState} from 'react';
import {
  Image as RnImage,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import SolabContext from '../src/store/solabContext';
import {LinearGradient} from 'expo-linear-gradient';
import MessageModal from '@/src/Components/messageModal';
import Images from '../src/assets/images/images';
import ImageBoth from '../src/Components/ImageBoth';

export default function ProductScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {data: product} = route.params;
  const {addItemToCart, strings} = useContext(SolabContext);
  const [quantity, setQuantity] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [useFallback, setUseFallback] = useState(false);

  const imageSource =
    typeof product.img === 'string'
      ? {uri: product.img}
      : product.img || Images.blackLoggo();

  const showNativeImage = Platform.OS !== 'web' && !useFallback;

  const onError = () => setUseFallback(true);

  const handleAddToCart = () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      if (Platform.OS === 'web') {
        // toast.error(strings.enterNumber)
      }
      return;
    }
    addItemToCart({...product, quantity: qty});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0', '#e0e0e0']}
        style={styles.gradient}>
        <ImageBoth
          source={imageSource}
          style={styles.image}
          resizeMode='contain'
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={250}
          placeholder={Images.blackLoggo()}
          onError={onError}
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

        <Text style={styles.descriptionTitle}>{strings.dis} :</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{product.dis}</Text>
        </View>

        <MessageModal
          message={modalMessage}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f8f8'},
  gradient: {flex: 1, alignItems: 'center', padding: 16},
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    ...Platform.select({
      web: {boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'},
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
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
      web: {boxShadow: '0px 2px 6px rgba(0,0,0,0.2)'},
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  addToCartText: {fontSize: 16, color: '#fff', fontWeight: 'bold'},
  descriptionTitle: {fontSize: 18, fontWeight: '600', marginBottom: 8},
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    ...Platform.select({
      web: {boxShadow: '0px 4px 12px rgba(0,0,0,0.15)'},
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
      },
    }),
  },
  descriptionText: {fontSize: 16, color: '#555'},
});

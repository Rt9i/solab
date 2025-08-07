import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image as RnImage,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';
import ImageBoth from './ImageBoth';

const CatsStoreItems = ({selectedCategory, ...props}) => {
  const {strings, user} = useContext(SolabContext);
  const [useFallback, setUseFallback] = useState(false);
  const navigation = useNavigation();
  const {
    availableStock,
    name,
    taste,
    price,
    img,
    kg,
    saleAmount,
    salePrice,
    productId,
  } = props;
  const {addItemToCart} = useContext(SolabContext);

  const onCardPress = () => {
    navigation.navigate('ProductScreen', {data: {...props}});
  };

  const addToShop = () => {
    addItemToCart({...props}, productId);
  };
  const sourceObj = typeof img === 'string' ? {uri: img} : img;

  const showNativeImage = Platform.OS !== 'web' && !useFallback;
  const LoadingIndicator = () => {
    return <ActivityIndicator size="small" style={styles.placeholder} />;
  };
  return (
    <View
      style={user?.role === 'staff' ? styles.itemWidthStaff : styles.itemWidth}>
      <View style={styles.items}>
        {user?.role === 'staff' && (
          <View style={styles.stock}>
            <Text style={styles.stocktext}>{availableStock}</Text>
          </View>
        )}

        {(availableStock === 0 || availableStock == null) && (
          <View style={styles.notavailableStock}>
            <Text style={styles.stockTxt}>Out of Stock</Text>
          </View>
        )}

        <TouchableOpacity onPress={onCardPress} activeOpacity={0.6}>
          <ImageBoth
            source={sourceObj}
            style={[
              styles.img,
              selectedCategory === 'catMeat' && styles.meatImg,
            ]}
            resizeMode="contain"
            placeholder={Images.blackLoggo()}
            onError={() => setUseFallback(true)}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <View style={styles.bottomcontainer}>
            <Text style={styles.bottomtxt1}>{taste}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.bottomtxt2}>
              {price} {strings.priceTag}
            </Text>
            {kg !== 0 && <Text style={styles.bottomtxt4}>{kg} kg</Text>}
          </View>
        </View>

        {user?.role === 'staff' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProduct', props)}
            style={styles.editButtonContainer}>
            <RnImage
              source={Images.edit()}
              resizeMode="contain"
              style={styles.edit}
            />
          </TouchableOpacity>
        )}

        <View style={styles.center}>
          <TouchableOpacity activeOpacity={0.7} onPress={addToShop}>
            <View style={styles.cart}>
              <RnImage
                source={Images.addCart()}
                resizeMode="contain"
                style={styles.addCart}
              />
              <Text style={styles.carttxt}>{strings.addToCart}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {saleAmount > 0 && (
        <View style={styles.sale}>
          <View style={styles.saleLabel}>
            <Text style={styles.saleText}>
              {saleAmount} = {salePrice} {strings.priceTag}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CatsStoreItems;

const styles = StyleSheet.create({
  itemWidth: {
    height: 300,
    width: 140,
    marginBottom: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  itemWidthStaff: {
    width: 140,
    height: 290,
    marginBottom: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  items: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(20, 70, 200, 0.02)',
    overflow: 'hidden',
  },
  stock: {
    zIndex: 4,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  stocktext: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 16,
  },
  notavailableStock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockTxt: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  img: {
    marginTop: 15,
    width: '100%',
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  meatImg: {
    resizeMode: 'contain',
    height: 110,
  },
  infoContainer: {
    padding: 8,
    flex: 1,
  },
  bottomcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '70%',
  },
  bottomtxt1: {
    fontSize: 10,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomtxt2: {
    fontSize: 12,
    color: 'black',
  },
  bottomtxt4: {
    fontSize: 12,
    color: 'black',
    marginLeft: 5,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  edit: {
    width: 30,
    height: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart: {
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderWidth: 0.3,
    borderColor: 'black',
    flexDirection: 'row',
    marginBottom: 5,
    height: 22,
    width: 120,
    alignItems: 'center',
    bottom: 10,
  },
  addCart: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  carttxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    lineHeight: 22,
  },
  sale: {
    position: 'absolute',
    top: 10,
    right: 70,
    width: 89,
    height: 20,
    backgroundColor: '#D9534F',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-45deg'}],
    overflow: 'hidden',
    zIndex: 1,
  },
  saleLabel: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  saleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    transform: [{rotate: '-45deg'}],
  },
});

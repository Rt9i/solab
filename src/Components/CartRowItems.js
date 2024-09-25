import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'; // Make sure to install this package if you haven't
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

const CartRowItems = props => {
  const {strings} = useContext(SolabContext);
  const Item = {...props};
  const {brand, price, img, id} = props;
  const {addItemToCart, removeItemFromCart, checkRemoveItem, addItem} =
    useContext(SolabContext);
  const navigation = useNavigation();

  const onCardPress = () => {
    navigation.navigate(ScreenNames.ProductScreen, {data: Item});
  };
  useEffect(() => {
    console.log('====================================');
    console.log('img in cartrow: ', img);
    console.log('====================================');
  }, [Item]);

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        style={styles.box}
        isChecked={props.isSelected}
        onPress={val => props.onCheckBoxChange(val, id)}
        fillColor="black"
        iconStyle={{borderColor: 'blue'}}
        textStyle={{textDecorationLine: 'none'}}
      />
      <TouchableOpacity onPress={onCardPress} style={styles.photo}>
        <View style={styles.imgCont}>
          <Image source={{uri: img}} style={styles.img} />

          {Item.saleAmount && (
            <View style={styles.sale}>
              <View style={styles.saleLabel}>
                <Text style={styles.saleText}>
                  {Item.saleAmount} = {Item.salePrice} {strings.priceTag}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.details}>
        <View>
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.price}>{`${price} ${strings.priceTag}`}</Text>
          <View style={styles.cont}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => addItem(Item, id)}
                style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{props.quantity}</Text>
              <TouchableOpacity
                onPress={() => removeItemFromCart(Item, id)}
                style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartRowItems;

const styles = StyleSheet.create({
  imgCont: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  saleLabel: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'bigFont',
  },
  sale: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -2,
    width: 60,
    height: 20,
    backgroundColor: 'rgba(217, 83, 79,1)',

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
    zIndex: 1,
  },
  cont: {
    flexDirection: 'row',
    marginTop: 50,
  },
  trashCan: {
    flexDirection: 'row-reverse',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  box: {
    height: 30,
    width: 30,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    height: 160,
  },
  photo: {
    height: 120,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  img: {
    flex: 1,

    resizeMode: 'contain',
  },
  details: {
    flexDirection: 'row-reverse',
    flex: 3,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  button: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  removeButton: {
    width: 25,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#f00',
  },
});

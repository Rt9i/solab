import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'; // Ensure this package is installed
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';

const CartRowItems = props => {
  const {strings} = useContext(SolabContext);
  const Item = {...props};
  const {brand, price, img, _id} = props;
  const {addItem, removeItemFromCart} =
    useContext(SolabContext);
  const navigation = useNavigation();

  const onCardPress = () => {
    const {onCheckBoxChange, ...itemWithoutCheckBox} = Item; // Remove onCheckBoxChange from the item
    navigation.navigate('ProductScreen', {data: itemWithoutCheckBox});
  };

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        style={styles.box}
        isChecked={props.isSelected}
        onPress={val => props.onCheckBoxChange(val, _id)}
        fillColor="black"
        iconStyle={{borderColor: 'blue'}}
        textStyle={{textDecorationLine: 'none'}}
      />
      <TouchableOpacity onPress={onCardPress} style={styles.photo}>
        <View style={styles.imgCont}>
          <Image
            source={typeof img === 'string' ? {uri: img} : img}
            style={[styles.img,{resizeMode:'contain'}]}
          />

          <Text>
            {Item.saleAmount && (
              <View style={styles.sale}>
                <Text style={styles.saleText}>
                  {` ${Item.saleAmount}`} ={' '}
                  {`${Item.salePrice} ${strings.priceTag}`}
                </Text>
              </View>
            )}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.details}>
        <View>
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.price}>{`${price} ${strings.priceTag}`}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => addItem(Item, Item._id)}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{props.quantity}</Text>
            <TouchableOpacity
              onPress={() => removeItemFromCart(Item, Item._id)}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartRowItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,

    elevation: 5,
    width: '95%',
    alignSelf: 'center',
    height: 180,
  },
  imgCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sale: {
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
  saleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  box: {
    height: 30,
    width: 30,
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
    width: 250,
    height: 250,
   
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
});

import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SolabContext from '../store/solabContext';
import CartItems from '../Components/CartItems';
import strings from '../res/strings';

const Cart = () => {
  const { cart,removeItemFromCart  } = useContext(SolabContext);

 

  const renderCart = ({ item }) => {
    return <CartItems {...item} hideImage={true} onRemove={() => removeItemFromCart(item.id)} />;
  };



  const emptyCartMessage = () => {
    if (cart.length === 0) {
      return <Text style={styles.emptyText}>{strings.empty}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.toptxt}>
        <Text style={styles.carttxt}>{` ${strings.cart} `}</Text>
      </View>
      <View style={styles.items}>
        {emptyCartMessage()}
        <FlatList
          data={cart}  
          renderItem={renderCart}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          ListEmptyComponent={null}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({

  toptxt: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  carttxt: {
    fontSize: 40,
    fontFamily: 'bigFont',
    color: 'white',
    shadowColor:'black',
    textShadowOffset: { width: 7, height: 5 },
    textShadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3F3F3F',
  },
  items: {

    flex: 1,
    margin: 10,
    backgroundColor: 'grey',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 300,
    color: 'black',
    fontFamily:'PassionOne-Bold',
    fontSize: 50,
    opacity: 0.1,
  },
});

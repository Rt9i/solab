
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import SolabContext from '../store/solabContext';
import strings from '../res/strings';
import CartRowItems from '../Components/CartRowItems';
import CartItems from '../Components/CartItems';
import Images from '../assets/images/images';
const Cart = () => {
  const { cart, removeItemFromCart } = useContext(SolabContext);
  const [displayMode, setDisplayMode] = useState('row');

  const showImage = () => {
    return (
      <Image source={Images.photo()} style={styles.smallimg} />
    )
  }

  const rowOrcolumn = () => {
    return (
      <View style={styles.choiceDisplay}>
        <Text style={styles.displaytxt}>{strings.display}</Text>
        <View style={styles.rowOrcolumn}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setDisplayMode('row')} style={[styles.rowItems, { backgroundColor: displayMode === 'row' ? '#4e5e7f' : '#7391c8' }]} >
            <View style={styles.rowbox}>
              <View style={styles.row}>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>
              </View>
              <View style={styles.row}>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setDisplayMode('column')} style={[styles.column, { backgroundColor: displayMode === 'column' ? '#4e5e7f' : '#7391c8' }]}>
            <View style={styles.columnbox}>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderCart = ({ item }) => {
    if (displayMode === 'row') {

      return <CartRowItems {...item} hideImage={true} onRemove={() => removeItemFromCart(item.id)} />;
    } else {

      return <CartItems {...item} hideImage={true} onRemove={() => removeItemFromCart(item.id)} />;
    }


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

      <View style={styles.selectedDisplay} >
        {rowOrcolumn()}

      </View>

      <View style={styles.items}>
        {emptyCartMessage()}
        <FlatList
          data={cart}
          renderItem={renderCart}
          keyExtractor={(item) => item.id.toString()}
          numColumns={displayMode === 'row' ? 3 : 1}
          key={displayMode}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          paddingHorizontal={4}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  selectedDisplay: {
    flexDirection:'column',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: 'green',
  },
  box1: {
    width: 10,
    height: 10,
    marginTop: 5,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },
  box2: {
    width: 10,
    height: 10,
    marginTop: 20,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },
  column: {
    marginLeft: 0.2,
    backgroundColor: 'grey',
    width: 40,
    height: 40,
    borderWidth: 2,
  },
  columnbox: {
    flexDirection: 'column',

  },
  columnbox1: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 1,
    height: 10,
  },
  smalltxt: {
    fontSize: 8,
    fontFamily: 'smallFont',

  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowbox: {
    flexDirection: 'column',

  },
  smallimg: {
    height: 10,
    width: 10,
  },
  choiceDisplay: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    marginLeft: 40,
    width: 88,
    backgroundColor: 'grey',

  },
  displaytxt: {
    fontFamily: 'bigFont',
    color: "white",
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rowOrcolumn: {
    width: 200,

    flex: 1,
    flexDirection: 'row',
  },
  rowItems: {
    fontSize: 20,
    borderWidth: 2,
    backgroundColor: 'black',
    width: 44,
    height: 40,

  },

  toptxt: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 140,
    borderColor: 'black',
    width: 120,
    height: 60,

  },
  carttxt: {
    fontSize: 40,
    fontFamily: 'Angkor-Regular',
    fontFamily: 'bigFont',
    color: 'white',
    shadowColor: 'black',
    textShadowOffset: { width: 7, height: 5 },
    textShadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3F3F3F',
  },
  items: {
    borderWidth: 2,
    borderRadius: 20,
    flex: 1,
    marginTop: 8,
    marginHorizontal: 15,

    backgroundColor: 'grey',
    paddingTop: 5,

  },
  emptyText: {
    textAlign: 'center',
    marginTop: 220,
    color: 'black',
    fontFamily: 'PassionOne-Bold',
    fontSize: 50,
    opacity: 0.1,
  },
});

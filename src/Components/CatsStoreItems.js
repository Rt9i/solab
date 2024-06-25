import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../routes/ScreenNames'
import SolabContext from '../store/solabContext'
import Images from '../assets/images/images'
import AddOrLess from './AddOrLess'



const CatsStoreItems = ({ selectedCategory, displayMode, ...props }) => {
  const { strings, changeLanguage } = useContext(SolabContext);
  const meatImg = {
    resizeMode: 'contain',
    height: 110,
  };

  const navigation = useNavigation();
  const { brand, name, taste, price, img, hideImage, dis, id, quantity, category, kg, saleAmmount, salePrice } = props;
  const { cart, setCart, handleAddItem, addItem } = useContext(SolabContext);
  // const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { isItemAdded, setIsItemAdded } = useContext(SolabContext);
  const { removeItem } = useContext(SolabContext);

  useEffect(() => {
    const isInCart = cart.some(item => item.id === id);
    setIsAddedToCart(isInCart);
  }, [cart]);

  const onCardPress = () => {
    const Item = { ...props };
    navigation.navigate(ScreenNames.ProductScreen, { data: Item });
  };

  const addToShop = () => {
    const Item = { ...props };

    addItem(Item, Item.id)

  };




  return (
    <View style={styles.itemWidth}>



      <View style={styles.items}>

        <View style={styles.photo}>
          <TouchableOpacity onPress={onCardPress} activeOpacity={0.6}>
            <Image
              source={props.img}
              style={[styles.img, selectedCategory === 'catMeat' ? meatImg : null]}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.bottomcontainer}>


          <View style={styles.props}>
            <Text style={styles.bottomtxt1}>{` ${taste}`}</Text>
            <View style={styles.rows}>

              <View style={styles.row}>

                {kg && <Text style={styles.bottomtxt3}>{`${kg}`}</Text>}
                {kg && <Text style={styles.bottomtxt4}>kg</Text>}
              </View>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={onCardPress}>
            <View style={styles.cart}>
              {/* {isAddedToCart ? (
                <AddOrLess itemId={id} Item={props} />

              ) : (
                <Image source={Images.addCart()} style={styles.addCart} />
              )} */}


              <Image source={Images.addCart()} style={styles.addCart} />
              <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
            </View>
          </TouchableOpacity>


        </View>

      </View>

      {saleAmmount &&
        <View style={styles.sale}>
          <Text style={styles.saletxt}>{saleAmmount} {salePrice}</Text>
        </View>

      }

    </View>
  )
}

export default CatsStoreItems

const styles = StyleSheet.create({
  saletxt: {
    borderWidth: 1,

  },
  sale: {

    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 24,
    width: '95%',

    position: 'absolute',
    zIndex: 0,
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  rows: {
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  checkMark: {
    backgroundColor: 'grey',
    width: 40,
    height: 39,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
  },
  addCart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  disContainer: {
    width: 250,

  },
  itemWidth: {
    width: 140,
    height: 250,

    marginBottom: 2,

    marginHorizontal: 2,

  },
  disbox: {
    flex: 2,
    height: '100%',

  },
  dis: {
    width: '100%',
    height: 200,
    fontFamily: 'bigFont',
    color: '#9e978e',
    backgroundColor: '#393939',
    fontSize: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

  },
  itemsContainer: {
    backgroundColor: '#3F3F3F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    flexWrap: 'wrap',
  },
  items: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'column',
    height: 220,
    width: '100%',
    marginRight: 5,
    backgroundColor: 'rgba(20, 70, 200, 0.1)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0.1, // Decreased height for a lighter shadow
    },
    shadowOpacity: 0.1, // Reduced opacity for a lighter shadow
    shadowRadius: 1, // Reduced radius for a less pronounced blur
    // elevation: 2, // Adjusted elevation for Android devices
  },



  topContainer: {
    flexDirection: 'row',
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',

  },
  bottomcontainer: {
    flex: 3.5,
    flexDirection: 'column',

    alignItems: 'center',

  },
  bottomtxt1: {
    paddingBottom: 2,
    fontSize: 10,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
  },

  bottomtxt2: {
    paddingBottom: 2,
    fontSize: 12,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
    bottom: 1,

  },
  bottomtxt3: {
    paddingBottom: 2,
    fontSize: 12,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
    bottom: 1,

  },
  bottomtxt4: {
    marginTop: 5,
    paddingBottom: 2,
    fontSize: 8,
    textAlignVertical: 'center',
    fontFamily: 'bigFont',
    color: 'black',
    bottom: 1,

  },
  props: {
    flex: 1,
    height: 55,
    width: 110,

    flexDirection: 'column',
    justifyContent: 'space-between',


  },

  cart: {
    borderRadius: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    borderWidth: 0.3,
    borderColor: 'black',
    flexDirection: 'row',
    marginBottom: 5,
    height: 22,
    width: 110,
  },
  carttxt: {
    fontSize: 46,
    fontFamily: 'bigFont',
    color: 'black',
    backgroundColor: '#595552',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 58,
  },

  photo: {
    flex: 7,

  },

})
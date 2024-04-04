import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';

const CartRowItems = props => {

    const Item = { ...props };
    const { brand, name, taste, price, img, hideImage, id, onRemove, initialQuantity, quantity } = props;
    const { addItem, removeItemFromCart, checkRemoveItem } = useContext(SolabContext);
    const navigation = useNavigation();

    const onCardPress = () => {
        const Item = { ...props };
        navigation.navigate(ScreenNames.ProductScreen, { data: Item });
    };


    return (
        <View style={styles.items}>



            <View style={styles.photo}>

                <View style={styles.addOrLess}>

                    <View style={styles.X}>
                        <TouchableOpacity onPress={() => checkRemoveItem(Item, id)} style={styles.Xtouch}>
                            <Text style={styles.xtxt}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.plusMinusInput}>

                        <TouchableOpacity onPress={() => addItem(Item, id)} style={styles.pluscontainer}>
                            <View style={styles.plus}>
                                <Text style={styles.plus}>+</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.input}>{quantity}</Text>

                        <TouchableOpacity onPress={() => removeItemFromCart(Item, id)} style={styles.minuscontainer}>
                            <View style={styles.minus}>
                                <Text style={styles.minus}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>


                <TouchableOpacity onPress={onCardPress} style={styles.imgTouch}>
                    {<Image source={img} style={styles.img} />}
                </TouchableOpacity>
            </View>


            <View style={styles.bottomcontainer}>
                <View style={styles.props}>
                    <Text style={styles.bottomtxt1}>{` ${brand}`} </Text>
                    <Text style={styles.bottomtxt2}>{` ${price} ${strings.priceTag}`}</Text>
                </View>
            </View>


        </View>


    );

};

export default CartRowItems;

const styles = StyleSheet.create({
    plusMinusInput: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    imgTouch: {
        width: 70,
        marginLeft: 20,
        alignItems: 'center',
    },
    Xtouch: {
        height: 50
    },
    xtxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'brown',
        lineHeight: 25,
    },
    X: {
        width: 25,
        height: 25,
        backgroundColor: '#202020',
        borderRadius: 20,

    },

    input: {
        width: 30,
        height: 40,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#202020',
    },
    pluscontainer: {
        width: 20,

    },
    minuscontainer: {
        width: 20,

    },
    minus: {
        fontFamily: 'bigFont',
        fontSize: 25,
        alignContent: 'center',
        backgroundColor: 'red',
        lineHeight: 41,

        color: 'white',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    plus: {

        textAlign: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        fontFamily: 'bigFont',
        fontSize: 25,
        alignContent: 'center',
        backgroundColor: 'green',
        lineHeight: 41,
        color: 'white',
    },
    addOrLess: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        height: 40,
    },
    itemcontainer: {
        flex: 2.6,
        backgroundColor: '#3B3B3B',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    dis: {
        fontFamily: 'bigFont',
        fontSize: 10,
        width: 180,


    },

    quantity: {
        textAlign: 'center',
        height: 20,
        color: 'white',
    },
    bottomtxt1: {

        backgroundColor: 'grey',
        textAlignVertical: 'center',
        backgroundColor: 'grey',
        fontFamily: 'bigFont',
        borderWidth: 1,
        color: 'black',
    },
    bottomtxt2: {

        backgroundColor: 'grey',
        textAlignVertical: 'center',
        backgroundColor: 'grey',
        fontWeight: 'bold',
        borderWidth: 1,
        color: 'black',
    },
    props: {
        flex: 1,
        flexDirection: 'column',


    },

    cart: {
        flex: 1,
        width: 40,

    },
    bottomcontainer: {
        flex: 1.2,
        flexDirection: 'row-reverse',

    },
    items: {
       marginHorizontal:1,
        flexDirection: 'column',
        width: 110,
        height: 230,
    },
    photo: {
        paddingBottom: 1,
        backgroundColor: 'black',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: 110,
    },

    img: {

        width: 100,
        height: 130,


    },
})
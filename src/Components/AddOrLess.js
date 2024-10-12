import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SolabContext from '../store/solabContext';

const AddOrLess = ({ itemId, Item, quantity }) => {
    const { checkRemoveItem, removeItemFromCart, addItem, cart } = useContext(SolabContext);



    const getItemFromCart = () => {
        const itemFromCart = cart.find(item => item.id == itemId);

        return itemFromCart?.quantity;
    };



    return (
        <TouchableOpacity activeOpacity={1}>
            <View style={styles.addOrLess}>

                <TouchableOpacity onPress={() => checkRemoveItem(itemId)} style={styles.Xtouch}>
                    <View style={styles.X}>
                        <Text style={styles.xtxt}>X</Text>
                    </View>
                </TouchableOpacity>


                <View style={styles.plusMinusInput}>
                    <TouchableOpacity onPress={() => addItem(Item, itemId)} style={styles.pluscontainer}>
                        <View style={styles.plus}>
                            <Text style={styles.plus}>+</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.input}>{getItemFromCart()}</Text>

                    <TouchableOpacity onPress={() => removeItemFromCart(Item, itemId)} style={styles.minuscontainer}>
                        <View style={styles.minus}>
                            <Text style={styles.minus}>-</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default AddOrLess;

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
        height: 40,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',

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
        width: '100',
    },
    addOrLess: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        height: 40,
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
    props: {},
    cart: {
        flex: 1,
        width: 40,
    },
    bottomcontainer: {},
    items: {
        marginHorizontal: 1,
        flexDirection: 'column',
        width: 110,
        height: 270,
        marginLeft: 10,
    },
    photo: {
        paddingBottom: 1,
        backgroundColor: 'black',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: 110,
        height: 45,
        resizeMode: 'contain',
    },
    img: {
        resizeMode: 'contain',
        width: 130,
        height: 160,
    },
});

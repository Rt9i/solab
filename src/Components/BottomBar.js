import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import Images from '../assets/images/images';
const BottomBar = () => {
    const hideBar = true
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };


    if (!hideBar) {
        null
    }




    return (
        <View style={styles.bottomBar}>

            <TouchableOpacity onPress={goBack} style={styles.goback} >
            <Image source={Images.arrow()} style={styles.cartImage} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigateToScreen(ScreenNames.home) }style={styles.touch}>
                <Image source={Images.home()} style={styles.cartImage} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigateToScreen(ScreenNames.catsStore)}style={styles.touch}>
                <Image source={Images.catIcon()} style={styles.cartImage} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigateToScreen(ScreenNames.dogsStore)}style={styles.touch}>
                <Image source={Images.dogIcon()} style={styles.cartImage} />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigateToScreen(ScreenNames.cart)}style={styles.touch}>
                <Image source={Images.cart()} style={styles.cartImage} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    touch: {
        
        width:70,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    cartImage: {
        height: 40,
        width: 40,

    },
    goback: {
       
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#3D2B1F',
        height: 50,
    },
    bottomBarItem: {
        color: 'white',

        fontSize: 16,
    },
});

export default BottomBar;

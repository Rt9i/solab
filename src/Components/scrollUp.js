import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import Images from '../assets/images/images';

const ScrollUp = ({ scrollViewRef }) => {

    const handlePress = () => {
        // If scrollViewRef is passed, scroll it to the top
        if (scrollViewRef && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
        // If you want to scroll the window (for general web use):
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <View style={styles.arrowContainer}>
            <TouchableOpacity style={styles.touch} onPress={handlePress} activeOpacity={0.9}>
                <View style={styles.img}>
                    <Image style={[styles.img,{resizeMode:'contain'}]} source={Images.twoArrows()} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ScrollUp;

const styles = StyleSheet.create({
    img: {
        height: 20,
    
    },
    touch: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 80,
        right: 10,
    },
});

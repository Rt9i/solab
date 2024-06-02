import { StyleSheet, TouchableOpacity, Animated, Easing, View, Image } from 'react-native';
import React, { useRef, useEffect } from 'react';
import Images from '../assets/images/images';

const ScrollUp = ({ scrollViewRef }) => {
    const translateY = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        if (scrollViewRef && scrollViewRef.current) {
            // Scroll the screen to the top
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }

        // Add animation for the arrow
        Animated.timing(translateY, {
            toValue: -900, // Adjust the value to move the arrow all the way up
            duration: 300, // Adjust the duration of the animation
            easing: Easing.ease, // Add easing for a smoother animation
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        const animationListener = translateY.addListener(({ value }) => {
            // Check if the animation has completed (reached the target value)
            if (value === -900) {
                // Reset translateY value to bring the arrow back to its original position
                translateY.setValue(0);
            }
        });

        return () => {
            // Clean up the listener when the component unmounts
            translateY.removeListener(animationListener);
        };
    }, [translateY]);

    return (
        <Animated.View style={[styles.arrowContainer, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.touch} onPress={handlePress} activeOpacity={0.9}>
                <View style={styles.img}>
                    <Image style={styles.img} source={Images.twoArrows()} />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ScrollUp;

const styles = StyleSheet.create({
    img: {
        height: 20,
        resizeMode: 'contain',
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
        bottom: 10,
        right: 10,
    },
});

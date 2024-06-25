import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Animated, Image, StyleSheet } from 'react-native';
import Sizes from '../res/sizes';
import Images from '../assets/images/images';

const imageList = [Images.saleTest(), Images.premioSale(),];

// Define color sets for each image
const colorsList = [
    ['#FF6347', '#FFA07A', '#FF4500', '#FF6347'],
    ['#4682B4', '#5F9EA0', '#00CED1', '#4682B4']
];

const SlideAndSnapAnimation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dotSizes, setDotSizes] = useState(Array(imageList.length).fill().map(() => new Animated.Value(8))); // Start with small size
    const [gridColors, setGridColors] = useState(colorsList[0]); // Initial colors

    useEffect(() => {
        animateDotSize(activeIndex); // Initial animation for active dot size
        setGridColors(colorsList[activeIndex]); // Set initial grid colors
    }, []);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(scrollPosition / Sizes.screenWidth);

        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
            animateDotSize(newIndex);
            setGridColors(colorsList[newIndex]); // Update grid colors
        }
    };

    const animateDotSize = (index) => {
        const newDotSizes = dotSizes.map((size, i) => {
            return Animated.spring(size, {
                toValue: i === index ? 10 : 8,
                useNativeDriver: false,
            });
        });

        Animated.parallel(newDotSizes).start();
    };

    const renderPaginationDots = () => {
        return imageList.map((_, index) => (
            <Animated.View
                key={index}
                style={[
                    styles.dot,
                    {
                        backgroundColor: index === activeIndex ? 'black' : 'white',
                        opacity: index === activeIndex ? 1 : 0.6,
                        width: dotSizes[index],
                        height: dotSizes[index],
                    }
                ]}
            />
        ));
    };

    const renderGrid = () => {
        return (
            <View style={styles.gridContainer}>
                {gridColors.map((color, index) => (
                    <View key={index} style={[styles.gridItem, { backgroundColor: color }]} />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderGrid()}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {imageList.map((image, index) => (
                    <View key={index} style={styles.slideContainer}>
                        <Image
                            source={image}
                            style={styles.image}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.dotsContainer}>
                {renderPaginationDots()}
            </View>
        </View>
    );
};

export default SlideAndSnapAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideContainer: {
        width: Sizes.screenWidth,
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    dotsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 5,
        left: 0,
        right: 0,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    gridContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItem: {
        width: '25%',
        height: '25%',
    },
});

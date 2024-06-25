import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Animated, Easing, Dimensions } from 'react-native';
import Images from '../assets/images/images';
import SolabContext from '../store/solabContext';

const CatsBarItems = ({ selectedCategory, setSelectedCategory, Array }) => {
    const { strings, changeLanguage } = useContext(SolabContext);
    const categoriesMap = Object.assign({}, ...Array);

    const categories = [
        { id: categoriesMap.Food, name: `${strings.DryFood}`, image: Images.catFood() },
        { id: categoriesMap.Meat, name: `${strings.meat}`, image: Images.Meat() },
        { id: categoriesMap.Accessories, name: `${strings.accessories}`, image: Images.leash() },
        { id: categoriesMap.Clothes, name: `${strings.Clothes}`, image: Images.catClothes() },
        { id: categoriesMap.Sprays, name: `${strings.Sprays}`, image: Images.spray() },
        { id: categoriesMap.Toilet, name: `${strings.toilet}`, image: Images.toilet() },
        { id: categoriesMap.Treats, name: `${strings.treats}`, image: Images.treats() },
        { id: categoriesMap.Perfume, name: `${strings.perfume}`, image: Images.perfume() },
        { id: categoriesMap.bowl, name: `${strings.bowl}`, image: Images.bowl() },
    ];

    const [animatedValues, setAnimatedValues] = useState(categories.map(() => new Animated.Value(1)));
    const flatListRef = useRef(null);

    const renderBarItems = (category, index) => {
        const accessoriesStyle = {
            borderWidth: 1,
            fontSize: 10,
        };

        const animateBounce = () => {
            Animated.sequence([
                Animated.timing(animatedValues[index], {
                    toValue: 1.05,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValues[index], {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        return (
            <Animated.View style={[styles.categoryStyle, { transform: [{ scale: animatedValues[index] }] }]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={category.id}
                    style={[
                        styles.category,
                        { backgroundColor: selectedCategory === category.id ? '#7391c8' : '#4e5e7f' },
                    ]}
                    onPress={() => {
                        setSelectedCategory(category.id);
                        animateBounce();
                        scrollToCategory(index);
                    }}
                >
                    <Image source={category.image} style={styles.categoryImage} />
                    <Text style={[styles.categoryText, category.id === 'catAccessories' ? accessoriesStyle : null]}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const renderBar = () => (
        <FlatList
            ref={flatListRef}
            data={categories}
            renderItem={({ item, index }) => renderBarItems(item, index)}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.FlatList}
            horizontal={true}
        />
    );

    const scrollToCategory = (index) => {
        // Calculate the width of each item in the FlatList
        const itemWidth = 79; // Width of each item, adjust as per your styles
        const screenWidth = Dimensions.get('window').width;
        const scrollToX = index * itemWidth - (screenWidth / 2 - itemWidth / 2); // Adjusted scroll position

        flatListRef.current.scrollToOffset({ animated: true, offset: scrollToX });
    };

    return renderBar();
};

export default CatsBarItems;

const styles = StyleSheet.create({
    txt: {
        fontSize: 50,
        textAlign: 'center',
    },
    test: {
        backgroundColor: 'red',
    },
    categoryStyle: {
        width: 70,
        height: 70,
        marginTop: 5,
        marginRight: 8,
        flex: 1,
    },
    category: {
        flex: 1,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 50,
    },
    categoryImage: {
        height: 70,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 100,
    },
    categoryText: {
        color: 'black',
        fontFamily: 'smallFont',
        backgroundColor: '#84a1d2',
        fontSize: 12,
        height: 20,
        width: 60,
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'center',
    },
    FlatList: {
        width: '100%',
        height: 100,
        paddingHorizontal: 10,
    },
});

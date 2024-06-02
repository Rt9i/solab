import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Animated, Easing } from 'react-native';
import Images from '../assets/images/images';
import strings from '../res/strings';

const CatsBarItems = ({ selectedCategory, setSelectedCategory, Array }) => {

    const categories = [
        { id: Array[0].Food, name: `${strings.DryFood}`, image: Images.catFood() },
        { id: Array[1].Meat, name: `${strings.meat}`, image: Images.Meat() },
        { id: Array[2].Accessories, name: `${strings.accessories}`, image: Images.leash() },
        { id: Array[3].Clothes, name: `${strings.Clothes}`, image: Images.catClothes() },
        { id: Array[4].Sprays, name: `${strings.Sprays}`, image: Images.spray() },
        { id: Array[5].Toilet, name: `${strings.toilet}`, image: Images.toilet() },
        { id: Array[6].Perfume, name: `${strings.treats}`, image: Images.treats() },
    
    ];

    const [animatedValues, setAnimatedValues] = useState(categories.map(() => new Animated.Value(1)));

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
            data={categories}
            renderItem={({ item, index }) => renderBarItems(item, index)}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.FlatList}
            horizontal={true}
        />
        // Function()
    );

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

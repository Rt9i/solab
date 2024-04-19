import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Images from '../assets/images/images';
import strings from '../res/strings';


const CatsBarItems = ({ selectedCategory, setSelectedCategory }) => {
    const categories = [
        { id: 'catFood', name: `${strings.DryFood}`, image: Images.catFood() },
        { id: 'catMeat', name: `${strings.meat}`, image: Images.Meat() },
        { id: 'catAccessories', name: `${strings.accessories}`, image: Images.leash() },
        { id: 'catClothes', name: `${strings.Clothes}`, image: Images.catClothes() },
        { id: 'catSprays', name: `${strings.Sprays}`, image: Images.spray() },
        { id: 'catToilet', name: `${strings.toilet}`, image: Images.toilet() },
    ];

    const renderBarItems = (category) => {
        const accessoriesStyle = {
            borderWidth: 1,
            fontSize: 10,
        };
        return (
            <View style={styles.categoryStyle}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={category.id}
                    style={[
                        styles.category,
                        { backgroundColor: selectedCategory === category.id ? '#7391c8' : '#4e5e7f' },
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                >
                    <Image source={category.image} style={styles.categoryImage} />
                    <Text style={[styles.categoryText, category.id === 'catAccessories' ? accessoriesStyle : null]}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderBar = () => (
        <FlatList
            data={categories}
            renderItem={({ item }) => renderBarItems(item)}
            keyExtractor={(item) => item.id}
            numColumns={5}
            scrollEnabled={false}
            style={styles.FlatList}

        />
    );

    return renderBar();
};

export default CatsBarItems;

const styles = StyleSheet.create({
    categoryStyle: {
        width: 70,
        height: 70,
        paddingBottom: 20,
        flex: 1,

    },
    category: {
        flex: 1,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 50,

    },
    categoryImage: {
        width: '100%',
        height: '100%',
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
        height: 140,
        paddingHorizontal: 10,
    },


});

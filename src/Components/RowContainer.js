import { StyleSheet, View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { rowTitlesByCategory } from '../res/Data';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';

const RowContainer = ({ items, renderItem, text, selectedCategory, row, catMeat }) => {
    const itemWidth = 115;
    const totalWidth = items.length * itemWidth;
    const shouldScroll = totalWidth > Dimensions.get('window').width;
    const navigation = useNavigation()

    const onSeeAllPress = () => {
      
        navigation.navigate(ScreenNames.seeAll, { items, renderItem });
    };

    

    if (!items?.length) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.txtcont}>
                <TouchableOpacity onPress={onSeeAllPress} style={styles.touch}>

                    <View style={styles.seeAll}>
                        <Text style={styles.seAll}>see All -{">"}</Text>
                    </View>
                </TouchableOpacity>


                {Boolean(text) && (
                    <Text style={styles.txt}>{text}</Text>
                )}





            </View>


            <ScrollView
                style={styles.scroll}
                horizontal={shouldScroll}
                showsHorizontalScrollIndicator={shouldScroll}
                decelerationRate={shouldScroll ? 'fast' : 'normal'}
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: shouldScroll ? 0 : 1 }}
            >
                <View style={styles.row}>
                    {items.map((item, index) => renderItem({ item, index }))}
                </View>
            </ScrollView>
        </View>
    );
};

export default RowContainer;

const styles = StyleSheet.create({
    touch: {
        borderWidth: 0.3,
        borderRadius: 10,
        height: 20,
    },
    seeAll: {
        marginRight: 10,
    },
    txtcont: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingRight: 10,
        marginBottom: 3,
    },
    seAll: {
        elevation: 24,
        fontFamily: 'smallFont',
        textAlign: 'center',

        borderRadius: 10,

        color: 'black',
    },
    txt: {
        elevation: 24,
        fontFamily: 'bigFont',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgba(176, 196, 222, 0.7)',
        color: 'black',
    },
    container: {
        flex: 1,
        marginBottom: 20,
        marginLeft: 15,
    },
    scroll: {},
    row: {
        flexDirection: 'row',
    },
});
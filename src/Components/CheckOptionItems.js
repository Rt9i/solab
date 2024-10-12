import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import getCategoryItemsData from '../res/Data';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SolabContext from '../store/solabContext';
import strings from '../res/strings';
import { useNavigation } from '@react-navigation/native';
const CheckOptionItems = ({
    optionsVisible,
    setOptionsVisible,
    selectedCategory,
    selectedBrands,
    setSelectedBrands,
    getFilteredItems,
}) => {

    const { brands, setBrands } = useContext(SolabContext);
    const navigation = useNavigation();

    const brandsInData = () => {
        const filteredBrands = getCategoryItemsData.filter(item => item.category.includes(selectedCategory));
        return new Set(filteredBrands.map(item => item.brand));
    };

    const onFocuseHandler = () =>{
        const brandsArray = [...brandsInData()];
        const mappedBrands = brandsArray.map((brand) => ({
            brand: brand,
            check: true,
        }));

        mappedBrands.unshift({ brand: 'All', check: true });
        setOptionsVisible(false);
        setBrands(mappedBrands);
    };

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
           onFocuseHandler();
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            setOptionsVisible(false);
        });

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        };
    }, [navigation, selectedCategory]);


    const selectedBrandsOnCategory = () => {
        const brandsArray = [...brandsInData()];

        return setSelectedBrands(brandsArray);
    };
    useEffect(() => {
        selectedBrandsOnCategory();
    }, [selectedCategory, allSelected]);

    const checkedItems = () => {
        const brandsArray = [...brandsInData()];
        const mappedBrands = brandsArray.map((brand) => ({
            brand: brand,
            check: true,
        }));

        mappedBrands.unshift({ brand: 'All', check: true });

        return mappedBrands;
    };


    const allSelected = (val) => {
        const brandsArr = brands.map(brand => ({ ...brand, check: val }));
        setBrands(brandsArr);

        const allChecked = brandsArr.slice(1).every(brand => brand.check);
        const selectedBrands = allChecked ? brandsArr.slice(1).map(brand => brand.brand) : ['All'];
        setSelectedBrands(selectedBrands);
    };

    const onCheckBoxPress = (value, index) => {
        const brandsArr = [...brands];

        if (index === 0) {
            allSelected(value);
            return;
        }

        brandsArr[index].check = value;

        const selectedBrands = brandsArr.filter(brand => brand.check).map(brand => brand.brand);
        setSelectedBrands(selectedBrands);

        const allChecked = brandsArr.slice(1).every(brand => brand.check);
        brandsArr[0].check = allChecked;

        setBrands(brandsArr);
    };



    const renderOptions = () => {

        return brands.map((brand, index) => {
            return <BouncyCheckbox
                text={brand.brand}
                isChecked={brand.check}
                fillColor="black"
                onPress={(val) => onCheckBoxPress(val, index)} />;

        });
    };

    const handleToggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

    useEffect(() => {
        setBrands(checkedItems());

    }, [selectedCategory]);

    useEffect(() => {
        getFilteredItems();
        brandsInData();
    }, [selectedCategory]);
    return (
        <View style={styles.checkcontainer}>
            <TouchableOpacity onPress={handleToggleOptions} activeOpacity={0.8}>
                <View style={styles.checkboxesContainer}>
                    <Text style={styles.titleSynthetic}>{strings.brands} {optionsVisible ? '⌄' : '>'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.brand}>
                {optionsVisible && renderOptions()}
            </View>

        </View>
    );
};




export default CheckOptionItems;
const styles = StyleSheet.create({
    brand: {
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 2,
    },
    BouncyCheckbox: {
        flexDirection: 'row',
        paddingBottom: 3,

    },
    row: {
        flexDirection: 'row',
    },
    optionsstyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 2,
        elevation: 24,
        height: 100,
    },
    scrollView: {
        width: 200,
        height: 250,
        backgroundColor: 'lightgray',
        elevation: 24,
    },
    checkcontainer: {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'column',
    },
    optionTxt: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    optionsContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    titleSynthetic: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 10,
        width: 80,
        textAlign: 'center',
    },
    checkboxesContainer: {
        flexDirection: 'row',
        zIndex: 1,
    },
});

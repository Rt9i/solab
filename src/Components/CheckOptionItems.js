import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import CheckBoxItem from '../Components/CheckBoxItem';

const CheckOptionItems = ({
    optionsVisible,
    setOptionsVisible,
    mongetStat,
    setMongetstat,
    friskiesStat,
    setFriskiesStat,
    reflexStat,
    setReflexStat,
    premioStat,
    setPremioStat,
    allStat,
    setAllStat,
    setSelectedBrands,
    selectedCategory,
    solostat,
    setSolostat,

}) => {
    const selected = [];

    useEffect(() => {
        selected.splice(0, selected.length)
        console.log(selected)
    }, [selectedCategory]);



    const checkOptionsForRender = () => {

        if (solostat) selected.push('solo');
        if (mongetStat) selected.push('monge');
        if (friskiesStat) selected.push('Friskies');
        if (premioStat) selected.push('premio');
        if (reflexStat) selected.push('Reflex');

        setSelectedBrands(selected);
        console.log(selected)
    }


    const checkIfAllOptionsChecked = () => {


        if (
            mongetStat &&
            friskiesStat &&
            reflexStat &&
            premioStat

        ) {
            setAllStat(true);
        } else {
            setAllStat(false);
        }
    };

    useEffect(() => {
        checkOptionsForRender()
        checkIfAllOptionsChecked();
    }, [mongetStat, friskiesStat, reflexStat, premioStat, solostat]);



    const toggleAll = () => {
        if (allStat) {
            setMongetstat(false);
            setFriskiesStat(false);
            setReflexStat(false);
            setPremioStat(false);
            setAllStat(false);
        } else {
            setMongetstat(true);
            setFriskiesStat(true);
            setReflexStat(true);
            setPremioStat(true);
            setAllStat(true);
        }
    };

    const toggleMongetstat = () => {
        setMongetstat(!mongetStat);
    };
    const toggleSoloStat = () => {
        setSolostat(!solostat);

    }
    const togglefriskiesStat = () => {
        setFriskiesStat(!friskiesStat);
    };

    const togglereflexStat = () => {
        setReflexStat(!reflexStat);
    };

    const togglepremioStat = () => {
        setPremioStat(!premioStat);

    };
    const catToiletCheckBox = () => {
        return (selectedCategory === 'catToilet' ? (

            <View>
                <TouchableOpacity onPress={toggleAll}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglepremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                        <Text style={styles.optionTxt}>toilets</Text>
                    </View>
                </TouchableOpacity>
            </View>

        ) : null
        )
    }
    const catSpraysCheckBox = () => {
        return (selectedCategory === 'catSprays' ? (

            <View>
                <TouchableOpacity onPress={toggleAll}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglepremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                        <Text style={styles.optionTxt}>sprays</Text>
                    </View>
                </TouchableOpacity>
            </View>

        ) : null
        )
    }
    const catClothesCheckBox = () => {
        return (selectedCategory === 'catClothes' ? (

            <View>
                <TouchableOpacity onPress={toggleAll}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglepremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                        <Text style={styles.optionTxt}>clothes</Text>
                    </View>
                </TouchableOpacity>
            </View>

        ) : null
        )
    }
    const catAccessoriesCheckBox = () => {
        return (selectedCategory === 'catAccessories' ? (

            <View>
                <TouchableOpacity onPress={toggleAll}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglepremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                        <Text style={styles.optionTxt}>accessories</Text>
                    </View>
                </TouchableOpacity>
            </View>

        ) : null
        )
    }
    const catMeatCheckBox = () => {
        return (selectedCategory === 'catMeat' ? (

            <View>
                <TouchableOpacity onPress={toggleAll}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglepremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                        <Text style={styles.optionTxt}>Premio</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSoloStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleSoloStat} isChecked={solostat} />
                        <Text style={styles.optionTxt}>Solo</Text>
                    </View>
                </TouchableOpacity>
            </View>

        ) : null
        )
    }
    const catFoodCheckBox = () => {
        return (
            selectedCategory === 'catFood' ? (
                <View>
                    <TouchableOpacity onPress={toggleAll}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={toggleAll} isChecked={allStat} />
                            <Text style={styles.optionTxt}>All</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleMongetstat}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={toggleMongetstat} isChecked={mongetStat} />
                            <Text style={styles.optionTxt}>Monge</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglefriskiesStat}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={togglefriskiesStat} isChecked={friskiesStat} />
                            <Text style={styles.optionTxt}>Friskies</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglepremioStat}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={togglepremioStat} isChecked={premioStat} />
                            <Text style={styles.optionTxt}>Premio</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglereflexStat}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={togglereflexStat} isChecked={reflexStat} />
                            <Text style={styles.optionTxt}>Reflex</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : null
        )

    }

    const renderOptions = () => {
        return (
            <ScrollView>

                <View style={styles.optionsstyle}>
                    {catFoodCheckBox()}
                    {catMeatCheckBox()}
                    {catAccessoriesCheckBox()}
                    {catClothesCheckBox()}
                    {catSpraysCheckBox()}
                    {catToiletCheckBox()}

                </View>
            </ScrollView>
        );
    };


    const renderCheckItems = () => {
        const handleToggleOptions = () => {
            setOptionsVisible(!optionsVisible);
        };

        return (
            <View style={styles.checkcontainer}>
                <TouchableOpacity onPress={handleToggleOptions} activeOpacity={0.8}>
                    <View style={styles.checkboxesContainer}>
                        <Text style={styles.titleSynthetic}>brands {optionsVisible ? '⌄' : '>'}</Text>
                    </View>
                </TouchableOpacity>
                {optionsVisible && renderOptions()}
            </View>
        );
    };

    return renderCheckItems();

};

export default CheckOptionItems;
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },

    optionsstyle: {
        backgroundColor: 'white',
        borderRadius: 10,

        elevation: 24,

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
        borderWidth: 2,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 10,
        width: 80,
        textAlign: 'center',
    },
    checkboxesContainer: {
        flexDirection: 'row',
    },


})
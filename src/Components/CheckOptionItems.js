import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
const CheckOptionItems = ({
    optionsVisible,
    setOptionsVisible,
    setSelectedBrands,
    selectedCategory,
}) => {
    const [allStat, setAllStat] = useState(true);
    const [meatAllStat, setMeatAllStat] = useState(true);
    const [catAccessoriesAllStat, setCatAccessoriesAllStat] = useState(true);
    const [catClothesAllStat, setCatClothesAllStat] = useState(true)
    const [catSpraysAllStat, setCatSpraysAllStat] = useState(true)
    const [catToiletAllStat, setCatToiletAllStat] = useState(true)

    const [mongetStat, setMongetstat] = useState(true);
    const [friskiesStat, setFriskiesStat] = useState(true);
    const [reflexStat, setReflexStat] = useState(true);
    const [premioStat, setPremioStat] = useState(true);
    const [meatPremioStat, setMeatPremioStat] = useState(true);
    const [solostat, setSolostat] = useState(true);
    const [accessoriesstat, setAccessories] = useState(true);
    const [clothesstat, setClothes] = useState(true);
    const [spraysStat, setSprayStat] = useState(true);
    const [toiletStat, setToiletStat] = useState(true);
    const selected = [];
// if you wanna add a new brand add it in the checkOptionsForRender and catDryFoodCheckedOptions as a Condition or any other CheckedOptions and make a toggle for it like toggleMongetstat

    const CheckBoxItem = ({ onPress, isChecked }) => {
        return (
            <View style={styles.BouncyCheckbox}>
                <BouncyCheckbox
                    disableText
                    fillColor="#9342f5"
                    size={20}
                    iconImageStyle={styles.iconImageStyle}
                    iconStyle={{ borderColor: '#9342f5' }}
                    onPress={onPress}
                    isChecked={isChecked}
                />
            </View>
        );
    };

    const checkOptionsForRender = () => {
        const selected = [];

        if (selectedCategory === 'catFood') {
            if (mongetStat) selected.push('monge');
            if (friskiesStat) selected.push('Friskies');
            if (premioStat) selected.push('premio');
            if (reflexStat) selected.push('Reflex');
        }

        if (selectedCategory === 'catMeat') {
            if (solostat) selected.push('solo');
            if (meatPremioStat) selected.push('premio');
        }

        if (selectedCategory === 'catAccessories') {
            if (accessoriesstat) selected.push('accessories');
        }

        if (selectedCategory === 'catClothes') {
            if (clothesstat) selected.push('clothes');
        }

        if (selectedCategory === 'catSprays') {
            if (spraysStat) selected.push('sprays');
        }

        if (selectedCategory === 'catToilet') {
            if (toiletStat) selected.push('toilet');
        }
        setSelectedBrands(selected);
        console.log('selected: ', selected);
    };

    const catDryFoodCheckedOptions = () => {
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
    const catMeatCheckedOptions = () => {
        if (
            meatPremioStat &&
            solostat

        ) {
            setMeatAllStat(true);
        } else {
            setMeatAllStat(false);
        }
    };
    const catAccessoriesCheckedOptions = () => {
        if (
            accessoriesstat
        ) {
            setCatAccessoriesAllStat(true);
        } else {
            setCatAccessoriesAllStat(false);
        }
    };
    const catClothesCheckedOptions = () => {
        if (
            clothesstat
        ) {
            setCatClothesAllStat(true);
        } else {
            setCatClothesAllStat(false);
        }
    };
    const catSpraysCheckedOptions = () => {
        if (
            spraysStat
        ) {
            setCatSpraysAllStat(true);
        } else {
            setCatSpraysAllStat(false);
        }
    };
    const catToiletCheckedOptions = () => {
        if (
            toiletStat
        ) {
            setCatToiletAllStat(true);
        } else {
            setCatToiletAllStat(false);
        }
    };

    useEffect(() => {
        catSpraysCheckedOptions()
        checkOptionsForRender()
        catDryFoodCheckedOptions();
        catMeatCheckedOptions()
        catAccessoriesCheckedOptions()
        catClothesCheckedOptions()
        catToiletCheckedOptions()
    }, [mongetStat, friskiesStat, reflexStat, premioStat, solostat, meatPremioStat, selectedCategory, toiletStat, accessoriesstat, clothesstat, spraysStat, toiletStat]);

    const toggleAllCatToilet = () => {
        if (catToiletAllStat) {
            setCatToiletAllStat(false)
            setToiletStat(false)
        } else {
            setCatToiletAllStat(true)
            setToiletStat(true)
        }

    }
    const toggleAllCatSprays = () => {
        if (catSpraysAllStat) {
            setCatSpraysAllStat(false)
            setSprayStat(false)
        } else {
            setCatSpraysAllStat(true)
            setSprayStat(true)
        }

    }
    const toggleAllCatClothes = () => {
        if (catClothesAllStat) {
            setCatClothesAllStat(false)
            setClothes(false)
        } else {
            setCatClothesAllStat(true)
            setClothes(true)
        }

    }
    const toggleAllCatAccessories = () => {
        if (catAccessoriesAllStat) {
            setCatAccessoriesAllStat(false)
            setAccessories(false)
        } else {
            setCatAccessoriesAllStat(true)
            setAccessories(true)
        }

    }
    const toggleAllcatMeat = () => {
        if (meatAllStat) {
            setMeatAllStat(false)
            setMeatPremioStat(false)
            setSolostat(false)

        } else {
            setMeatAllStat(true)
            setMeatPremioStat(true)
            setSolostat(true)

        }

    }
    const toggleAllCatfood = () => {
        if (allStat) {
            setMongetstat(false);
            setFriskiesStat(false);
            setReflexStat(false);
            setPremioStat(false);
            setSolostat(false);
            setAllStat(false);
        } else {
            setMongetstat(true);
            setFriskiesStat(true);
            setReflexStat(true);
            setPremioStat(true);
            setSolostat(true);
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
    const toggleMeatpremioStat = () => {
        setMeatPremioStat(!meatPremioStat);
    };
    const toggleAccessoriesStat = () => {
        setAccessories(!accessoriesstat);
    };
    const toggleCatClothes = () => {
        setClothes(!clothesstat)

    }
    const toggleCatSpraysStat = () => {
        setSprayStat(!spraysStat)

    }
    const toggleToiletStat = () => {
        setToiletStat(!toiletStat)

    }

    const catToiletCheckBox = () => {
        return (selectedCategory === 'catToilet' ? (

            <View>
                <TouchableOpacity onPress={toggleAllCatToilet}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAllCatToilet} isChecked={catToiletAllStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleToiletStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleToiletStat} isChecked={toiletStat} />
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
                <TouchableOpacity onPress={toggleAllCatSprays}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAllCatSprays} isChecked={catSpraysAllStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleCatSpraysStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleCatSpraysStat} isChecked={spraysStat} />
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
                <TouchableOpacity onPress={toggleAllCatClothes}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAllCatClothes} isChecked={catClothesAllStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleCatClothes}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleCatClothes} isChecked={clothesstat} />
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
                <TouchableOpacity onPress={toggleAllCatAccessories}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAllCatAccessories} isChecked={catAccessoriesAllStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAccessoriesStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAccessoriesStat} isChecked={accessoriesstat} />
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
                <TouchableOpacity onPress={toggleAllcatMeat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleAllcatMeat} isChecked={meatAllStat} />
                        <Text style={styles.optionTxt}>All</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleMeatpremioStat}>
                    <View style={styles.row}>
                        <CheckBoxItem onPress={toggleMeatpremioStat} isChecked={meatPremioStat} />
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
                <View >
                    <TouchableOpacity onPress={toggleAllCatfood}>
                        <View style={styles.row}>
                            <CheckBoxItem onPress={toggleAllCatfood} isChecked={allStat} />
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
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CheckBoxItem = ({ onPress, isChecked }) => {
    return (
        <View style={styles.row}>
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

export default CheckBoxItem;


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
})
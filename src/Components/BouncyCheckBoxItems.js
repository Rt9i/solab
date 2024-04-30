import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
const CheckBox = (props) => {


    return (

        <BouncyCheckbox text={props.text} onPress={(val) => props.onCheckBoxChange?.(val)} />

    )
}

export default CheckBox

const styles = StyleSheet.create({

}) 
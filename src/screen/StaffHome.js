import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenNames from '../../routes/ScreenNames'
import SolabContext from '../store/solabContext'

const StaffHome = props => {
  const {setSelectedIcons} = useContext(SolabContext);
    nav = useNavigation()

    const navigateStore = () => {
        setSelectedIcons('cat'); 
        props.navigation.navigate(ScreenNames.catsStore);
      };
  return (
    <View>
      <Text>StaffHome</Text>
      <Button title='Go to home'onPress={()=>navigateStore()} />
    </View>
  )
}

export default StaffHome

const styles = StyleSheet.create({})
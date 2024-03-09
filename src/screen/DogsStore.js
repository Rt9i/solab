import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenNames from '../../routes/ScreenNames'
import BottomBar from '../Components/BottomBar'

const DogsStore =  () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.selectBar}></View>


      <View style={styles.itemsContainer}></View>
      
   
    </View>
  )
}

export default DogsStore

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'

  },
  selectBar:{
    flex:1,
    flexDirection:'row',
    backgroundColor: 'black',

  },
  itemsContainer:{
    
    flex:10,
    backgroundColor:'grey',
  
  }
})
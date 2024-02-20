import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './routes/nav'
const App = () => {
  function navigateHome(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.')
  }
  return (
    <View style={styles.conatiner}>
      <View style={styles.conatiner}>
        <MainNavigation />
        
       
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    
  },
})
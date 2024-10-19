import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useRouter} from 'expo-router'; // Use the router from expo-router
import SolabContext from '../src/store/solabContext';
import Images from '@/src/assets/images/images';

const StaffHome = () => {
  const {setSelectedIcons} = useContext(SolabContext);
  const router = useRouter(); // Get the router instance

  const navigateStore = () => {
    setSelectedIcons('cat');
    router.navigate('CatsStore'); // Use router to navigate to CatsStore
  };
  const navEditProducts = () => {
    router.navigate('EditProduct')
  };

  return (
    <View style={styles.container}>
      <Text>Staff Home</Text>
      <Button
        title="Go to Edit Product"
        onPress={navEditProducts} // Call the function directly
        color={'green'}
      />
      <Button
        title="Go to Cats Store"
        onPress={navigateStore} // Call the function directly
      />
    </View>
  );
};

export default StaffHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
});

import React, {useContext} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRouter} from 'expo-router'; // Import useRouter from expo-router
import Images from '../src/assets/images/images';
import SolabContext from '../src/store/solabContext';
import {LinearGradient} from 'expo-linear-gradient';

const Home = () => {
  const router = useRouter(); // Initialize the router
  const {setSelectedIcons} = useContext(SolabContext);
  const nav = useNavigation();
  // Function to navigate and set selectedIcons
  const navigateStore = value => {
    setSelectedIcons(value);
    nav.navigate('CatsStore'); // Use router.push() for navigation
  };

  // Function to render each food item
  const renderUi = (
    foodType,
    imageSource,
    buttonText,
    gradientColors,
    textStyle,
  ) => (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.7, 1]}
      style={styles.liner}>
      <TouchableOpacity
        onPress={() => navigateStore(foodType)}
        style={styles.touch}>
        <Image source={imageSource} style={styles.image} />
        <Text style={textStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {renderUi(
          'dog',
          Images.dog(),
          'Dog Food',
          ['#808080', '#000000', '#000000'],
          styles.dogButtonText,
        )}
      </View>
      <View style={{flex: 1}}>
        {renderUi(
          'cat',
          Images.cat(),
          'Cat Food',
          ['#6CCAFF', '#0066FF', '#004C99'],
          styles.catButtonText,
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  liner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    height: 250,
    width: 190,
  },
  dogButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
  },
  catButtonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
  },
});

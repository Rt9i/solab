import React, {useContext} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../assets/images/images';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';

const Home = props => {
  const {setSelectedIcons} = useContext(SolabContext);
  
  // Function to navigate and set selectedIcons
  const navigateStore = value => {
    setSelectedIcons(value); 
    props.navigation.navigate(ScreenNames.catsStore);
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
      style={styles.fullScreenContainer}>
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
      {renderUi(
        'dog',
        Images.dog(),
        'Dog Food',
        ['#808080', '#000000', '#000000'],
        styles.dogButtonText,
      )}
      {renderUi(
        'cat',
        Images.cat(),
        'Cat Food',
        ['#6CCAFF', '#0066FF', '#004C99'],
        styles.catButtonText,
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

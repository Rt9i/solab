import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import Images from '../assets/images/images';

const Swipe = ({onScroll}) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay
        autoplayTimeout={6}
        loop
        onScroll={onScroll}
        nextButton={<Text style={styles.arrow}>›</Text>}
        prevButton={<Text style={styles.arrow}>‹</Text>}>
        <View style={styles.slide1}>
          <Image source={Images.saleTest()} style={styles.img} />
        </View>

        <View style={styles.slide1}>
          <Image source={Images.saleTest()} style={styles.img} />
        </View>
      </Swiper>
    </View>
  );
};
export default Swipe;
const styles = StyleSheet.create({
  arrow: {
    color: 'white', // Change arrow color
    fontSize: 50,   // Adjust size if needed
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  
  img: {
    resizeMode: 'contain',
    width: '100%',
  },
  container: {
    height: 230,
    maxHeight: 400,
    maxWidth: 780,
    overflow: 'hidden',

    zIndex: 1, // Ensure it's above other components
  },
  wrapper: {
    height: '100%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

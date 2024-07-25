import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import Images from '../assets/images/images';

const Swipe = ({onScroll}) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay
        autoplayTimeout={5}
        loop
        onScroll={onScroll}>
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
  img: {
    resizeMode: 'contain',
    width: '100%',
  },
  container: {
    height: 200, // Adjust height as needed
    width: '100%',
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
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

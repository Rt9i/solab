import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import Images from '../assets/images/images';

const Swipe = ({onScroll}) => {
  const data = [
    {id: 1, img: Images.saleTest()},
    {id: 2, img: Images.saleTest()},
    {id: 3, img: Images.saleTest()},
    {id: 4, img: Images.saleTest()},
    {id: 5, img: Images.saleTest()},
  ];

  const renderImg = () => {
    return data.map(item => (
      <View key={item.id} style={styles.slide1}>
        <Image
          source={item.img}
          style={[styles.img, {resizeMode: 'contain'}]}
        />
      </View>
    ));
  };

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
        {renderImg()}
      </Swiper>
    </View>
  );
};
export default Swipe;
const styles = StyleSheet.create({
  arrow: {
    height: '100%',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  img: {
    width: '100%',
  },
  container: {
    height:200,
    width: '100%',
    maxWidth:600,
    overflow: 'hidden',
    zIndex: 1,
  },
  wrapper: {
    height: '100%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

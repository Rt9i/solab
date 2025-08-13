import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images/images';

const Swipe = () => {
  const data = [
    {id: 1, img: Images.saleTest()},
    {id: 2, img: Images.Meat()},
    {id: 4, img: Images.catFood()},
    {id: 5, img: Images.catIcon1()},
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [delay, setDelay] = useState(5000); // Start with 5 seconds

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
    setDelay(6000);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    );
    setDelay(6000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide(); // Auto-slide after the delay
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer on component unmount or re-render
  }, [currentIndex, delay]); // Re-run effect when index or delay changes

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <TouchableOpacity onPress={prevSlide} style={styles.arrowLeft}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.page}>
          <Image source={data[currentIndex].img} style={styles.image} />
        </View>

        <TouchableOpacity onPress={nextSlide} style={styles.arrowRight}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <Text
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    maxHeight: 250,
    maxWidth: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    position: 'relative',
  },
  arrowLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 1,
    transform: [{translateY: -20}],
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1,
    transform: [{translateY: -20}],
  },
  arrowText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    fontSize: 30,
    color: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    color: '#fff',
  },
});

export default Swipe;

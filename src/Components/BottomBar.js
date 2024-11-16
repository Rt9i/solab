import React, {useContext, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

const BottomBar = () => {
  const navigation = useNavigation();
  const {selectedIcons, setSelectedIcons, strings} = useContext(SolabContext);

  const [expandedIcon, setExpandedIcon] = useState(null);

  const iconsArray = [
    {
      id: 1,
      category: 'cat',
      image: Images.catIcon1(),
    },
    {
      id: 2,
      category: 'dog',
      image: Images.dogIcon1(),
    },
  ];

  const expandBackground = icon => {
    const animation = new Animated.Value(0);

    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandedIcon({category: icon.category, animation});
  };

  const handleIconPress = icon => {
    setSelectedIcons(icon.category);
    if (expandedIcon?.category !== icon.category) {
      expandBackground(icon); // Trigger the expansion animation
    }
  };

  const renderDogCatIcon = () =>
    iconsArray.map(icon => {
      const backgroundSize =
        expandedIcon?.category === icon.category
          ? expandedIcon.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1], // Numeric values for scaling
            })
          : 1; // Default size when not expanded

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          key={icon.id}
          onPress={() => handleIconPress(icon)}
          style={styles.iconContainer}>
          <View style={styles.imgcontWrapper}>
            <View
              style={[
                styles.defaultBackground,
                {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Almost transparent white
                },
              ]}
            />
            <Animated.View
              style={[
                styles.expansionCircle,
                {
                  backgroundColor:
                    selectedIcons === icon.category
                      ? '#9ACD32'
                      : 'rgba(255, 255, 255, 0.3)', // White with transparency
                  transform: [{scale: backgroundSize}],
                  elevation: selectedIcons === icon.category ? 10 : 2,
                },
              ]}
            />
            <View
              style={[
                styles.imgcont,
                {
                  backgroundColor: 'transparent', // Transparent background for the icon
                  zIndex: 1, // Make sure the icon is above the background
                },
              ]}>
              <Image source={icon.image} style={styles.img} />
            </View>
          </View>
          <Text
            style={[
              styles.label,
              {color: selectedIcons === icon.category ? '#9ACD32' : '#888'},
            ]}>
            {strings[icon.category + 'sStore']}
          </Text>
        </TouchableOpacity>
      );
    });

  return <View style={styles.bottomBar}>{renderDogCatIcon()}</View>;
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
    borderRadius: 19, // Half of width/height for a circular shape
    overflow: 'hidden',
    position: 'relative',
  },
  imgcont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  defaultBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 19, // Ensure it is circular
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with transparency
    zIndex: 0, // Ensure it is below the expansion circle
  },
  expansionCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 19, // Ensure it is circular
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // White with transparency
    zIndex: 0, // Ensure it is below the icon
 
  },
  img: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  bottomBar: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 15,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    // fontFamily: 'bigFont',
  },
});

export default BottomBar;

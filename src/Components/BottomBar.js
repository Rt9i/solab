import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

const BottomBar = () => {
  const navigation = useNavigation();
  const { selectedIcons, setSelectedIcons,strings } = useContext(SolabContext);

  const handleIconPress = (category) => {
    setSelectedIcons(category); // Set selectedIcons to a single value
  };

  const iconsArray = [
    { id: 1, category: 'cat', image: Images.catIcon1() },
    { id: 2, category: 'dog', image: Images.dogIcon1() },
  ];

  const renderDogCatIcon = () =>
    iconsArray.map((icon) => (
      <TouchableOpacity
        activeOpacity={0.9}
        key={icon.id}
        onPress={() => handleIconPress(icon.category)}
        style={styles.iconContainer}
      >
        <View
          style={[
            styles.imgcont,
            {
              backgroundColor: selectedIcons === icon.category ? '#9ACD32' : 'rgba(225, 225, 225, 1)',
              borderColor: selectedIcons === icon.category ? '#9ACD32' : 'rgba(196, 196, 196, 1)',
            },
          ]}
        >
          <Image source={icon.image} style={styles.img} />
        </View>
        <Text style={[
          styles.label,
          { color: selectedIcons === icon.category ? '#9ACD32' : '#888' }
        ]}>
             {strings[icon.category + 'sStore']}
        </Text>
      </TouchableOpacity>
    ));

  return <View style={styles.bottomBar}>{renderDogCatIcon()}</View>;
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcont: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    width: 35, // Reduced width
    height: 35, // Reduced height
    borderRadius: 25, // Adjusted for new size
    backgroundColor: 'rgba(225, 225, 225, 1)', // Almost transparent background
    elevation: 3, // Slightly reduced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Adjusted shadow offset
    shadowOpacity: 0.2, // Reduced shadow opacity
    shadowRadius: 3, // Reduced shadow blur radius
  },
  img: {
    resizeMode: 'contain',
    width: 25, // Reduced image width
    height: 25, // Reduced image height
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60, // Slightly increased height to accommodate labels
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    
    fontFamily: 'bigFont',
  },
});

export default BottomBar;

import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

const CatsBarItems = ({
  selectedCategory,
  setSelectedCategory,
  Array,
  styling,
}) => {
  const { strings } = useContext(SolabContext);
  const categoriesMap = Object.assign({}, ...Array);

  const categories = [
    { id: categoriesMap.Food, name: strings.DryFood, image: Images.catFood() },
    { id: categoriesMap.Meat, name: strings.meat, image: Images.Meat() },
    { id: categoriesMap.Accessories, name: strings.accessories, image: Images.leash() },
    { id: categoriesMap.Clothes, name: strings.Clothes, image: Images.catClothes() },
    { id: categoriesMap.Sprays, name: strings.Sprays, image: Images.spray() },
    { id: categoriesMap.Toilet, name: strings.toilet, image: Images.toilet() },
    { id: categoriesMap.Treats, name: strings.treats, image: Images.treats() },
    { id: categoriesMap.Perfume, name: strings.perfume, image: Images.perfume() },
    { id: categoriesMap.bowl, name: strings.bowl, image: Images.bowl() },
  ];

  const [animatedValues] = useState(
    categories.map(() => new Animated.Value(1))
  );
  const flatListRef = useRef(null);

  const scrollToCategory = index => {
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  };

  const renderBarItem = ({ item, index }) => {
    const isSelected = selectedCategory === item.id;

    const onPress = () => {
      Animated.sequence([
        Animated.timing(animatedValues[index], {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setSelectedCategory(item.id);
      scrollToCategory(index);
    };

    return (
      <View style={styles.itemWrapper}>
        <Animated.View style={{ transform: [{ scale: animatedValues[index] }] }}>
          <TouchableOpacity
            style={[
              styles.button,
              isSelected && styles.buttonSelected  // only circle background changes
            ]}
            activeOpacity={0.8}
            onPress={onPress}
          >
            <Image
              source={item.image}
              style={styles.icon}               // icon always same
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.label}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styling || styles.barContainer}>
      <FlatList
        ref={flatListRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderBarItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CatsBarItems;

const styles = StyleSheet.create({
  barContainer: {
    width: '100%',
    maxWidth: 600,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  itemWrapper: {
    width: 80,
    alignItems: 'center',
    marginRight: 12,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4e5e7f',  // normal circle color
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#7391c8',  // lighter circle when selected
  },
  icon: {
    width: 40,
    height: 40,
  },
  label: {
    marginTop: 8,
    fontSize: 13,        // a bit bigger
    fontWeight: 'bold',  // bold text
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#84a1d2',  // label background
    paddingHorizontal: 6,
    borderRadius: 4,
  },
});

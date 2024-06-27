import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';

const RowContainer = ({ items, renderItem, text, selectedCategory }) => {
  const navigation = useNavigation();
  const flatListRef = useRef();

  const onSeeAllPress = () => {
    navigation.navigate(ScreenNames.seeAll, { items, renderItem });
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [selectedCategory]);

  if (!items?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All -&gt;</Text>
        </TouchableOpacity>
        {text && <Text style={styles.headerText}>{text}</Text>}
      </View>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RowContainer;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 3,
  },
  seeAllButton: {
    borderWidth: 0.3,
    borderRadius: 10,
    height: 20,
  },
  seeAllText: {
    fontFamily: 'smallFont',
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
  },
  headerText: {
    fontFamily: 'bigFont',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(176, 196, 222, 0.7)',
    color: 'black',
  },
});

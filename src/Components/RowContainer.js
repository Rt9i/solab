import React, { useContext, useEffect, useRef, memo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';

// Memoize the renderItem function to prevent unnecessary re-renders
const RenderItem = memo(({ item, renderItem }) => renderItem({ item }));

const RowContainer = ({ items, renderItem, text, selectedCategory }) => {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const { selectedIcons } = useContext(SolabContext);

  const onSeeAllPress = () => {
    navigation.navigate(ScreenNames.seeAll, { items, renderItem });
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [selectedCategory, selectedIcons]);

  if (!items?.length) {
    return null;
  }

  const screenWidth = Dimensions.get('window').width;
  const ITEM_WIDTH = 75; // Ensure this matches your item width
  const totalItemsWidth = items.length * ITEM_WIDTH;
  const shouldScroll = totalItemsWidth > screenWidth;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All -&gt;</Text>
        </TouchableOpacity>
        {text && <Text style={styles.headerText}>{text}</Text>}
      </View>
      <FlatList
        style={styles.items}
        ref={flatListRef}
        data={items}
        renderItem={({ item }) => <RenderItem item={item} renderItem={renderItem} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: shouldScroll ? 0 : 1 }}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        updateCellsBatchingPeriod={50} // Adjust for smoother scrolling
        removeClippedSubviews={Platform.OS === 'android'} // Only for Android
      />
    </View>
  );
};

export default RowContainer;

const styles = StyleSheet.create({
  items: {},
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
    height: 20,
  },
  seeAllText: {
    padding: 2,
    borderWidth: 0.3,
    fontFamily: 'smallFont',
    justifyContent: 'center',
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

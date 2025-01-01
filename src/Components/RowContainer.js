import React, {useContext, useEffect, useRef, memo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from 'expo-router';

import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

// Example "renderItem" with enough width for horizontal scroll
const RenderItem = memo(({item, renderItem}) => {
  return <View style={styles.itemContainer}>{renderItem({item})}</View>;
});

const RowContainer = ({
  items,
  renderItem,
  text,
  selectedCategory,
  index,
  row,
}) => {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const {selectedIcons, scrollToTop, user, strings} = useContext(SolabContext);

  const onSeeAllPress = () => {
    const itemsToSend = JSON.stringify(items);
    navigation.navigate('SeeAllProducts', {items: itemsToSend});
    console.log('Sending items:', itemsToSend);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [selectedCategory, selectedIcons]);

  useEffect(() => {
    if (scrollToTop && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [scrollToTop]);

  const navEdit = row => {
    navigation.navigate('EditProduct', {category: [`${row}`]});
  };

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {user?.role === 'staff' && (
        <TouchableOpacity
          onPress={() => navEdit(row)}
          style={styles.additem}
          activeOpacity={0.9}>
          <View style={styles.additem}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.plus}>{index}</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>{strings.seeAllButton}</Text>
            <Image source={Images.arrow()} style={styles.img} />
          </TouchableOpacity>
          {text && <Text style={styles.headerText}>{text}</Text>}
        </View>

        <View
          style={[
            styles.flashListContainer,
            Platform.OS === 'web' && {overflowX: 'auto'},
          ]}>
          <FlashList
            ref={flatListRef}
            data={items}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator
            estimatedItemSize={160}
            renderItem={({item}) => (
              <RenderItem item={item} renderItem={renderItem} />
            )}
            keyExtractor={item => item._id}
          />
        </View>
      </View>
    </View>
  );
};

export default RowContainer;

const styles = StyleSheet.create({
  container: {
    // Enough height to show the header + list,
    // but no vertical scroll needed
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 3,
  },
  seeAllButton: {
    flexDirection: 'row',
    padding: 2,
    borderWidth: 0.3,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
  },
  seeAllText: {
    // Customize if needed
  },
  headerText: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(176, 196, 222, 0.7)',
    color: 'black',
  },
  additem: {
    padding: 8,
    flexDirection: 'row',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 14,
    elevation: 24,
  },
  plus: {
    textAlign: 'center',
    fontSize: 24,
  },
  img: {
    height: 20,
    width: 20,
    transform: [{rotate: '180deg'}],
  },

  flashListContainer: {
    height: 320,
    maxHeight: 320,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },

  /** Each item must have enough width to exceed the container, so you can scroll horizontally. */
  itemContainer: {
    width: 150,
    height: '100%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

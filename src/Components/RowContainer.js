import React, {useContext, useEffect, useRef, memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from 'expo-router';

import Images from '../assets/images/images';

const RenderItem = memo(({item, renderItem}) => renderItem({item}));

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

  const category = [`${row}`];

  const onSeeAllPress = () => {
    navigation.navigate('SeeAllProducts', items);
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
    navigation.navigate('EditProduct', {category});
  };

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {user?.role == 'staff' && (
        <TouchableOpacity
          onPress={() => navEdit(category)}
          style={styles.additem}
          activeOpacity={0.9}>
          <View style={styles.additem}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.plus}>{index}</Text>
          </View>
        </TouchableOpacity>
      )}

      {items.length > 0 ? (
        <View style={styles.cont}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onSeeAllPress}
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>{strings.seeAllButton}</Text>
              <Image source={Images.arrow()} style={styles.img} />
              {/* Moved outside */}
            </TouchableOpacity>

            {text && <Text style={styles.headerText}>{text}</Text>}
          </View>
          <View style={styles.list}>
            <FlashList
              ref={flatListRef}
              data={items}
              renderItem={({item}) => (
                <RenderItem item={item} renderItem={renderItem} />
              )}
              keyExtractor={item => item._id}
              horizontal
      
              showsHorizontalScrollIndicator={true}
              estimatedItemSize={160}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginRight: 10,
  },
  cont: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  img: {
    height: 20,
    width: 20,
    transform: [{rotate: '180deg'}],
  },
  plus: {
    textAlign: 'center',
    fontSize: 24,
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
  container: {
    height: 290,
    marginBottom: 20,
    marginLeft: 10,
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
  seeAllText: {},
  headerText: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(176, 196, 222, 0.7)',
    color: 'black',
  },
  itemsContainer: {
    height: 200,
    backgroundColor: 'blue',
  },
  noItemsText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
});

export default RowContainer;

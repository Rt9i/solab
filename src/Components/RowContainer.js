import React, {useContext, useEffect, useRef, memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';
import SolabContext from '../store/solabContext';
import {FlashList} from '@shopify/flash-list';

const RenderItem = memo(({item, renderItem}) => renderItem({item}));

const RowContainer = ({items, renderItem, text, selectedCategory, index}) => {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const {selectedIcons, scrollToTop, user} = useContext(SolabContext);

  const onSeeAllPress = () => {
    navigation.navigate('SeeAllProducts', {items, renderItem});
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

  return (
    <View style={styles.container}>
      {user?.role == 'staff' && (
        <View style={styles.additem}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.plus}>{index}</Text>
        </View>
      )}
      {items.length > 0 ? (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onSeeAllPress}
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All -&gt;</Text>
            </TouchableOpacity>

            {text && <Text style={styles.headerText}>{text}</Text>}
          </View>

          <FlashList
            ref={flatListRef}
            data={items}
            renderItem={({item}) => (
              <RenderItem item={item} renderItem={renderItem} />
            )}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={true}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            contentContainerStyle={styles.itemsContainer}
            estimatedItemSize={140}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
  },
  headerText: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(176, 196, 222, 0.7)',
    color: 'black',
  },
  itemsContainer: {},
  noItemsText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
});

export default RowContainer;

import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const SearchKeys = ({searchKeysArray, setSearchKeysArray}) => {
  const [searchKeyInput, setSearchKeyInput] = useState(''); // State for input

  const handleAddSearchKey = () => {
    if (searchKeyInput.trim()) {
      setSearchKeysArray([...searchKeysArray, searchKeyInput.trim()]);
      setSearchKeyInput(''); // Clear input
    }
  };

  // Remove search key
  const handleRemoveSearchKey = keyToRemove => {
    setSearchKeysArray(searchKeysArray.filter(key => key !== keyToRemove));
  };

  const renderItem = ({item, index}) => (
    <View key={index} style={styles.searchKey}>
      <Text style={styles.searchKeyText}>{item}</Text>
      <TouchableOpacity onPress={() => handleRemoveSearchKey(item)}>
        <Text style={styles.removeButton}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* TextInput for search keys */}
      <TextInput
        style={styles.input}
        placeholder="Enter a search key"
        value={searchKeyInput}
        onChangeText={setSearchKeyInput}
        onSubmitEditing={handleAddSearchKey} // Handle pressing "Done"
        placeholderTextColor="#7D7D7D"
        returnKeyType="done"
      />
      <View style={searchKeysArray?.length > 0 ? {} : {height:30}}>
        <FlashList
          data={searchKeysArray}
          renderItem={renderItem}
          numColumns={4}
          estimatedItemSize={50}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default SearchKeys;

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  searchKey: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Allow width to depend on text size
  },
  searchKeyText: {
    color: '#000',
    marginRight: 5,
  },
  removeButton: {
    fontSize: 20,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  smth: {
    height: 200,
    overflow: 'hidden',
  },
});

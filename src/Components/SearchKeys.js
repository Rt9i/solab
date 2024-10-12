import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SearchKeys = ({searchKeysArray, setSearchKeysArray}) => {
  const [searchKeyInput, setSearchKeyInput] = useState(''); // State for input

  // Add search key when "Done" is pressed
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
        returnKeyType="done" // Specify "Done" button on keyboard
      />

      {/* Display search keys */}
      <ScrollView style={styles.searchKeysContainer}>
        {searchKeysArray.map((key, index) => (
          <View key={index} style={styles.searchKey}>
            <Text style={styles.searchKeyText}>{key}</Text>
            <TouchableOpacity onPress={() => handleRemoveSearchKey(key)}>
              <Text style={styles.removeButton}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchKeys;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  searchKeysContainer: {
    flexDirection: 'row', // Display keys in a row
    flexWrap: 'wrap', // Allow wrapping to next line
  },
  searchKey: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60, // Set a minimum width for each key
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
});

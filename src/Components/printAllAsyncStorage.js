import AsyncStorage from '@react-native-async-storage/async-storage';

const printAllAsyncStorage = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    
    // Fetch values for each key
    const values = await AsyncStorage.multiGet(keys);
    
    // Print each key-value pair
    values.forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};

// Call the function where needed, e.g., in a useEffect or during debugging
printAllAsyncStorage();

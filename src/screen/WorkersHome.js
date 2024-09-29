import {Image, StyleSheet, Text, View, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios'; // Ensure axios is imported if you are using it in saveProductsToDatabase
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';
import data from '../res/Data';
import {saveProductsToDatabase} from '../res/api';

const WorkersHome = () => {
  const {updatedData, setUpdatedData} = useContext(SolabContext);
  const [loading, setLoading] = useState(false);
  const [savedData, setSavedData] = useState([]);

  const getFunctionKey = img => {
    for (const [functionName, func] of Object.entries(Images)) {
      if (func() === img) {
        const imageUri = Image.resolveAssetSource(func()).uri;
        console.log('====================================');
        console.log('Function name: ', functionName);
        console.log('Image URI:', imageUri);
        console.log('====================================');
        return {functionName, imageUri};
      }
    }
    console.log('Image function not found');
    return null;
  };

  useEffect(() => {
    const uploadImages = async () => {
      const uploadPromises = data.map(async item => {
        console.log('====================================');
        console.log(item);
        console.log('====================================');
  
        // Use getFunctionKey to retrieve the function name and image URI
        const { functionName, imageUri } = getFunctionKey(item.img);
  
        // Upload the image URI and get the uploaded image URL
        const uploadedImageUrl = await uploadImage(imageUri);
  
        return {
          ...item,
          img: uploadedImageUrl, // Update the item with the uploaded image URL
        };
      });
  
      // Wait for all uploads to complete
      const itemsWithImageUrls = await Promise.all(uploadPromises);
      setSavedData(itemsWithImageUrls);
  
      console.log('====================================');
      console.log('saved data rn:', itemsWithImageUrls); // log the saved data here
      console.log('====================================');
  
      await saveProductsToDatabase(itemsWithImageUrls);
    };
  
    // uploadImages();
  }, [data]); // Include `data` in the dependency array if it can change
  

  const uploadImage = async imageUri => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/png',
      name: 'my_image.png',
    });
    data.append('upload_preset', 'ml_default');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dzzazhwjk/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        console.log('Uploaded image URL:', jsonResponse.secure_url);
        return jsonResponse.secure_url;
      } else {
        console.error('Upload failed:', jsonResponse.error.message);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Select Image" />
        {/* Button to open image library */}
      </View>
      <View style={styles.body}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          updatedData.map(item => (
            <View key={item.id} style={styles.Item}>
              <Image source={{uri: item.img}} style={styles.image} />
              <Text>{item.name ? item.name : 'Unnamed Item'}</Text>
              <Text>{item.brand ? item.brand : 'Unknown Brand'}</Text>
              <Text>
                {item.price ? `$${item.price}` : 'Price not available'}
              </Text>
              <Text>{item.dis ? item.dis : 'No description available'}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default WorkersHome;

const styles = StyleSheet.create({
  Item: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  body: {
    flex: 1,
    backgroundColor: 'grey',
  },
  header: {
    height: 60,
    backgroundColor: 'rgba(255, 0, 255, 1.0)',
  },
  container: {
    flex: 1,
  },
});

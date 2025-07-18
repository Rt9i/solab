import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';

import CatsBarItems from '../src/Components/CatsBarItems';
import SolabContext from '../src/store/solabContext';
import SearchKeys from '../src/Components/SearchKeys';
import Images from '@/src/assets/images/images';
import {
  getDataFromDataBase,
  getItemInDataBase,
  removeItemFromDatabase,
  saveProductsToDatabase,
  setItemInDataBase,
} from '../src/res/api';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import CustomModal from '@/src/Components/customModal';


const EditProduct = () => {
  const route = useRoute();
  const {
    availableStock = 0,
    dis = '',
    brand = '',
    name = '',
    taste = '',
    price = 0,
    img = Images.photo(),
    category = [],
    kg = 0,
    petType = [],
    saleAmount = null,
    salePrice = null,
    searchKeys = [],
    _id,
  } = route.params || {};

  console.log('category is: ', category);

  const {strings, setData, cat, rows, pets, language} =
    useContext(SolabContext);
  console.log('id is: ', _id);
  const [availableStockState, setAvailableStockState] =
    useState(availableStock);
  const [disState, setDisState] = useState(dis);
  const [brandState, setBrandState] = useState(brand);
  const [nameState, setNameState] = useState(name);
  const [tasteState, setTasteState] = useState(taste);
  const [priceState, setPriceState] = useState(price);
  const [categoryState, setCategoryState] = useState(category);
  const [kgState, setKgState] = useState(kg);
  const [saleAmountState, setSaleAmountState] = useState(saleAmount);
  const [salePriceState, setSalePriceState] = useState(salePrice);
  const [searchKeysState, setSearchKeysState] = useState(searchKeys);
  const [petTypeState, setPetTypeState] = useState(petType);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [showreqModal, setShowreqModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [row, setRow] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [delLoading, setDelLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigation();
  const goback = () => {
    nav.goBack();
  };

  const validateAndCreateItemData = () => {
    let missingFields = [];

    if (selectedImage == null && img === Images.photo()) {
      console.log('selected img: ', selectedImage);
      missingFields.push(strings.image);
    }
    if (!brandState) missingFields.push(strings.brand);
    if (!priceState) missingFields.push(strings.price);
    if (!selectedCategory) missingFields.push(strings.category);
    if (!row) missingFields.push(strings.row);
    if (petTypeState.length === 0) missingFields.push(strings.petType);

    return {
      missingFields,
      newItemData: {
        brand: brandState,
        name: nameState,
        taste: tasteState,
        price: priceState,
        img: selectedImage || img.uri,
        category: [selectedCategory, row],
        dis: disState,
        kg: kgState,
        saleAmount: saleAmountState,
        salePrice: salePriceState,
        searchKeys: searchKeysState,
        petType: petTypeState,
        availableStock: availableStockState,
      },
    };
  };
  const time = Date.now();
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const getFileTypeFromUri = uri => {
    const extension = uri.split('.').pop();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'bmp':
        return 'image/bmp';

      default:
        return 'application/octet-stream';
    }
  };
  const uploadImage = async imageUri => {
    const data = new FormData();

    // Convert blob URL to a file if necessary
    let fileToUpload;
    if (imageUri.startsWith('blob:')) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Get file type from Blob
      const mimeType = blob.type || 'image/jpeg'; // Default to JPEG if unknown
      const fileExt = mimeType.split('/')[1] || 'jpg'; // Extract extension

      fileToUpload = new File([blob], `my_image.${fileExt}`, {type: mimeType});
    } else {
      // Regular file URL (non-blob), construct a File object
      fileToUpload = {
        uri: imageUri,
        type: getMimeType(imageUri), // Function to determine type
        name: 'my_image.' + getMimeType(imageUri).split('/')[1],
      };
    }

    data.append('file', fileToUpload);
    data.append('upload_preset', 'ml_default'); // Your Cloudinary upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dzzazhwjk/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        console.log('Uploaded image URL:', jsonResponse.secure_url);
        return jsonResponse.secure_url; // Return Cloudinary URL
      } else {
        console.error('Upload failed:', jsonResponse.error.message);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const requestMediaPermissions = async () => {
    const {status} = await MediaLibrary.requestPermissionsAsync();
    return status;
  };

  const openGallery = async () => {
    // Define options for the image picker
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limit to images only
      allowsEditing: true,

      quality: 1,
    };

    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log('Response = ', result);

    if (result.canceled) {
      console.log('User cancelled image picker');
    } else if (result.assets) {
      const source = {uri: result.assets[0].uri};
      setSelectedImage(source.uri);
      console.log('Selected image: ', source.uri);
    } else {
      console.log('ImagePicker Error: ', result.error);
    }
  };
  const onAccept = async () => {
    Linking.openSettings();
  };

  const onCancel = () => {
    setShowreqModal(false);
  };

  const PermissionRequestModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showreqModal}
        onRequestClose={onCancel}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>
              Can we have permission to get to your gallery?
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={
                  () => onAccept()
                  // Linking.openSettings()
                }>
                <Text style={styles.modalButtonText}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => onCancel()}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const CustomAlert = ({message}) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Input Required</Text>
            <Text style={styles.modalMessage}>{message}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const addItem = async () => {
    const {missingFields, newItemData} = validateAndCreateItemData();
    if (parseFloat(saleAmountState) > parseFloat(salePriceState)) {
      setErrorMessage(strings.amountError);
      setShowModal(true);
      return;
    }

    // Check for missing fields
    if (missingFields.length > 0) {
      setErrorMessage(`${strings.fillthefield}: ${missingFields.join(', ')}`);
      setShowModal(true);
      return;
    }
    try {
      setLoading(true);
      const imageUrl = await uploadImage(selectedImage);

      const updatedNewItemData = {
        ...newItemData,
        img: imageUrl,
      };

      console.log('Updated New Item Data:', updatedNewItemData); // Log to check

      const response = await saveProductsToDatabase([updatedNewItemData]); // Ensure it's an array
      const result = await getDataFromDataBase();
      setData(result);
      goback();
      console.log('Response from saveProductsToDatabase:', response);
    } catch (e) {
      console.error('Error adding item:', e);
      setErrorMessage('Failed to add item.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const assignValues = async () => {
    const {missingFields, newItemData} = validateAndCreateItemData();

    console.log('Assigning Values:', newItemData);

    // Check for sale amount and price
    if (parseFloat(saleAmountState) > parseFloat(salePriceState)) {
      setErrorMessage(strings.amountError);
      setShowModal(true);
      return;
    }

    // Handle missing fields
    if (missingFields.length > 0) {
      const newErrorMessage = `${strings.fillthefield}: ${missingFields.join(', ')}`;
      if (errorMessage !== newErrorMessage) {
        setErrorMessage(newErrorMessage);
        setShowModal(true);
      }
      return;
    }

    try {
      setLoading(true);

      let imageUrl = newItemData.img; // Default to existing image URL

      // If a new image is selected (and not already uploaded), upload it to Cloudinary
      if (selectedImage && !selectedImage.startsWith('http')) {
        imageUrl = await uploadImage(selectedImage);
      }

      // Update newItemData with the new image URL
      const updatedItemData = {...newItemData, img: imageUrl};

      // Send the updated item to the database
      await setItemInDataBase(_id, updatedItemData);

      // Fetch updated data and update state
      const result = await getDataFromDataBase();
      setData(result);

      console.log('Data set successfully, navigating back');
      nav.goBack();
    } catch (e) {
      console.error('Error updating item:', e);
      setErrorMessage('Failed to update item.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const findRowAndCategory = useCallback(() => {
    let matchedCategory = '';
    let matchedRow = '';
    let rowId = '';
    console.log('matched row: ', matchedRow);
    categoryState.forEach(item => {
      cat.forEach(categoryItem => {
        const categoryKey = Object.keys(categoryItem)[0];
        if (categoryItem[categoryKey].toLowerCase() === item) {
          matchedCategory = categoryItem[categoryKey];
        }
      });

      rows.forEach(rowItem => {
        if (rowItem.rows === item) {
          matchedRow = rowItem.rows;
          rowId = rowItem.id;
        }
      });
    });

    setSelectedCategory(matchedCategory.toLowerCase());
    setRow(matchedRow);
    setSelectedRow(rowId);
  }, [categoryState]);

  useEffect(() => {
    findRowAndCategory();
  }, [findRowAndCategory]);

  const handleInput = useCallback(
    (label, state, setState, keyboardType = 'default', styling) => (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={styling ? styling : styles.input}
          placeholder={label}
          placeholderTextColor="#7D7D7D"
          value={state !== null && state !== undefined ? state.toString() : ''}
          onChangeText={setState}
          keyboardType={keyboardType}
          returnKeyType="done"
          multiline={true}
          textAlignVertical="top"
        />
      </View>
    ),
    [],
  );

  const petTypes = () => {
    const togglePetType = pets => {
      setPetTypeState(prevState => {
        if (prevState.includes(pets)) {
          return prevState.filter(item => item !== pets);
        } else {
          return [...prevState, pets];
        }
      });
    };

    return (
      <View style={styles.petTypeContainer}>
        <Text style={styles.label}>{strings.petType}</Text>
        {pets.map(item => {
          const isSelected = petTypeState.includes(item.name);

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.inputWrapper}
              onPress={() => togglePetType(item.name)}
              activeOpacity={0.9}>
              <Text style={styles.input}>
                {item.name}{' '}
                {isSelected && (
                  <Image source={Images.roundCheckMark()} style={styles.icon} />
                )}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Text style={styles.selectedPetsText}>
          {strings.selectedpets}: {petTypeState.join(', ')}
        </Text>
      </View>
    );
  };
  const toggleRow = (val, id) => {
    setRow(val);
    setSelectedRow(id);
  };
  const rowItem = (item, isSelected) => (
    <TouchableOpacity
      style={[
        styles.rowItem,
        isSelected ? styles.selectedRow : styles.notSelectedRow,
      ]}
      onPress={() => toggleRow(item.rows, item.id)}>
      <Text style={styles.rowText}>
        {item.id}
        {isSelected && (
          <Image source={Images.roundCheckMark()} style={styles.icon} />
        )}
      </Text>
    </TouchableOpacity>
  );

  const renderRows = () => {
    return (
      <View style={styles.petTypeContainer}>
        <Text style={styles.label}>{strings.row}</Text>
        <FlatList
          data={rows}
          renderItem={({item}) => {
            const isSelected = row === item.rows;
            return rowItem(item, isSelected); // Return rowItem here
          }}
          keyExtractor={item => item.id.toString()} // Ensure keyExtractor returns a string
          horizontal={true}
        />
        <Text style={styles.selectedPetsText}>
          {strings.selectedRow}: {selectedRow}
        </Text>
      </View>
    );
  };
  
  const inputs = () => (
    <View style={styles.inputContainer}>
      <View style={styles.row}>
        {handleInput(
          ` ${strings.inStock}`,
          availableStockState,
          text => setAvailableStockState(text === '' ? '' : parseFloat(text)),
          'numeric',
        )}
      </View>
      <View style={styles.row}>
        {handleInput(strings.taste, tasteState, setTasteState)}
        {handleInput(strings.brand, brandState, setBrandState)}
      </View>

      <View style={styles.price}>
        {handleInput(
          `${strings.price} ${strings.priceTag}`,
          priceState,
          text => setPriceState(parseFloat(text) || ''),
          'numeric',
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.elevation}>
          <Text style={styles.label}>{strings.category}</Text>
          <ScrollView horizontal={true} style={{width: 400}}>
            <CatsBarItems
              Array={cat.map((item, index) => ({
                ...item,
                key: item.id,
              }))}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              styling={styles.CatsBarItems}
            />
          </ScrollView>
        </View>

        <View style={styles.price}>
          {handleInput(
            `${strings.weight}  (kg)`,
            kgState,
            setKgState,
            'numeric',
          )}
        </View>

        <View style={styles.row}>
          {handleInput(
            strings.saleAmount,
            saleAmountState,
            setSaleAmountState,
            'numeric',
          )}
          {handleInput(
            strings.salePrice,
            salePriceState,
            setSalePriceState,
            'numeric',
          )}
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={language == 'en' ? styles.meow : {textAlign: 'right'}}>
              {strings.searchKeys}
            </Text>
            <View style={styles.search}>
              <Image source={Images.search()} style={styles.image} />
              <SearchKeys
                searchKeysArray={searchKeysState}
                setSearchKeysArray={setSearchKeysState}
              />
            </View>
          </View>
        </View>

        <View style={styles.dis}>
          {handleInput(
            strings.dis,
            disState,
            setDisState,
            'default',
            styles.disInput,
          )}
        </View>
        <View style={{width: '100%', maxWidth: 400}}>
          {petTypes()}
          {renderRows()}
        </View>
      </View>
    </View>
  );

  const handleImagePress = async () => {
    // Check if the platform is web
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async event => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
          console.log('Selected image URL:', imageUrl); // Log the image URL
          setLoading(false); // Set loading to false once the image is ready
        }
      };

      input.click();
    } else {
      // Mobile logic for image picker
      const permissionGranted = await requestMediaPermissions();
      if (permissionGranted === 'granted') {
        openGallery();
      } else {
        setShowreqModal(true);
      }
    }
  };
  useEffect(() => {
    console.log('Selected image URL:', selectedImage);
    // You could upload the image here and log the returned URI
  }, [selectedImage]);

  const image = () => {
    return (
      <TouchableOpacity onPress={() => handleImagePress()}>
        <View>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage}}
              style={[styles.img, {resizeMode: 'contain'}]}
            />
          ) : (
            <Image source={img} style={[styles.img,{resizeMode:'contain'}]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleDel = () => {
    // Show the modal when the delete action is triggered
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      setDelLoading(true);
      const deleting = await removeItemFromDatabase(_id);
      console.log('Product deleted');
      const result = await getDataFromDataBase();
      setData(result);
      setDelLoading(false);
      goback();
    } catch (e) {}

    setModalVisible(false);
  };

  const cancelDelete = () => {
    setModalVisible(false); // Close the modal without deleting
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.header}>Edit Product</Text>
            {_id && (
              <TouchableOpacity onPress={() => handleDel()}>
                <Image source={Images.trashCan()} style={styles.trash} />
              </TouchableOpacity>
            )}
          </View>

          {image()}

          <View>{inputs()}</View>

          <CustomModal
            message={strings.delMessage}
            visible={modalVisible}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            loading={delLoading}
          />
          <PermissionRequestModal />
          <CustomAlert message={errorMessage} />
        </View>
      </ScrollView>

      <View style={styles.cont}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={50} />
            <Text>{strings.savingChanges}...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.savechanges}
            // onPress={() => {testing();}}
            onPress={() => (_id ? assignValues() : addItem())}>
            <Text style={styles.txt}>{strings.saveChanges}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  CatsBarItems: {
    height: 100,
    width: '100%',
  },
  cont: {
    position: 'absolute',
    bottom: 0,
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  savingChanges: {},
  meow: {
    fontWeight: 'bold',
    textAlign: 'left  ',
  },
  image: {
    position: 'absolute',
    right: 1,
    top: 5,
    height: 30,
    width: 30,
  },
  petTypeContainer: {
    backgroundColor: 'white',
    elevation: 14,
    marginTop: 25,
    borderRadius: 10,
  },
  elevation: {
    width: '100%',
    height: 150,
    alignItems: 'center',

    borderRadius: 10,
  },
  dis: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  search: {
    maxWidth: 400,
    width: '100%',

    borderRadius: 10,
    flexDirection: 'row',
  },

  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modcont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  trash: {
    width: 40,
    height: 40,
  },
  sale: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 30,
    backgroundColor: 'white',

    elevation: 5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,

    elevation: 5,
  },
  modalTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  rowItem: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedRow: {
    borderColor: 'green',
  },
  notSelectedRow: {
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  rowText: {
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 20,
    height: 20,
  },
  notSelected: {
    backgroundColor: 'white',
  },
  selected: {
    backgroundColor: 'green',
  },
  selectedPetsText: {
    color: 'black',
  },
  price: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height:200,
    width: 200,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    paddingBottom: 100,
  },
  inputContainer: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
  },
  inputWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
  savechanges: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 30,
    bottom: 5,
    elevation: 5,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  txt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  disInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 320,
    color: 'black',
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',

    elevation: 5,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 100,

    color: 'black',

    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,

    height: 30,
    backgroundColor: 'white',

    elevation: 5,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import Sizes from '../res/sizes';
import CatsBarItems from '../Components/CatsBarItems';
import SolabContext from '../store/solabContext';
import SearchKeys from '../Components/SearchKeys';
import Images from '../assets/images/images';
import {
  getDataFromDataBase,
  getItemInDataBase,
  saveProductsToDatabase,
  setItemInDataBase,
} from '../res/api';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProduct = props => {
  const {
    brand = '',
    name = '',
    taste = '',
    price = 0,
    img = Images.photo(),
    category = [],
    kg = 0,
    petType = [],
    saleAmount = 0,
    salePrice = 0,
    searchKeys = [],
    _id,
  } = props.route.params || {};

  const {strings, setData, cat, rows, pets} = useContext(SolabContext);

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
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const goback = () => {
    nav.goBack();
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log('Response = ', result);

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const source = {uri: result.assets[0].uri};
      setSelectedImage(source.uri);
    }
  };
  const checkPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    return granted;
  };
  // const requestGalleryPermission = async () => {
  //   try {
  //     const cameraGranted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Camera Permission',
  //         message: 'This app needs access to your camera to take pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     const storageGranted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Storage Permission',
  //         message: 'This app needs access to your storage to open the gallery.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (
  //       cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
  //       storageGranted === PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       console.log('Camera and storage permissions granted');
  //       return true; // All permissions granted
  //     } else {
  //       console.log('Camera or storage permission denied');
  //       return false; // At least one permission denied
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return false; // Handle error
  //   }
  // };

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

  const CustomAlert = ({message}) => (
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

  const validateAndCreateItemData = () => {
    let missingFields = [];
    if (img == Images.photo()) missingFields.push(strings.image);
    if (!brandState) missingFields.push(strings.brand);
    if (!priceState) missingFields.push(strings.Price);
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
        img: img.uri,
        category: [selectedCategory, row],
        kg: kgState,
        saleAmount: saleAmountState,
        salePrice: salePriceState,
        searchKeys: searchKeysState,
        petType: petTypeState,
        availableStock: 0,
      },
    };
  };

  const addItem = async () => {
    let isMounted = true;

    if (isMounted) {
      const {missingFields, newItemData} = validateAndCreateItemData();

      if (parseFloat(saleAmountState) > parseFloat(salePriceState)) {
        setErrorMessage(strings.amountError);
        setShowModal(true);
        return;
      }

      if (missingFields.length > 0) {
        setErrorMessage(`${strings.fillthefield}: ${missingFields.join(', ')}`);
        setShowModal(true);
        return;
      }

      try {
        setLoading(true);
        const response = await saveProductsToDatabase({items: [newItemData]});

        if (response && response.data) {
          console.log('Products saved successfully:', response.data.products);
          const result = await getDataFromDataBase();
          setData(result);
          goback();
        }
      } catch (e) {
        console.error('Error adding item:', e);
        setErrorMessage('Failed to add item.');
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false; // Cleanup
    };
  };

  const assignValues = async () => {
    const {missingFields, newItemData} = validateAndCreateItemData();
    console.log('assign');

    // Check for missing fields
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

      const item = await getItemInDataBase(_id);
      const updatedItem = await setItemInDataBase(_id, newItemData);

      const result = await getDataFromDataBase();
      setData(result);

      console.log('Data set successfully, navigating back');
      nav.goBack();
    } catch (e) {
      // Log the error and display an error message
      console.error('Error updating item:', e);
      setErrorMessage('Failed to update item.');
      setShowModal(true);
    } finally {
      // End loading
      setLoading(false);
    }
  };

  console.log('====================================');

  // console.log('taste: ', taste);
  // console.log('row: ', row);
  // console.log('categoryState: ', categoryState);
  console.log('====================================');

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
    (label, state, setState, keyboardType = 'default') => (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor="#7D7D7D"
          value={state !== null && state !== undefined ? state.toString() : ''}
          onChangeText={setState}
          keyboardType={keyboardType}
        />
      </View>
    ),
    [],
  );

  const petTypes = () => {
    const pets = [
      {name: 'cat', id: 1},
      {name: 'dog', id: 2},
    ];

    const togglePetType = pet => {
      setPetTypeState(prevState => {
        if (prevState.includes(pet)) {
          return prevState.filter(item => item !== pet);
        } else {
          return [...prevState, pet];
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
  const renderRows = () => {
    const toggleRow = (val, id) => {
      setRow(val);
      setSelectedRow(id);
    };

    return (
      <View style={styles.petTypeContainer}>
        <Text style={styles.label}>{strings.row}</Text>
        <FlatList
          data={rows}
          renderItem={({item}) => {
            const isSelected = row === item.rows;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.rowItem,
                  isSelected ? styles.selectedRow : styles.notSelectedRow,
                ]}
                onPress={() => toggleRow(item.rows, item.id)}>
                <Text style={styles.rowText}>
                  {item.id}{' '}
                  {isSelected && (
                    <Image
                      source={Images.roundCheckMark()}
                      style={styles.icon}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
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
        <Text style={styles.label}>{strings.category}</Text>
        <CatsBarItems
          Array={cat.map((item, index) => ({
            ...item,
            key: item.id,
          }))}
          style={styles.CatsBarItems}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

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
            'Sale Amount',
            saleAmountState,
            setSaleAmountState,
            'numeric',
          )}
          {handleInput(
            'Sale Price',
            salePriceState,
            setSalePriceState,
            'numeric',
          )}
        </View>

        <SearchKeys
          searchKeysArray={searchKeysState}
          setSearchKeysArray={setSearchKeysState}
        />

        {petTypes()}
        {renderRows()}
      </View>
    </View>
  );
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to open the gallery.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Use this function to request permissions where needed

  const handleImagePress = async () => {
    setShowreqModal(true);

    try {
      const permissionGranted = await requestGalleryPermission();

      if (permissionGranted) {
        // If permission is granted, open the gallery
        openGallery();
      } else {
        // Handle the case where permission is denied
        console.log('Permission denied!');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const image = () => {
    return (
      <TouchableOpacity onPress={() => handleImagePress()}>
        <View>
          <Image source={img} style={styles.img} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Product</Text>

        {image()}
        {inputs()}
        <PermissionRequestModal />
        <CustomAlert message={errorMessage} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>{strings.savingChanges}...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.savechanges}
            onPress={() => (_id ? assignValues() : addItem())}>
            <Text style={styles.txt}>{strings.saveChanges}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  sale: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 30,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
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
    elevation: 2, // For shadow effect on Android
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // Radius of the shadow

    // Shadow for Android (via elevation)
    elevation: 5,
  },
  container: {
    alignItems: 'center',
    flex: 1,
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
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,

    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

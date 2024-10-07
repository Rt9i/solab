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
  setItemInDataBase,
} from '../res/api';
import {useNavigation} from '@react-navigation/native';

const cat = [
  {Food: 'food', id: 1},
  {Meat: 'meat', id: 2},
  {Accessories: 'accessories', id: 3},
  {Clothes: 'clothes', id: 4},
  {Sprays: 'sprays', id: 5},
  {Toilet: 'toilet', id: 6},
  {Perfume: 'perfume', id: 7},
  {Treats: 'treats', id: 8},
  {Bowl: 'bowl', id: 9},
];

const rows = [
  {rows: 'firstRow', id: 1},
  {rows: 'secondRow', id: 2},
  {rows: 'thirdRow', id: 3},
  {rows: 'fourthRow', id: 4},
  {rows: 'fifthRow', id: 5},
  {rows: 'sixthRow', id: 6},
  {rows: 'seventhRow', id: 7},
  {rows: 'eighthRow', id: 8},
  {rows: 'ninthRow', id: 9},
  {rows: 'tenthRow', id: 10},
];

const EditProduct = props => {
  const {
    brand = '',
    name = '',
    taste = '',
    price = 0,
    img,
    category = [],
    kg = 0,
    petType = [],
    saleAmount = 0,
    salePrice = 0,
    searchKeys = [],
    _id,
  } = props.route.params || {};

  const {strings, setData} = useContext(SolabContext);

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
  const [row, setRow] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigation();
  const goback = () => {
    nav.goBack();
  };
  console.log('====================================');
  console.log('category:', categoryState);
  console.log('row:', row);
  console.log('selectedCategory:', selectedCategory);
  console.log('====================================');
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

  const assignValues = async () => {
    let isMounted = true; // track component mount state

    if (isMounted) {
      let missingFields = [];
      if (!brandState) missingFields.push(strings.brand);
      if (!priceState) missingFields.push(strings.Price);
      if (!selectedCategory) missingFields.push(strings.category);
      if (!row) missingFields.push(strings.row);
      if (petTypeState.length === 0) missingFields.push(strings.petType);

      if (missingFields.length > 0) {
        setErrorMessage(`${strings.fillthefield}: ${missingFields.join(', ')}`);
        setShowModal(true);
        return;
      }

      try {
        setLoading(true);
        const item = await getItemInDataBase(_id);
        const newItemData = {
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
        };
        const updatedItem = await setItemInDataBase(_id, newItemData);
        const result = await getDataFromDataBase();
        setLoading(false);
        setData(result);
        goback();
      } catch (e) {
        console.error('Error updating item:', e);
        setLoading(false);
      }
    }

    return () => {
      isMounted = false; // cleanup
    };
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
      {name: 'cat', id: 1, txt: strings.cat},
      {name: 'dog', id: 2, txt: strings.dog},
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
              onPress={() => togglePetType(item.name)}>
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

        <SearchKeys
          searchKeysArray={searchKeysState}
          setSearchKeysArray={setSearchKeysState}
        />

        {petTypes()}
        {renderRows()}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>{strings.editProduct}</Text>
        <Image source={img} style={styles.img} />
        {inputs()}
        <CustomAlert message={errorMessage} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>{strings.savingChanges}...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.savechanges}
            onPress={() => assignValues()}>
            <Text style={styles.txt}>{strings.saveChanges}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
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
    marginTop: 20,
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
  },
});

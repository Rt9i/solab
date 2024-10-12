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
  const [row, setRow] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const goback = () => {
    nav.goBack();
  };
  const assignValues = async () => {
    console.log('ID:', _id);
    if (petTypeState.length > 0) {
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
    } else {
      Alert.alert('Input Required', 'Please select a pet type.');
    }

    return null;
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
  const handleImagePress = () => {
    if (isAuthorized) {
      openGallery();
    } else {
      setShowreqModal(true);
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

        <Image source={img} style={styles.img} />
        {inputs()}

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

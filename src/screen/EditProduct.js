import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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

// Static arrays moved outside the component for optimization
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
    saleAmount = 0,
    salePrice = 0,
    searchKeys = [],
  } = props.route.params || {};

  const {strings} = useContext(SolabContext);

  // Simplified state initialization
  const [brandState, setBrandState] = useState(brand);
  const [nameState, setNameState] = useState(name);
  const [tasteState, setTasteState] = useState(taste);
  const [priceState, setPriceState] = useState(price);
  const [categoryState, setCategoryState] = useState(category);
  const [kgState, setKgState] = useState(kg);
  const [saleAmountState, setSaleAmountState] = useState(saleAmount);
  const [salePriceState, setSalePriceState] = useState(salePrice);
  const [searchKeysState, setSearchKeysState] = useState(searchKeys);
  const [petTypeState, setPetTypeState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [row, setRow] = useState('');
  console.log('====================================');
  // console.log('Props:', JSON.stringify(props, null, 2));
  console.log('petTypeState: ', petTypeState);
  console.log('row: ', row);
  console.log('categoryState: ', categoryState);
  console.log('====================================');

  const findRowAndCategory = useCallback(() => {
    let matchedCategory = '';
    let matchedRow = '';

    category.forEach(item => {
      const lowerCaseItem = item.toLowerCase();

      cat.forEach(categoryItem => {
        const categoryKey = Object.keys(categoryItem)[0];
        if (categoryItem[categoryKey].toLowerCase() === lowerCaseItem) {
          matchedCategory = categoryItem[categoryKey];
        }
      });

      rows.forEach(rowItem => {
        if (rowItem.rows === lowerCaseItem) {
          matchedRow = rowItem.rows;
        }
      });
    });

    setSelectedCategory(matchedCategory.toLowerCase()); // Ensure it is set in lowercase
    setRow(matchedRow);
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

  const petType = () => {
    const pets = [
      { name: 'Cat', id: 1 },
      { name: 'Dog', id: 2 },
    ];
  
    const togglePetType = pet => {
      setPetTypeState(prevState => {
        if (prevState.includes(pet)) {
          // If pet type already exists, remove it
          return prevState.filter(item => item !== pet);
        } else {
          // Otherwise, add it
          return [...prevState, pet];
        }
      });
    };
  
    return (
      <View style={styles.petTypeContainer}>
        <Text style={styles.label}>Pet Type</Text>
        {pets.map(item => {
          const isSelected = petTypeState.includes(item.name); // Check if pet is selected
  
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.inputWrapper,
                { backgroundColor: isSelected ? 'green' : 'white' } // Change background color conditionally
              ]}
              onPress={() => togglePetType(item.name)} // Call toggle function on press
            >
              <Text style={styles.input}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
        <Text style={styles.selectedPetsText}>Selected Pets: {petTypeState.join(', ')}</Text>
      </View>
    );
  };
  

  const inputs = () => (
    <View style={styles.inputContainer}>
      <View style={styles.row}>
        {handleInput('Taste', tasteState, setTasteState)}
        {handleInput('Brand', brandState, setBrandState)}
      </View>

      <View style={styles.price}>
        {handleInput(
          `Price ${strings.priceTag}`,
          priceState,
          text => setPriceState(parseFloat(text) || ''),
          'numeric',
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
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
          {handleInput('Weight (kg)', kgState, setKgState, 'numeric')}
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

        {petType()}
      </View>
    </View>
  );

  const handleSaveChanges = () => {};

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Product</Text>
        <Image source={img} style={styles.img} />
        {inputs()}
        <TouchableOpacity
          style={styles.savechanges}
          onPress={handleSaveChanges}>
          <Text style={styles.txt}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
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
    marginRight: 8,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
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
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images/images';
import strings from '../res/strings';
import SolabContext from '../store/solabContext';


const DisplayItem = ({ setDisplayMode, displayMode }) => {
  const { strings, changeLanguage } = useContext(SolabContext);

  const setDisplay = () => {
    const updatedMode = displayMode === 'row' ? 'column' : 'row';
    setDisplayMode(updatedMode);
  };





  const showImage = () => {
    return <Image source={Images.photo()} style={styles.smallimg} />;
  };

  return (
    <View style={styles.choiceDisplay}>
      <Text style={styles.displaytxt}>{strings.display}</Text>

      <View style={styles.rowOrcolumn}>

        {(displayMode === 'row') && (
          < TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDisplayMode('column') + setDisplay()}
            style={[styles.column, { backgroundColor: '#7391c8' }]}
          >
            <View style={styles.columnbox}>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
              <View style={styles.columnbox1}>
                <View style={styles.row}>
                  {showImage()}
                  <Text style={styles.smalltxt}>hello</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>)

        }

        {displayMode === 'column' && (

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setDisplayMode('row') + setDisplay()}
            style={[
              styles.rowItems,
              { backgroundColor: '#7391c8' },
            ]}
          >


            <View style={styles.rowbox}>

              <View style={styles.row}>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>
                <View style={styles.box1}>{showImage()}</View>
              </View>

              <View style={styles.row}>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>
                <View style={styles.box2}>{showImage()}</View>
              </View>


            </View>
          </TouchableOpacity>
        )}



      </View>
    </View >
  );
};

export default DisplayItem;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  displaytxt: {
    // fontFamily: 'bigFont',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 10,

  },
  choiceDisplay: {
    width: 120,

    alignItems: 'center',
  },

  smalltxt: {
    fontSize: 6,
    // fontFamily: 'smallFont',
  },
  columnbox1: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 1,
    height: 10,
  },
  smallimg: {
    height: 10,
    width: 10,
  },
  box1: {
    width: 10,
    height: 10,
    marginTop: 5,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },
  box2: {
    width: 10,
    height: 10,
    marginTop: 20,
    marginLeft: 2,
    marginRight: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
  },
  rowbox: {
    flexDirection: 'column',
  },
  columnbox: {
    flexDirection: 'column',
  },
  column: {
    marginLeft: 0.2,
    backgroundColor: 'grey',
    width: 40,
    height: 40,
    borderWidth: 2,
  },
  rowItems: {
    fontSize: 20,
    borderWidth: 2,
    backgroundColor: 'black',
    width: 44,
    height: 40,
  },
  rowOrcolumn: {
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

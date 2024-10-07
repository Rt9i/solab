import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenNames from '../../routes/ScreenNames';

const WorkersHome = () => {
  nav = useNavigation();
  const navEditProducts = () => {
    nav.navigate(ScreenNames.editProduct);
  };
  return (
    <View>

      <Text>WorkersHome</Text>
    </View>
  );
};

export default WorkersHome;

const styles = StyleSheet.create({});

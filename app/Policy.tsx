import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import policyText from '@/src/Components/policyText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Policy() {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCheckboxToggle = () => {
    setIsAccepted(!isAccepted);
  };

  const handleAccept = async () => {
    if (isAccepted) {
      console.log('User accepted the policies');
     await AsyncStorage.setItem('isAccepted', JSON.stringify(isAccepted))

    }
  };

  const acceptBox = () => (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={handleCheckboxToggle} style={styles.row}>
        <View style={[styles.checkbox, isAccepted && styles.checkboxChecked]}>
          {isAccepted && (
            <Ionicons name="checkmark" size={16} color="#fff" />
          )}
        </View>
        <Text style={styles.checkboxLabel}>I accept the policy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.subtitle}>Solab's terms and services</Text>
      <View style={styles.policyBox}>
        <ScrollView style={styles.scrollView}>{policyText()}</ScrollView>
        {acceptBox()}
        <Button
          title="Continue"
          onPress={handleAccept}
          color="#007bff"
          disabled={!isAccepted}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeArea: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  policyBox: {
    width: '85%',
    maxWidth: 600,
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 15,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
});

import React, {useState, useEffect, useContext, createContext} from 'react';
import Constants from 'expo-constants';
import {
  Alert,
  Modal,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import SolabContext from '../store/solabContext';
import {sendOTP} from '../res/api';

type PhoneModalProps = {
  phoneNumber: string | null;
  setPhoneNumber: (phone: string) => void;
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  saveUserInfoToDatabase: () => void;
  setIsPhoneVerified: (verified: boolean) => void;
};

const PhoneModal: React.FC<PhoneModalProps> = ({
  phoneNumber,
  setPhoneNumber,
  isModalVisible,
  setModalVisible,
  saveUserInfoToDatabase,
  setIsPhoneVerified,
}) => {
  const solabContext = useContext(SolabContext);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  

  const confirmVerificationCode = async () => {
    try {
      console.log('sending requeest');

      const response = await sendOTP('+972' + phoneNumber);

      console.log('otp rsponse: ', response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Please enter your phone number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber || ''}
            onChangeText={setPhoneNumber}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Verify Phone"
              onPress={() => confirmVerificationCode()}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>

          {verificationId && (
            <View style={styles.verificationContainer}>
              <TextInput
                style={styles.input}
                placeholder="Verification Code"
                keyboardType="number-pad"
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <Button title="Confirm Code" onPress={confirmVerificationCode} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PhoneModal;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  verificationContainer: {
    marginTop: 20,
  },
});

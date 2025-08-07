import React, {useState, useEffect, useContext, createContext} from 'react';
import {
  Alert,
  Modal,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {
  encryptData,
  getUserByGmail,
  GoogleLoginAndRegister,
  sendOTP,
  verifyOTP,
} from '../res/api';
import Images from '../assets/images/images';
import {Platform} from 'react-native';

import SolabContext from '../store/solabContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PhoneModalProps = {
  phoneNumber?: string | null;
  setPhoneNumber?: (phone: string) => void;
  isModalVisible?: boolean;
  setModalVisible?: (visible: boolean) => void;
  setIsPhoneVerified?: (verified: boolean) => void;
  isPhoneVerified?: boolean;
  verificationCode?: string;
  setVerificationCode?: (verificationCode: string) => void;
  verificationCodeSent?: boolean;
  setVerificationCodeSent?: (sent: boolean) => void;
  modalCallback?: ((phone: string) => void) | null;
  setModalCallback?: React.Dispatch<
    React.SetStateAction<((phone: string) => void) | null>
  >;
};

const PhoneModal: React.FC<PhoneModalProps> = ({
  phoneNumber = '',
  setPhoneNumber = () => {},
  isModalVisible = false,
  setModalVisible = () => {},
  isPhoneVerified = false,
  setIsPhoneVerified = () => {},
  verificationCode = '',
  setVerificationCode = () => {},
  verificationCodeSent = false,
  setVerificationCodeSent = () => {},
  modalCallback = null,
  setModalCallback = () => {},
}) => {
  const {currentUser, setCurrentUser}: any = React.useContext(SolabContext);

  const showToast = (
    wemMessage: string,
    appText1: string,
    appText2: string,
  ) => {
    // if (Platform.OS === 'web') {
    //   toast.success(wemMessage);
    // } else {
    //   Toast.show({
    //     type: 'success',
    //     text1: appText1,
    //     text2: appText2,
    //     position: 'top',
    //     visibilityTime: 4000,
    //     autoHide: true,
    //   } as any);
    // }
  };

  const sendOtpCode = async () => {
    try {
      console.log('sending requeest');

      const response = await sendOTP('+972' + phoneNumber);
      if (response?.success === true) setVerificationCodeSent(true);

      console.log('otp response: ', response);
    } catch (e) {
      console.log(e);
    }
  };
  const setItem = async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };
  const signToDataBase = async () => {
    try {
      console.log('user name: ', currentUser.name);
      console.log('user email: ', currentUser.email);
      console.log('user picture: ', currentUser.picture);
      console.log('phoneNumber : ', phoneNumber);

      const response = await GoogleLoginAndRegister(
        currentUser.name,
        currentUser.email,
        currentUser.picture,
        phoneNumber,
      );

      console.log('Server Response:', response);

      setItem('userPhoneNumber', phoneNumber as string);

      console.log(' phone number saved:', phoneNumber);

      return response;
    } catch (e) {
      console.error('Error signing in user:', e);
    }
  };

  const verifyOTPCode = async () => {
    try {
      console.log('sending requeest');

      const response = await verifyOTP('+972' + phoneNumber, verificationCode);

      if (response.ok == true || response.success == true) {
        setIsPhoneVerified(true);
        showToast(
          'Phone Verified!',
          'Phone Verified!',
          'Your phone number has been successfully verified.',
        );
        await signToDataBase();
        console.log('verifcation rsponse: ', response);
        if (modalCallback) {
          modalCallback(phoneNumber as any);
          setModalCallback(null); // Clear callback after use
          setModalVisible(false);
        }

        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    console.log('Updated phone number:', newPhoneNumber);
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* <Button title="save number " onPress={() => encryptPhonenumber()} /> */}
          {/* <Button title="get number" onPress={() => getphoneNumber()} /> */}
          {/* <Button
            title="save user "
            onPress={async () => await signToDataBase()}
          /> */}
          {/* <Button title="close " onPress={() => setModalVisible(false)} /> */}

          {!verificationCodeSent && !isPhoneVerified && (
            <View>
              <Text style={styles.title}>Please enter your phone number:</Text>

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber || ''}
                onChangeText={handlePhoneNumberChange} // Use onChangeText instead of onChange
              />

              <View style={styles.buttonContainer}>
                <Button title="Verify Phone" onPress={() => sendOtpCode()} />
                {/* <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  color="red"
                /> */}
              </View>
            </View>
          )}
          {verificationCodeSent && !isPhoneVerified && (
            <View style={styles.verificationContainer}>
              <Text>please enter the code</Text>
              <TextInput
                style={styles.input}
                placeholder="Verification Code"
                keyboardType="number-pad"
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <Button title="Confirm Code" onPress={() => verifyOTPCode()} />
            </View>
          )}
          {isPhoneVerified && (
            <View>
              <View>
                <Text>its veryfied</Text>
                <Image
                  source={Images.roundCheckMark()}
                  style={[styles.img, {resizeMode: 'contain'}]}
                />
              </View>
              <Button title="close" onPress={() => setModalVisible(false)} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PhoneModal;

const styles = StyleSheet.create({
  img: {},
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

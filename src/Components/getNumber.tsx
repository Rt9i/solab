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
import {GoogleLoginAndRegister, sendOTP, verifyOTP} from '../res/api';
import Images from '../assets/images/images';
import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {toast} from 'react-hot-toast';
import SolabContext from '../store/solabContext';

type PhoneModalProps = {
  phoneNumber: string | null;
  setPhoneNumber: (phone: string) => void;
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setIsPhoneVerified: (verified: boolean) => void;
  isPhoneVerified: boolean;
};

const PhoneModal: React.FC<PhoneModalProps> = ({
  phoneNumber,
  setPhoneNumber,
  isModalVisible,
  setModalVisible,
  setIsPhoneVerified,
  isPhoneVerified,
}) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeSent, setverificationCodeSent] = useState<
    boolean | null
  >(false);
  const {currentUser, setCurrentUser} = React.useContext(SolabContext);
  
  const showToast = (wemMessage, appText1, appText2) => {
    if (Platform.OS === 'web') {
      toast.success(wemMessage);
    } else {
      Toast.show({
        type: 'success',
        text1: appText1,
        text2: appText2,
        position: 'top',
        visibilityTime: 4000,
        autoHide: true,
      } as any);
    }
  };

  const sendOtpCode = async () => {
    try {
      console.log('sending requeest');

      const response = await sendOTP('+972' + phoneNumber);
      setverificationCodeSent(true);
      console.log('otp rsponse: ', response);
    } catch (e) {
      console.log(e);
    }
  };

  const signToDataBase = async () => {
    try {
      console.log('user data: ', currentUser);
      const userData = {
        name: currentUser.name,
        email: currentUser.email,
        picture: currentUser.photoURL,
        phoneNumber: phoneNumber,
      };

      await GoogleLoginAndRegister(
        userData.name,
        userData.email,
        userData.picture,
        userData.phoneNumber,
      );
    } catch (e) {
      console.log(e);
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
        signToDataBase();
        console.log('verifcation rsponse: ', response);
        // window.location.href = '/';
        return;
      }
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
          <Button title="sign to dadabase" onPress={() => signToDataBase()} />
          {!verificationCodeSent && !isPhoneVerified && (
            <View>
              <Text style={styles.title}>Please enter your phone number:</Text>

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber || ''}
                onChangeText={setPhoneNumber}
              />
              <View style={styles.buttonContainer}>
                <Button title="Verify Phone" onPress={() => sendOtpCode()} />
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)}
                  color="red"
                />
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

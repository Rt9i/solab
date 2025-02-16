import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, View, StyleSheet, Text } from 'react-native';
import { firebase } from '../firebase'; // Ensure you import firebase
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

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
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const auth = getAuth();
  let recaptchaVerifier: RecaptchaVerifier | null = null;

  useEffect(() => {
    // Initialize reCAPTCHA only when the modal is shown
    if (isModalVisible && recaptchaVerifier === null) {
      recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', // ID of the div element for reCAPTCHA container (on the web) or use it invisibly on mobile
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA verified');
          },
        },
        auth
      );
    }

    return () => {
      // Cleanup reCAPTCHA when the modal is closed
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, [isModalVisible]);

  const sendVerificationCode = async (phone: string) => {
    if (!phone) {
      alert('Please enter a valid phone number.');
      return;
    }
    try {
      // Ensure recaptchaVerifier is properly initialized
      if (!recaptchaVerifier) {
        console.error('reCAPTCHA verifier is not initialized');
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId); // Store verificationId for later
      alert('Code sent! Check your phone for the verification code.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Error sending code: ' + error.message);
    }
  };

  const confirmVerificationCode = async () => {
    if (!verificationId || !verificationCode) {
      alert('Please enter the verification code.');
      return;
    }
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      await firebase.auth().signInWithCredential(credential);
      setIsPhoneVerified(true);
      saveUserInfoToDatabase(); // After verification, save the user's info to the database
      setModalVisible(false); // Close the modal
      alert('Phone number verified successfully!');
    } catch (error) {
      console.error('Error confirming verification code:', error);
      alert('Invalid verification code.');
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
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
              onPress={() => sendVerificationCode(phoneNumber || '')}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 600,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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

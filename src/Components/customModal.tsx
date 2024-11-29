import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
interface CustomModalProps {
  message?: string;
  visible?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
  loading?: boolean;
  itemId:String
}

const CustomModal: React.FC<CustomModalProps> = ({
  message = '',
  visible = false,
  onConfirm,
  onCancel,
  loading = false,
  itemId=null,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel} // Close modal on back button press
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{message}</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={50} color="#0000ff" />
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  
    elevation: 5,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalButton: {
    height: 45,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  modalButtonText: {
    height: 60,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

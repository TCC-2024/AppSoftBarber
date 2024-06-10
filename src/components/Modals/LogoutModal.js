import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';

const LogoutModal = ({ visible, onConfirm, onCancel, setShowModal }) => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza de que deseja sair?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity onPress={onConfirm} style={[styles.modalButton, styles.confirmButton]}>
                <Text style={styles.modalButtonText}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: Fonts['poppins-bold']
    },
    modalButton: {
        backgroundColor: 'black',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 12,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: Fonts['poppins-bold']
    },
});

export default LogoutModal;

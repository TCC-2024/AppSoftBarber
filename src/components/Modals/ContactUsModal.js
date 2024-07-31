import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ContactUsModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Entre em Contato Conosco</Text>
          <View style={styles.contactIcons}>
            <TouchableOpacity onPress={() => { Linking.openURL('mailto:contato@exemplo.com'); }}>
              <AntDesign name="mail" size={30} color="#000" style={styles.contactIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/softbarber/'); }}>
              <AntDesign name="instagram" size={30} color="#000" style={styles.contactIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Linking.openURL('tel:+55511912614854'); }}>
              <AntDesign name="phone" size={30} color="#000" style={styles.contactIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={[styles.modalButton, styles.closeButton]}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minWidth: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF5722',
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  contactIcon: {
    textAlign: 'center',
  },
});

export default ContactUsModal;
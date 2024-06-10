import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ReportBugModal = ({ visible, onClose }) => {
  const [bugDescription, setBugDescription] = React.useState('');

  const handleReportBug = () => {
    // Aqui você pode implementar a lógica para enviar o relatório do bug
    console.log('Descrição do bug:', bugDescription);
    // Após enviar, você pode fechar o modal
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Reportar Bug</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o bug..."
            multiline
            onChangeText={(text) => setBugDescription(text)}
            value={bugDescription}
          />
          <TouchableOpacity onPress={handleReportBug} style={[styles.modalButton, styles.reportButton]}>
            <Text style={styles.modalButtonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={[styles.modalButton, styles.closeButton]}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportButton: {
    backgroundColor: '#2196F3',
  },
  closeButton: {
    backgroundColor: '#FF5722',
  },
});

export default ReportBugModal;

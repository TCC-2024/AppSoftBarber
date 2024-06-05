import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BugReportModal({ visible, onClose }) {
    const [bugDescription, setBugDescription] = useState('');

    const handleSubmit = () => {
        // Aqui você pode implementar a lógica para enviar o relatório de bug
        // Por exemplo, enviar para um serviço de monitoramento de erros ou para um servidor
        // Depois de enviar, você pode fechar o modal chamando a função onClose
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Reportar Bug</Text>
                    <TextInput
                        placeholder="Descreva o bug..."
                        style={styles.input}
                        multiline
                        value={bugDescription}
                        onChangeText={setBugDescription}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        maxHeight: 150,
    },
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

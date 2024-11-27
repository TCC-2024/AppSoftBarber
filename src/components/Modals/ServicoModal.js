import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth1, db1, db2 } from '../../config/firebaseConfig';

const ServicoModal = ({ visible, onClose, servico, nomeBarbearia }) => {
    const [selectedService, setSelectedService] = useState(servico);
    const [availableTimes, setAvailableTimes] = useState(['09:00', '10:00', '11:00']);
    const navigation = useNavigation();

    useEffect(() => {
        setSelectedService(servico);
    }, [servico]);

    const handleAgendar = async (horario) => {
        try {
            const user = auth1.currentUser;

            if (!user) {
                throw new Error('Usuário não autenticado.');
            }

            const userId = user.uid;

            // Puxa o nome do usuário do db1
            const userDoc = await getDoc(doc(db1, "Users", userId));
            if (!userDoc.exists()) {
                throw new Error('Usuário não encontrado no banco de dados.');
            }

            const userName = userDoc.data().nome; // Ajuste "nome" para o campo correto no seu DB

            if (!selectedService || !selectedService.servico || !nomeBarbearia) {
                throw new Error('Nome da barbearia ou serviço não encontrado.');
            }

            // Criação do documento no db2
            await setDoc(doc(db2, "Agendamentos", `${userId}_${selectedService.servico}_${horario}`), {
                userId: userId,
                userName: userName, // Inclui o nome do usuário
                barbearia: nomeBarbearia,
                servico: selectedService.servico,
                duracao: selectedService.duracao,
                valor: selectedService.valor,
                horario,
                dataCriacao: serverTimestamp(),
            });

            Toast.show({
                type: 'success',
                text1: 'Sucesso ao Agendar!',
            });

            navigation.navigate('Agenda', {
                screen: 'AgendaScreen',
                params: {
                    barbearia: nomeBarbearia,
                    servico: selectedService.servico,
                    horario: horario,
                },
            });

            onClose();
        } catch (error) {
            console.error('Erro ao agendar:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao Agendar',
                text2: error.message,
            });
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.serviceTitle}>Serviço: {selectedService?.servico}</Text>
                    <Text style={styles.serviceDetail}>Valor: R$ {selectedService?.valor}</Text>
                    <Text style={styles.serviceDetail}>Duração: {selectedService?.duracao} minutos</Text>
                    <Text style={styles.serviceDetail}>Barbearia: {nomeBarbearia}</Text>

                    <Text style={styles.availabilityTitle}>Horários Disponíveis:</Text>
                    {availableTimes.map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.availabilityButton}
                            onPress={() => handleAgendar(time)}
                        >
                            <Text style={styles.availabilityText}>{time}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Fechar</Text>
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
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '80%',
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceDetail: {
        fontSize: 16,
        marginBottom: 5,
    },
    availabilityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    availabilityButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    availabilityText: {
        fontSize: 16,
        color: '#fff',
    },
    closeButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ServicoModal;

import { AntDesign } from '@expo/vector-icons';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db2 } from '../../../config/firebaseConfig';
import Fonts from '../../../utils/Fonts';

export default function Agenda({ navigation }) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // Função para buscar agendamentos
    const fetchAgendamentos = async () => {
        try {
            const agendamentosCollection = collection(db2, 'Agendamentos');
            const q = query(agendamentosCollection);
            const querySnapshot = await getDocs(q);
            const fetchedAgendamentos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAgendamentos(fetchedAgendamentos);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };

    // Buscar agendamentos ao montar o componente
    useEffect(() => {
        fetchAgendamentos();
    }, []);

    // Função de refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAgendamentos(); // Recarrega os dados
        setRefreshing(false); // Para o indicador de carregamento
    };

    // Função para excluir um agendamento
    const confirmDelete = async (id) => {
        try {
            await deleteDoc(doc(db2, 'Agendamentos', id));
            setAgendamentos((prevAgendamentos) =>
                prevAgendamentos.filter((agendamento) => agendamento.id !== id)
            );
            Alert.alert('Sucesso', 'Agendamento excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            Alert.alert('Erro', 'Não foi possível excluir o agendamento.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Agenda</Text>

                {agendamentos.length === 0 ? (
                    <View style={styles.empty}>
                        <AntDesign name="calendar" color="#94A3B8" size={36} />
                        <Text style={styles.emptyTitle}>Sem agendamentos</Text>
                        <Text style={styles.emptyDescription}>Inicie um agendamento para conferir.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Explorar')}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Iniciar agenda</Text>
                                <AntDesign name="rocket1" color="#fff" size={18} style={{ marginLeft: 12 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={agendamentos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.agendamentoContainer}>
                                <View style={styles.agendamentoDetails}>
                                    <Text style={styles.agendamentoText}>Barbearia: {item.barbearia}</Text>
                                    <Text style={styles.agendamentoText}>Serviço: {item.servico}</Text>
                                    <Text style={styles.agendamentoText}>Horário: {item.horario}</Text>
                                </View>
                                <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                                    <AntDesign name="delete" size={24} color="#e74c3c" />
                                </TouchableOpacity>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#3498db']}
                            />
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily: Fonts['poppins-bold']
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        fontFamily: Fonts['poppins-semiBold']
    },
    emptyDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        marginHorizontal: 32,
        fontFamily: Fonts['poppins-regular']
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts['poppins-bold']
    },
    agendamentoContainer: {
        padding: 16,
        marginBottom: 16, // Espaçamento entre os itens
        borderRadius: 10, // Bordas arredondadas
        flexDirection: 'row', // Layout em linha
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1, // Adiciona uma borda
        borderColor: '#000', // Cor da borda
    },
    agendamentoDetails: {
        flex: 1,
    },
    agendamentoText: {
        fontSize: 16,
        color: '#333', // Cor do texto
        fontFamily: Fonts['poppins-regular'],
        marginBottom: 4, // Espaçamento entre as linhas
    },
    deleteButton: {
        padding: 8,
    },
});
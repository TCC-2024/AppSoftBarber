import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db1, db2 } from '../config/firebaseConfig';
import ServicoModal from './Modals/ServicoModal';

export default function BarbeariaDetalhes({ route }) {
    const { nomebarbeariacadastro, sobre, imageUrl, userId } = route.params;
    const navigation = useNavigation();  // Use useNavigation hook

    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState('');
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [error, setError] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [telefones, setTelefones] = useState([]);
    const [servicosState, setServicosState] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Função para abrir o modal e selecionar o serviço
    const openModal = (servico) => {
        setSelectedService(servico);
        setModalVisible(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setSelectedService(null);
        setModalVisible(false);
    };

    useEffect(() => {
        const unsubscribeAvaliacoes = onSnapshot(
            query(collection(db1, 'Avaliacoes'), where('barbeariaId', '==', userId)),
            (querySnapshot) => {
                const avaliacoesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAvaliacoes(avaliacoesData);
            }
        );
        const unsubscribeEnderecos = onSnapshot(collection(db2, 'CadastroEndereço'), (querySnapshot) => {
            const enderecosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEnderecos(enderecosData);
        });

        const unsubscribeTelefones = onSnapshot(collection(db2, 'UsersBarbeiros'), (querySnapshot) => {
            const telefonesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTelefones(telefonesData);
        });

        const unsubscribeServicos = onSnapshot(collection(db2, 'CadastroServiços'), (querySnapshot) => {
            const servicosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userServicos = servicosData.find(servico => servico.userId === userId);
            if (userServicos) {
                setServicosState(userServicos.servicos);
            }
        });

        return () => {
            unsubscribeAvaliacoes();
            unsubscribeEnderecos();
            unsubscribeTelefones();
            unsubscribeServicos();
        };
    }, [userId]);

    const handleAvaliar = async () => {
        if (comentario.trim() === '') {
            setError('Por favor, adicione um comentário.');
        } else {
            try {
                const avaliacaoExistente = avaliacoes.find(avaliacao => avaliacao.barbeariaId === userId);
                if (avaliacaoExistente) {
                    setError('Você já avaliou esta barbearia.');
                    return;
                }

                const novaAvaliacao = { barbeariaId: userId, nota, comentario };
                const docRef = await addDoc(collection(db1, 'Avaliacoes'), novaAvaliacao);

                if (docRef) {
                    setAvaliacoes([...avaliacoes, { ...novaAvaliacao, id: docRef.id }]);
                    setNota(0);
                    setComentario('');
                    setError('');
                } else {
                    throw new Error('Erro ao adicionar avaliação.');
                }
            } catch (error) {
                console.error('Erro ao salvar avaliação:', error);
                setError('Ocorreu um erro ao salvar a avaliação. Por favor, tente novamente mais tarde.');
            }
        }
    };

    const handleExcluirAvaliacao = async (avaliacaoId) => {
        try {
            await deleteDoc(doc(db1, 'Avaliacoes', avaliacaoId));
            setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== avaliacaoId));
        } catch (error) {
            console.error('Erro ao excluir avaliação:', error);
            setError('Ocorreu um erro ao excluir a avaliação. Por favor, tente novamente mais tarde.');
        }
    };

    const enderecoBarbearia = enderecos.find(endereco => endereco.id === userId);
    const telefoneBarbearia = telefones.find(telefone => telefone.id === userId);

    const renderItem = ({ item }) => (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewRating}>{item.nota} estrelas</Text>
                <TouchableOpacity onPress={() => handleExcluirAvaliacao(item.id)}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.reviewComment}>{item.comentario}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={[{ key: '1', type: 'image' }, { key: '2', type: 'content' }]}
                renderItem={({ item }) => {
                    if (item.type === 'image') {
                        return (
                            <Image
                                source={{ uri: imageUrl || 'https://st3.depositphotos.com/3919539/16400/i/450/depositphotos_164002372-stock-photo-man-stylish-client-in-barbershop.jpg' }}
                                style={styles.image}
                            />
                        );
                    } else {
                        return (
                            <View style={styles.contentContainer}>
                                <Text style={styles.title}>{nomebarbeariacadastro}</Text>
                                <Text style={styles.description}>{sobre}</Text>
                                <View style={styles.infoContainer}>
                                    <AntDesign name="enviromento" size={24} color="#000" />
                                    {enderecoBarbearia ? (
                                        <Text style={styles.infoText}>
                                            Rua: {enderecoBarbearia.rua}, {enderecoBarbearia.cidade}, {enderecoBarbearia.estado}, {enderecoBarbearia.cep}
                                        </Text>
                                    ) : (
                                        <Text style={styles.infoText}>Endereço não encontrado</Text>
                                    )}
                                </View>
                                <View style={styles.infoContainer}>
                                    <AntDesign name="phone" size={24} color="#000" />
                                    {telefoneBarbearia ? (
                                        <Text style={styles.infoText}>{telefoneBarbearia.telefone}</Text>
                                    ) : (
                                        <Text style={styles.infoText}>Telefone não encontrado</Text>
                                    )}
                                </View>
                                <View style={styles.servicesContainer}>
                                    <Text style={styles.servicesTitle}>Serviços</Text>
                                    {servicosState.length > 0 ? (
                                        servicosState.map((servico, index) => (
                                            <TouchableOpacity key={index} style={styles.serviceCard} onPress={() => openModal(servico)}>
                                                <View style={styles.serviceInfo}>
                                                    <Text style={styles.serviceText}>Serviço: {servico.servico}</Text>
                                                    <Text style={styles.serviceText}>Duração: {servico.duracao} minutos</Text>
                                                    <Text style={styles.serviceText}>Valor: R$ {servico.valor}</Text>
                                                </View>
                                                <View style={styles.agendarButton}>
                                                    <Text style={styles.buttonText}>Agendar</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text style={styles.noServicesText}>Nenhum serviço disponível</Text>
                                    )}
                                </View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={closeModal}
                                >
                                    <ServicoModal
                                        onClose={closeModal}
                                        servico={selectedService}
                                        navigation={navigation}
                                        nomeBarbearia={nomebarbeariacadastro} // Passando o nome da barbearia para o modal
                                    />
                                </Modal>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingTitle}>Avaliar Barbearia</Text>
                                    <View style={styles.starContainer}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <TouchableOpacity key={star} onPress={() => setNota(star)}>
                                                <AntDesign
                                                    name={star <= nota ? 'star' : 'staro'}
                                                    size={32}
                                                    color="#FFD700"
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Escreva seu comentário"
                                        value={comentario}
                                        onChangeText={setComentario}
                                    />
                                    {error !== '' && <Text style={styles.errorText}>{error}</Text>}
                                    <TouchableOpacity style={styles.button} onPress={handleAvaliar}>
                                        <Text style={styles.buttonText}>Avaliar Barbearia</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={avaliacoes}
                                    renderItem={renderItem}
                                    ListEmptyComponent={<Text style={styles.noReviewsText}>Ainda não há avaliações.</Text>}
                                />
                            </View>
                        );
                    }
                }}
                keyExtractor={item => item.key}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: -20,
    },
    contentContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    servicesContainer: {
        padding: 20,
    },
    servicesTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceText: {
        fontSize: 16,
        marginBottom: 5,
    },
    agendarButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noServicesText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    ratingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    reviewContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    reviewRating: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewComment: {
        fontSize: 14,
        color: '#333',
    },
    noReviewsText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});

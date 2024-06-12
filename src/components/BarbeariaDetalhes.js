import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Fonts from '../utils/Fonts';
import { db1, db2 } from '../config/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

export default function BarbeariaDetalhes({ route }) {
    const { nomebarbeariacadastro, sobre, imageUrl, userId } = route.params;
    const navigation = useNavigation();

    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState('');
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [error, setError] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [telefones, setTelefones] = useState([]);
    const [servicosState, setServicosState] = useState([]);

    const handleAgendar = () => {
        navigation.navigate('Agenda', { nomebarbeariacadastro });
    };

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
        return () => {
            unsubscribeAvaliacoes();
        };
    }, [userId]);

    useEffect(() => {
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
            unsubscribeEnderecos();
            unsubscribeTelefones();
            unsubscribeServicos();
        };
    }, []);

    const enderecoBarbearia = enderecos.find(endereco => endereco.id === userId);
    const telefoneBarbearia = telefones.find(telefone => telefone.id === userId);
    const handleExcluirAvaliacao = async (avaliacaoId) => {
        try {
            await deleteDoc(doc(db1, 'Avaliacoes', avaliacaoId));
            setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== avaliacaoId));
        } catch (error) {
            console.error('Erro ao excluir avaliação:', error);
            setError('Ocorreu um erro ao excluir a avaliação. Por favor, tente novamente mais tarde.');
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewRating}>{item.nota} estrelas</Text>
            </View>
            <Text style={styles.reviewComment}>{item.comentario}</Text>
            <TouchableOpacity onPress={() => handleExcluirAvaliacao(item.id)}>
                <Text>
                    <AntDesign name="delete" size={24} color="black" />
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                                            Rua: {enderecoBarbearia.ruanumero}, {enderecoBarbearia.cidade}, {enderecoBarbearia.estado}, {enderecoBarbearia.cep}
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
                                            <View key={index} style={styles.serviceContainer}>
                                                <Text style={styles.serviceText}>Serviço: {servico.servico}</Text>
                                                <Text style={styles.serviceText}>Duração: {servico.duracao} minutos</Text>
                                                <Text style={styles.serviceText}>Valor: R$ {servico.valor}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.noServicesText}>Nenhum serviço disponível</Text>
                                    )}
                                </View>
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
                                    <TouchableOpacity onPress={handleAvaliar}>
                                        <Text style={{ fontFamily: Fonts['poppins-regular'], fontSize: 18, backgroundColor: 'black', textAlign: 'center', borderRadius: 10, color: '#fff', width: '90%', alignSelf: 'center' }}>Avaliar Barbearia</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
                <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 16,
    },
    servicesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    serviceText: {
        fontSize: 16,
        color: '#333',
    },
    noServicesText: {
        fontSize: 16,
        color: '#999',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center',
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Fonts['poppins-bold']
    },
    ratingContainer: {
        marginTop: 20,
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
        borderRadius:
            10,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    reviewContainer: {
        marginTop: 20,
        padding: 10,
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
        marginBottom: 5,
    },
    reviewRating: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
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
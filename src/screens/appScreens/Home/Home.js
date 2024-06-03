import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, TextInput, StatusBar } from 'react-native';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db2, db1, auth1 } from '../../../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../utils/Colors';
import Card from '../../../components/Card';

export default function Home({ navigation }) {
    const [barbearias, setBarbearias] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [nomeUser, setNomeUser] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth1.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db1, "Users", user.uid));
                if (userDoc.exists()) {
                    setNomeUser(userDoc.data().nome);
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserData();

        const unsubscribeBarbearias = onSnapshot(collection(db2, 'CadastroBarbearia'), (querySnapshot) => {
            const barbeariasData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBarbearias(barbeariasData);
        });

        const unsubscribeEnderecos = onSnapshot(collection(db2, 'CadastroEndereço'), (querySnapshot) => {
            const enderecosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEnderecos(enderecosData);
        });

        return () => {
            unsubscribeBarbearias();
            unsubscribeEnderecos();
        };
    }, []);

    const handlePress = (barbearia) => {
        navigation.navigate('BarbeariaDetalhes', barbearia);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar backgroundColor={colors.primary} translucent={false} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.welcomeTitle}>Olá, {nomeUser}</Text>
                <Ionicons name='person-outline' size={28} color={colors.white} onPress={() => navigation.navigate('Perfil')} />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ backgroundColor: colors.primary, height: 120, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Explore as </Text>
                        <Text style={styles.headerTitle}>melhores barbearias</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name='search' size={28} />
                            <TextInput placeholder='Buscar Barbearia' style={{ color: '#dddedd' }} />
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Barbearias perto de você...</Text>
                <View style={styles.cardsContainer}>
                    {barbearias.map(barbearia => (
                        <Card
                            key={barbearia.id}
                            title={barbearia.nomebarbeariacadastro}
                            content={barbearia.sobre}
                            street={enderecos.find(endereco => endereco.id === barbearia.id)?.ruanumero || 'Endereço não encontrado'}
                            imageUrl={barbearia.imageUrl}
                            onPress={() => handlePress(barbearia)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
    },
    welcomeTitle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 26
    },
    headerTitle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 23
    },
    inputContainer: {
        height: 60,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#8d8d8d'
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 50,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardsContainer: {
        marginTop: -50,
    }
});

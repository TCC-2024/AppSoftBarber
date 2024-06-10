import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Fonts from '../../../utils/Fonts';
import Card from '../../../components/Card';
import { colors } from '../../../utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { auth1, db1, db2 } from '../../../config/firebaseConfig';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Home({ navigation }) {

    const [barbearias, setBarbearias] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [nomeUser, setNomeUser] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBarbearias, setFilteredBarbearias] = useState([]);
    const [image, setImage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const userId = auth1.currentUser.uid;
            await saveImageURLToFirestore(userId, result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth1.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db1, "Users", user.uid));
                if (userDoc.exists()) {
                    setNomeUser(userDoc.data().nome);
                    if (userDoc.data().imageURL) {
                        setImage(userDoc.data().imageURL);
                    }
                } else {
                    console.log("No such document!");
                }
            }
        };

        const formatDate = (date) => {
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('pt-BR', options);
        };

        fetchUserData();
        setCurrentDate(formatDate(new Date()));

        const unsubscribeBarbearias = onSnapshot(collection(db2, 'CadastroBarbearia'), (querySnapshot) => {
            const barbeariasData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBarbearias(barbeariasData);
            setFilteredBarbearias(barbeariasData);
            setRefreshing(false); // <- Define refreshing como false quando os dados forem carregados
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
    }, [refreshing]); // <- Adicione refreshing como dependência do useEffect

    const onRefresh = () => {
        setRefreshing(true); // <- Define refreshing como true ao iniciar o refresh
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const filteredData = barbearias.filter(barbearia =>
                barbearia.nomebarbeariacadastro.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredBarbearias(filteredData);
        } else {
            setFilteredBarbearias(barbearias);
        }
    };

    const handlePress = (barbearia) => {
        navigation.navigate('BarbeariaDetalhes', barbearia);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar translucent={false} backgroundColor='#000' barStyle="light-content" />
            <View style={styles.header}>
                <View>
                    <Text style={{ color: '#fff', fontSize: 20, fontFamily: Fonts['poppins-bold'] }}>Olá, {nomeUser}</Text>
                    <Text style={{ color: '#b0b0b0', fontSize: 14, fontFamily: Fonts['poppins-semiBold'] }}>{currentDate}</Text>
                </View>
                {image ? (
                    <Image source={{ uri: image }} style={styles.img} />
                ) : (
                    <Image source={require('../../../assets/images/padrao.jpg')} style={styles.img} />
                )}
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ paddingHorizontal: 20, backgroundColor: '#000', height: 90, borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}>
                    <View>
                        <View style={styles.inputContainer}>
                            <AntDesign name='search1' size={25} />
                            <TextInput
                                placeholder='Buscar Barbearias'
                                style={styles.textInput}
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Barbearias perto de você...</Text>
                <View style={styles.cardsContainer}>
                    {filteredBarbearias.map(barbearia => (
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
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: 'black'
    },
    img: {
        height: 55,
        width: 55,
        borderRadius: 25,
    },
    headerTitle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 23
    },
    inputContainer: {
        height: 50,
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 15,
        shadowColor: '#8d8d8d'
    },
    textInput: {
        color: '#000',
        fontFamily: Fonts['poppins-regular'],
        marginTop: 6,
        marginLeft: 9,
        flex: 1,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 40,
        fontFamily: Fonts['poppins-bold'],
        fontSize: 20,
        marginTop: 20
    },
    cardsContainer: {
        marginTop: -50,
    }
});

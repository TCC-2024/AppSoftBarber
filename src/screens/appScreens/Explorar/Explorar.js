import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../utils/Colors';
import Fonts from '../../../utils/Fonts';
import { db2 } from '../../../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Card from '../../../components/Card';

export default function Explorar({ navigation }) {
  const [barbearias, setBarbearias] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBarbearias, setFilteredBarbearias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFirestoreData();
    setRefreshing(false);
  };

  const loadFirestoreData = async () => {
    try {
      const barbeariasCollection = collection(db2, 'CadastroBarbearia');
      const barbeariasSnapshot = await onSnapshot(barbeariasCollection, (querySnapshot) => {
        const barbeariasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBarbearias(barbeariasData);
        setFilteredBarbearias(barbeariasData);
      });

      const enderecosCollection = collection(db2, 'CadastroEndereço');
      const enderecosSnapshot = await onSnapshot(enderecosCollection, (querySnapshot) => {
        const enderecosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnderecos(enderecosData);
      });
    } catch (error) {
      console.error('Erro ao carregar dados do Firestore:', error);
    }
  };

  useEffect(() => {
    loadFirestoreData();
  }, []);

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
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Explore as</Text>
          <Text style={styles.headerTitle}>melhores barbearias</Text>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ paddingHorizontal: 20, backgroundColor: '#000', height: 30, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
          <View style={styles.inputContainer}>
            <AntDesign name='search1' size={25} />
            <TextInput
              placeholder='Buscar por Barbearias'
              style={styles.textInput}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recomendado</Text>
        <View style={styles.cardsContainer}>
          {filteredBarbearias.map(barbearia => (
            <Card
              key={barbearia.id}
              title={barbearia.nomebarbeariacadastro}
              content={barbearia.sobre}
              street={enderecos.find(endereco => endereco.id === barbearia.id)?.rua || 'Endereço não encontrado'}
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
  headerContainer: {
    backgroundColor: colors.dark,
    height: 130,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: Fonts['poppins-bold'],
    fontSize: 22,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
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
    marginTop: 20,
    marginBottom: 50,
    fontFamily: Fonts['poppins-bold'],
    fontSize: 20,
  },
  cardsContainer: {
    marginTop: -30,
  }
});

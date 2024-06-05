import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../utils/Colors';

const mockData = [
  { id: '1', name: 'Barbearia A', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Barbearia B', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Barbearia C', image: 'https://via.placeholder.com/150' },
];

export default function Explorar() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Explore as</Text>
          <Text style={styles.headerTitle}>melhores barbearias</Text>
          <View style={styles.inputContainer}>
            <Ionicons name='search' size={24} color={colors.grey} />
            <TextInput placeholder='Buscar por barbearias' style={styles.input} />
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Recomendado</Text>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    height: 180,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 50,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.grey,
    fontSize: 16,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

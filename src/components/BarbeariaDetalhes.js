import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BarbeariaDetalhes({ route }) {
    const { nomebarbeariacadastro, sobre, imageUrl } = route.params;
    const navigation = useNavigation();

    const handleAgendar = () => {
        // Passar informações relevantes para a tela de agendamento
        navigation.navigate('Agenda', { nomebarbeariacadastro });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{nomebarbeariacadastro}</Text>
                <Text style={styles.description}>{sobre}</Text>
                {/* Botão de agendamento */}
                <Button title="Agendar" onPress={handleAgendar} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
});

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Favoritos({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                <Text style={styles.title}>Favoritos</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.emptyMessage}>Você ainda não tem nenhum item favorito.</Text>
                {/* Adicione aqui a exibição dos itens favoritos */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
});

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Fonts from '../utils/Fonts';

export default function Favoritos({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ padding: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Favoritos</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.emptyMessage}>Você ainda não tem nenhum item favorito.</Text>
                {/* Adicione aqui a exibição dos itens favoritos */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 55,
        marginLeft: 35,
    },
    title: {
        fontSize: 30,
        color: '#000',
        fontFamily: Fonts["poppins-bold"],
        marginVertical: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
        marginBottom: 90,
    },
});
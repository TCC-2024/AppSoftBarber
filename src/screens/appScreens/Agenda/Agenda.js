import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function Agenda({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Agenda</Text>

                <View style={styles.empty}>
                    <Ionicons color="#94A3B8" name="storefront-outline" size={36} />

                    <Text style={styles.emptyTitle}>Sem agendamentos</Text>

                    <Text style={styles.emptyDescription}>
                        Inicie um agendamento para conferir.
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Explorar')
                        }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Iniciar agenda</Text>

                            <Ionicons
                                color="#fff"
                                name="rocket-outline"
                                size={18}
                                style={{ marginLeft: 12 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        paddingBottom: 140,
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    /** Empty */
    empty: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 21,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
        marginTop: 16,
    },
    emptyDescription: {
        fontSize: 15,
        fontWeight: '500',
        color: '#878787',
        marginBottom: 24,
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#000',
        borderColor: '#000',
    },
    btnText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#fff',
    },
});
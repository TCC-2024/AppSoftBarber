import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Card({ title, content, street, onPress }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', padding: 24 }}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.card}>
                    <Image
                        resizeMode="cover"
                        source={require('../assets/images/barbershop.jpg')}
                        style={styles.cardImg}
                    />
                    <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
                        {isFavorite ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="hearto" size={24} color="red" />}
                    </TouchableOpacity>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTag}>{title}</Text>
                        <Text style={styles.cardTitle}>{content}</Text>
                        <View style={styles.cardRow}>
                            <AntDesign name="enviromento" size={18} color="black" style={{ marginRight: 5 }} />
                            <Text style={styles.cardRowItemText}>{street}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        marginBottom: -20,
        backgroundColor: '#F6F6F6',
        position: 'relative', // Add this line
    },
    cardImg: {
        width: 110,
        height: 110,
        borderRadius: 12,
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    cardBody: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
    },
    cardTag: {
        fontWeight: '500',
        fontSize: 23,
        color: '#000',
        marginBottom: 2,
        textTransform: 'capitalize',
    },
    cardTitle: {
        fontWeight: '300',
        fontSize: 13,
        lineHeight: 19,
        color: '#000',
        marginBottom: 7,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -8,
        marginBottom: 'auto',
    },
    cardRowItemText: {
        fontWeight: '400',
        fontSize: 13,
        color: '#000',
    },
});
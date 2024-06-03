import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth1 } from '../../../config/firebaseConfig';

export default function Splash({ navigation }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const unsubscribe = onAuthStateChanged(auth1, user => {
                if (user) {
                    navigation.replace('RoutesTab');
                } else {
                    navigation.replace('OnBoarding');
                }
            });
            return () => unsubscribe();
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logobranca.png')} style={styles.image} />
            <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
    },
    image: {
        width: 450,
        height: 450,
        resizeMode: 'contain',
    },
    loader: {
        position: 'absolute',
        bottom: 190,
    },
});
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import Fonts from "../../../../utils/Fonts";

export default function Recuperar({ navigation }) {
    const [email, setEmail] = useState("");

    const handleForgot = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Email enviado");
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 10 * 3 }}>Nova Senha</Text>
                    <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Esqueceu sua senha, Não se preocupe! Inisira o seu e-mail de cadastro e enviaremos intruções para você.</Text>
                </View>
                <View style={styles.containerinput}>
                    <TextInput placeholder="Email" placeholderTextColor={"#626262"} style={{
                        fontFamily: Fonts["poppins-regular"], fontSize: 14, padding: 10 * 1.7, borderWidth: 1,
                        borderColor: "#ccc", borderRadius: 10, marginVertical: 10
                    }} />
                </View>

                <TouchableOpacity onPress={handleForgot}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Recerber Intuções</Text>
                    </View>
                </TouchableOpacity>
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
    containerinput: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: Fonts['poppins-bold']
    },
});
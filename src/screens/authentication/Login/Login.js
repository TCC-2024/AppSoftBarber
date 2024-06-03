import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Fonts from '../../../utils/Fonts'
import { Ionicons } from '@expo/vector-icons'
import { auth1 } from '../../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth1, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    console.log(user);
                    setEmail("");
                    setSenha("");
                    navigation.navigate("RoutesTab");
                } else {
                    // Se o e-mail não foi verificado, exiba uma mensagem de erro ou tome alguma outra ação
                    Alert.alert("Erro", "Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail antes de fazer login.");
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 10 * 2 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 10 * 3 }}>Iniciar Sessão</Text>
                    <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Seja Bem vindo novamente!</Text>
                </View>
                <View style={{ marginVertical: 10 * 3, }}>
                    <TextInput placeholder="Email" placeholderTextColor={"#626262"} value={email} onChangeText={setEmail} style={{
                        fontFamily: Fonts["poppins-regular"], fontSize: 14, padding: 10 * 1.7, borderWidth: 1,
                        borderColor: "#ccc", borderRadius: 10, marginVertical: 10
                    }} />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#ccc", borderRadius: 10, marginVertical: 10
                    }}>
                        <TextInput placeholder="Senha" placeholderTextColor={"#626262"} value={senha} onChangeText={setSenha} style={{
                            fontFamily: Fonts["poppins-regular"], fontSize: 14, padding: 10 * 1.7, flex: 1,
                        }} secureTextEntry={!showPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="#333"
                                style={{ paddingHorizontal: 10, }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Recuperar")}>
                        <Text style={{ fontFamily: Fonts["poppins-semiBold"], fontSize: 14, color: '#000', alignSelf: 'flex-end' }}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleLogin} style={{
                    padding: 10 * 1.2, backgroundColor: '#000', marginVertical: 10 * 3, borderRadius: 10
                }}>
                    <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', textAlign: 'center', fontSize: 20 }}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#000', textAlign: 'center', fontSize: 14 }}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>
                <View style={styles.connectWithContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.connectWithText}>Ou conecte com</Text>
                    <View style={styles.dividerLine} />
                </View>
                <View style={styles.googleButtonContainer}>
                    <TouchableOpacity style={styles.googleButton}>
                        <Ionicons
                            name="logo-google"
                            size={24}
                            color="black"
                            style={styles.googleIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    connectWithContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    connectWithText: {
        color: "#333",
        paddingHorizontal: 10,
        fontFamily: Fonts["poppins-regular"]
    },
    googleButtonContainer: {
        alignItems: "center",
    },
    googleButton: {
        backgroundColor: "#fff",
        borderRadius: 50,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
    },
    googleIcon: {
        textAlign: "center",
        fontSize: 35,
    },
})


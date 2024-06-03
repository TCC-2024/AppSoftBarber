import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Fonts from '../../../utils/Fonts'
import { Ionicons } from '@expo/vector-icons'
import { auth1, db1 } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastro({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const handleCadastro = () => {
        createUserWithEmailAndPassword(auth1, email, senha)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userId = user.uid;
                await setDoc(doc(db1, "Users", userId), {
                    nome: nome,
                    email: email,
                    senha: senha,
                });
                setNome('');
                setEmail('');
                setSenha('');

                navigation.navigate("Login");
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ padding: 10 * 2 }}>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ fontSize: 30, color: '#000', fontFamily: Fonts["poppins-bold"], marginVertical: 10 * 3 }}>Criar Conta</Text>
                    <Text style={{ fontFamily: Fonts["poppins-regular"], marginTop: -20, fontSize: 15, maxWidth: "80%", textAlign: 'center', color: '#848484' }}>Crie sua conta, para aproveitar ao maxímo.</Text>
                </View>
                <View style={{ marginVertical: 10 * 3, }}>
                    <TextInput placeholder="Nome" placeholderTextColor={"#626262"} value={nome} onChangeText={setNome} style={{
                        fontFamily: Fonts["poppins-regular"], fontSize: 14, padding: 10 * 1.7, borderWidth: 1,
                        borderColor: "#ccc", borderRadius: 10, marginVertical: 10
                    }} />
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
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleCheckboxChange} style={styles.checkbox}>
                        {isChecked && <Ionicons name="checkbox" size={20} color="black" />}
                        {!isChecked && <Ionicons name="checkbox-outline" size={20} color="black" />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Concordo com os Termos & Condições</Text>
                </View>
                <TouchableOpacity onPress={handleCadastro} style={{
                    padding: 10 * 1.2, backgroundColor: '#000', marginVertical: 10 * 3, borderRadius: 10
                }}>
                    <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', textAlign: 'center', fontSize: 20 }}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("Login")}>
                    <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#000', textAlign: 'center', fontSize: 14 }}>Já tem uma conta? Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: -20
    },
    checkbox: {
        textAlign: 'center',
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 13,
        color: '#333',
        fontFamily: Fonts['poppins-regular']
    },
})


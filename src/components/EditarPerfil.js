import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { getAuth, updateEmail, updatePassword, deleteUser } from 'firebase/auth';
import { getDoc, updateDoc, collection, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { auth1, db1 } from '../config/firebaseConfig';
import Fonts from '../utils/Fonts';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function EditarPerfil({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const usersCollection = collection(db1, "Users");
    const userId = user.uid;
    const userDocRef = doc(usersCollection, userId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setNome(userData.nome || '');
                    setEmail(userData.email || '');
                    setSenha(userData.senha || ''); // Supõe que a senha está armazenada no Firestore
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSaveNome = async () => {
        try {
            await updateDoc(userDocRef, {
                nome: nome
            });
            Alert.alert('Name Updated Successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveEmail = async () => {
        try {
            await updateEmail(auth.currentUser, email);
            console.log('Email Updated Successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveSenha = async () => {
        try {
            await updatePassword(auth.currentUser, senha);
            await updateDoc(userDocRef, {
                senha: senha
            });
            Alert.alert('Password Updated Successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveAll = async () => {
        try {
            await handleSaveNome();
            await handleSaveEmail();
            await handleSaveSenha();
            Alert.alert('All updates were successful');
        } catch (error) {
            console.error('Error updating information:', error);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const db = getFirestore();

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmDeleteAccount = async () => {
        setShowModal(false);
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteUser(user);
                await deleteDoc(doc(db, 'Users', user.uid));
                console.log('Conta excluída com sucesso');
                Toast.show({
                    type: 'success',
                    text1: 'Conta excluída',
                    text2: 'Sua conta foi excluída com sucesso',
                    position: 'bottom',
                    visibilityTime: 3000, // 3 segundos
                    autoHide: true,
                });
            } else {
                console.log('Nenhum usuário está autenticado no momento');
            }
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            // Trate o erro aqui
            // Exibir o toast de erro ao excluir conta
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao excluir a conta do usuário',
                position: 'bottom',
                visibilityTime: 3000, // 3 segundos
                autoHide: true,
            });
        }
    };

    const cancelLogout = () => {
        setShowModal(false);
    };

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
                    <Text style={styles.title}>Editar Conta</Text>
                    <Text style={styles.subtitle}>
                        Mantenha seu perfil atualizado e aproveite ao máximo todas as funcionalidades.
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={nome ? nome : "Nome"}
                        placeholderTextColor={"#626262"}
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={email ? email : "Email"}
                        placeholderTextColor={"#626262"}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <View style={styles.passwordContainer}>
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

                <TouchableOpacity onPress={handleSaveAll} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 3 }} onPress={() => setShowModal(true)}>
                    <Text style={{ fontFamily: Fonts["poppins-semiBold"], color: '#ff0000', textAlign: 'center', fontSize: 14 }}>DELETAR CONTA</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Tem certeza de que deseja <Text style={{ color: '#ff0000' }}>DELETAR</Text> sua conta?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity onPress={confirmDeleteAccount} style={[styles.modalButton, styles.confirmButton]}>
                                <Text style={styles.modalButtonText}>DELETAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelLogout} style={[styles.modalButton, styles.cancelButton]}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
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
        marginVertical: 30,
    },
    subtitle: {
        fontFamily: Fonts["poppins-regular"],
        marginTop: -20,
        fontSize: 15,
        maxWidth: "80%",
        textAlign: 'center',
        color: '#848484',
    },
    inputContainer: {
        marginVertical: 30,
    },
    input: {
        fontFamily: Fonts["poppins-regular"],
        fontSize: 14,
        padding: 17,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
    },
    passwordInput: {
        fontFamily: Fonts["poppins-regular"],
        fontSize: 14,
        padding: 17,
        flex: 1,
    },
    saveButton: {
        padding: 12,
        backgroundColor: '#000',
        marginVertical: 30,
        borderRadius: 10,
    },
    saveButtonText: {
        fontFamily: Fonts["poppins-bold"],
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: Fonts['poppins-bold']
    },
    modalButton: {
        backgroundColor: 'black',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginBottom: 12,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: Fonts['poppins-bold']
    },
});
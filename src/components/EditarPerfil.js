import React, { useState } from 'react';
import { View, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { getAuth, sendEmailVerification, updateEmail, updatePassword } from 'firebase/auth';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { auth1, db1 } from '../config/firebaseConfig';

export default function EditarPerfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const user = auth1.currentUser;
    const usersCollection = collection(db1, "Users");
    const userId = user.uid;
    const userDocRef = doc(usersCollection, userId);

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

    const handleSaveEmail = () => {
        const auth = getAuth();
        updateEmail(auth.currentUser, email).then(() => {
            Alert.alert('Sucesso ao atualizar email')
        }).catch((error) => {
            // An error occurred    
            // ...
        });
    }



    const handleSaveSenha = () => {
        updatePassword(user, senha).then(() => {
            Alert.alert('Suceso ao atualizar a senha')
        }).catch((error) => {
            console.log(error);
        });
    }

    const deleteUser = () => {
        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    return (
        <View>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <Button title="Salvar Alterações" onPress={handleSaveEmail} />
            <TouchableOpacity onPress={deleteUser}>
                <Text>Deletar Conta</Text>
            </TouchableOpacity>
        </View>
    );
}

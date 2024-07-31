import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications'; // Importando expo-notifications
import { signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import ContactUsModal from '../../../components/Modals/ContactUsModal';
import LogoutModal from '../../../components/Modals/LogoutModal';
import ReportBugModal from '../../../components/Modals/ReportBugModal';
import { auth1, db1 } from '../../../config/firebaseConfig';
import Fonts from '../../../utils/Fonts';

export default function Perfil({ navigation }) {
  const [form, setForm] = useState({
    darkMode: false,
    pushNotifications: false,
  });
  const [contactUsModalVisible, setContactUsModalVisible] = useState(false);
  const [showBugModal, setShowBugModal] = useState(false);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userDoc, setUserDoc] = useState(null);
  const [nomeUser, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth1.currentUser;
      if (user) {
        const userDoc = doc(db1, "Users", user.uid);
        const unsubscribe = onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setNomeUser(userData.nome);
            setEmailUser(userData.email);
            setImage(userData.imageURL);
          } else {
            console.log("No such document!");
          }
        });
        setUserDoc(userDoc);
        return () => unsubscribe();
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Você precisa permitir notificações para usar este recurso!');
        }
      }
    };

    requestPermissions();
  }, []);

  const saveImageURLToFirestore = async (userId, imageURL) => {
    try {
      const userRef = doc(db1, 'Users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, {
          imageURL: imageURL
        });
      } else {
        await setDoc(userRef, {
          imageURL: imageURL
        });
      }
      console.log('URL da imagem salva com sucesso no Firestore.');
    } catch (error) {
      console.error('Erro ao salvar a URL da imagem no Firestore:', error);
    }
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    signOut(auth1)
      .then(() => {
        console.log('Usuário deslogado');
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          text1: 'Logout',
          text2: 'Usuário desconectado com sucesso',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error.message);
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Erro ao desconectar o usuário',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const userId = auth1.currentUser.uid;
      await saveImageURLToFirestore(userId, result.assets[0].uri);
    }
  };

  const handleNotificationToggle = async (value) => {
    if (value) {
      // Solicitar permissões se ativar notificações
      const { status } = await Notifications.getPermissionsAsync();
      if (status === 'granted') {
        setForm({ ...form, pushNotifications: value });
      } else {
        alert('Você precisa permitir notificações para ativar essa opção!');
        setForm({ ...form, pushNotifications: false });
      }
    } else {
      setForm({ ...form, pushNotifications: value });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor='#000' barStyle="light-content" />
      <View>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderContent}>
          <TouchableOpacity
            onPress={pickImage}>
            <View style={styles.profileAvatarWrapper}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileAvatar} />
              ) : (
                <Image source={require('../../../assets/images/padrao.jpg')} style={styles.profileAvatar} />
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{nomeUser}</Text>
            <View style={styles.profileLocation}>
              <AntDesign name="mail" size={14} color="#000" style={styles.emailIcon} />
              <Text style={styles.profileEmail}>{emailUser}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.iconContainer}>
            <AntDesign name="ellipsis1" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('EditarPerfil')}
            style={styles.row}>
            <AntDesign name="setting" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Configurações</Text>
            <View style={styles.rowSpacer} />
            <AntDesign name="arrowright" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.row}>
            <AntDesign name="bulb1" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <CustomSwitch
              value={form.darkMode}
              onValueChange={(value) => setForm({ ...form, darkMode: value })}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Favoritos')}
            style={styles.row}>
            <AntDesign name="hearto" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Favoritos</Text>
            <View style={styles.rowSpacer} />
            <AntDesign name="arrowright" size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.row}>
            <AntDesign name="bells" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Notificações</Text>
            <View style={styles.rowSpacer} />
            <CustomSwitch
              value={form.pushNotifications}
              onValueChange={handleNotificationToggle}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>

          <TouchableOpacity
            onPress={() => setShowBugModal(true)}
            style={styles.row}>
            <AntDesign name="tool" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Reportar Bug</Text>
            <View style={styles.rowSpacer} />
            <AntDesign name="arrowright" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setContactUsModalVisible(true)}
            style={styles.row}>
            <AntDesign name="phone" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Contate-nos</Text>
            <View style={styles.rowSpacer} />
            <AntDesign name="arrowright" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.row}>
            <AntDesign name="logout" size={20} color="#000" style={styles.icon} />
            <Text style={styles.rowLabel}>Sair</Text>
            <View style={styles.rowSpacer} />
            <AntDesign name="arrowright" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ReportBugModal visible={showBugModal} onClose={() => setShowBugModal(false)} />
      <ContactUsModal
        visible={contactUsModalVisible}
        onClose={() => setContactUsModalVisible(false)}
      />
      <LogoutModal
        visible={showModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        setShowModal={setShowModal}
      />
    </SafeAreaView>
  );
}

const CustomSwitch = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={[styles.switchContainer, value && styles.switchActive]}
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}>
      <View style={[styles.switchToggle, value && styles.switchToggleActive]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 32,
    fontFamily: Fonts['poppins-bold'],
    color: '#1d1d1d',
    marginLeft: 30,
    paddingTop: 20,
  },
  profileHeader: {
    paddingBottom: 20,
  },
  profileHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  profileAvatarWrapper: {
    marginRight: 16,
  },
  profileAvatar: {
    width: 74,
    height: 74,
    borderRadius: 52,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontFamily: Fonts['poppins-bold'],
    color: '#000',
    marginBottom: -10,
  },
  profileLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailIcon: {
    marginRight: 2,
    marginBottom: 2
  },
  profileEmail: {
    fontSize: 12,
    color: '#000',
    fontFamily: Fonts['poppins-regular'],
    marginRight: 'auto',
  },
  iconContainer: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 24,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    fontFamily: Fonts['poppins-semiBold']
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  rowLabel: {
    fontSize: 15,
    marginTop: 4.5,
    fontFamily: Fonts['poppins-regular'],
    color: '#0c0c0c',
  },
  rowSpacer: {
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  switchContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: 2,
  },
  switchActive: {
    backgroundColor: '#4CAF50',
  },
  switchToggle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  switchToggleActive: {
    transform: [{ translateX: 20 }],
  },
});

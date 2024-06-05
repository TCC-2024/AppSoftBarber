import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { auth1 } from '../../../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { colors } from '../../../utils/Colors';
import Fonts from '../../../utils/Fonts';

export default function Perfil({ navigation }) {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            signOut(auth1).then(() => {
              console.log('Usuário deslogado');
              navigation.navigate('Login')
            }).catch((error) => {
              console.error('Erro ao fazer logout:', error.message);
            });
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar} />
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>Bruno Sai</Text>
            <View style={styles.profileAddressContainer}>
              <Ionicons name="location-outline" size={20} color="#8d8d8d" style={{ marginTop: 6 }} />
              <Text style={styles.profileAddress}>Localização</Text>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferências</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('EditarPerfil')}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8d8d8d' }]}>
                <Ionicons color="#fff" name="settings-outline" size={20} />
              </View>

              <Text style={styles.rowLabel}>Configurações</Text>

              <View style={styles.rowSpacer} />

              <Ionicons
                color="#C6C6C6"
                name="chevron-forward"
                size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <Ionicons color="#fff" name="moon" size={20} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={darkMode => setForm({ ...form, darkMode })}
                value={form.darkMode} />
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#f12' }]}>
                <Ionicons
                  color="#fff"
                  name="heart-outline"
                  size={20} />
              </View>

              <Text style={styles.rowLabel}>Favoritos</Text>

              <View style={styles.rowSpacer} />

              <Ionicons
                color="#C6C6C6"
                name="chevron-forward"
                size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <Ionicons color="#fff" name="notifications-outline" size={20} />
              </View>

              <Text style={styles.rowLabel}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={pushNotifications => setForm({ ...form, pushNotifications })}
                value={form.pushNotifications} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <Ionicons color="#fff" name="flag" size={20} />
              </View>

              <Text style={styles.rowLabel}>Reportar Bug</Text>

              <View style={styles.rowSpacer} />

              <Ionicons
                color="#C6C6C6"
                name="chevron-forward"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <Ionicons color="#fff" name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contate-nos</Text>

              <View style={styles.rowSpacer} />

              <Ionicons
                color="#C6C6C6"
                name="chevron-forward"
                size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#ff6600' }]}>
                <Ionicons color="#fff" name="log-out-outline" size={20} />
              </View>

              <Text style={styles.rowLabel}>Sair</Text>

              <View style={styles.rowSpacer} />

              <Ionicons
                color="#C6C6C6"
                name="chevron-forward"
                size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profileAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 99,
    height: 99,
    borderRadius: 999,
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
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
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    borderWidth: 0.3,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,

  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 15,
    marginTop: 4.5,
    fontFamily: Fonts['poppins-regular'],
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center'
  },
});
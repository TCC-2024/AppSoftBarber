import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function Explorar() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View>
        <View style={{ backgroundColor: colors.primary, height: 120, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Explore as </Text>
            <Text style={styles.headerTitle}>melhores barbearias</Text>
            <View style={styles.inputContainer}>
              <Ionicons name='search' size={28} />
              <TextInput placeholder='Buscar por barbearias' style={{ color: '#dddedd' }} />
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recomendado</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 23
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#8d8d8d'
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 50,
    fontWeight: 'bold',
    fontSize: 20,
  },
})
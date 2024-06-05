import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Drive() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Barber Drive</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Card 1</Text>
          <Text style={styles.cardText}>Conteúdo do Card 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Card 2</Text>
          <Text style={styles.cardText}>Conteúdo do Card 2</Text>
        </View>
        {/* Adicione mais cards conforme necessário */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function Agenda() {
    return (
        <SafeAreaView>
            <View>
                <View>
                    <Text>Anteriores</Text>
                    <Text>Próximos</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fonts from '../../../utils/Fonts'
const { height } = Dimensions.get("window")

export default function OnBoarding({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <ImageBackground style={styles.image} resizeMode="contain" source={require("../../../assets/images/logopreta.png")} />
            </View>

            <View style={{ paddingHorizontal: 10, paddingTop: 10 * 6 }}>
                <Text style={{ fontSize: 28, color: '#000', fontFamily: Fonts["poppins-bold"], textAlign: "center" }}>
                    Descubra as melhores{"\n"}barbearias aqui
                </Text>
            </View>
            <View style={{
                paddingHorizontal: 10 * 4,
            }}>

                <Text style={{ fontSize: 14, color: '#000', fontFamily: Fonts["poppins-regular"], textAlign: "center", marginTop: 10 * 2 }}>
                    Explore todas as opções de barbearias do brasil inteiro!
                </Text>
                <View style={{ paddingHorizontal: 10 * 2, paddingTop: 10 * 6 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ backgroundColor: '#000', padding: 6 * 2.0, borderRadius: 10 }}>
                        <Text style={{ fontFamily: Fonts["poppins-bold"], color: '#fff', fontSize: 18, textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={{ paddingTop: 15 }}>
                        <Text style={{ fontFamily: Fonts['poppins-regular'], fontSize: 14, textAlign: 'center' }}>Não tem uma conta? <Text style={{ textDecorationLine: 'underline' }}>Cadastre-se</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    image: {
        width: 250,
        height: 250,
    },
})
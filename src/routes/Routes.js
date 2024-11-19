import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import Splash from "../screens/splashScreens/Splash/Splash";
import OnBoarding from "../screens/authentication/OnBoarding/OnBoarding";
import Login from "../screens/authentication/Login/Login";
import Cadastro from "../screens/authentication/Cadastro/Cadastro";
import Recuperar from "../screens/authentication/Login/RecoverPassword/Recuperar";
import Home from "../screens/appScreens/Home/Home";
import Explorar from "../screens/appScreens/Explorar/Explorar";
import Agenda from "../screens/appScreens/Agenda/Agenda";
import Perfil from "../screens/appScreens/Perfil/Perfil";
import BarbeariaDetalhes from "../components/BarbeariaDetalhes";
import EditarPerfil from "../components/EditarPerfil";
import Fonts from "../utils/Fonts";
import { Platform, StyleSheet } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Recuperar" component={Recuperar} />
            <Stack.Screen name="BarbeariaDetalhes" component={BarbeariaDetalhes} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
            <Stack.Screen name="RoutesTab" component={RoutesTab} />

        </Stack.Navigator>
    );
}

function RoutesTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: styles.label,
                headerShown: false,
                tabBarStyle: [
                    styles.tabContainer,
                    Platform.OS === 'ios' && {
                        shadowOffset: { height: -2, width: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 15,
                    },
                ],
                tabBarItemStyle: {
                    marginBottom: 4,
                    marginTop: 10
                },
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: '#000',
            }}
            safeAreaInsets={{
                bottom: 0,
            }}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="home"
                            size={24}
                            color={focused ? '#000' : 'gray'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={21}
                            color={focused ? '#000' : 'gray'}
                        />
                    ),
                }}
                name="Explorar"
                component={Explorar}
            />
            <Tab.Screen
                name="Agenda"
                component={Agenda}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="calendar"
                            size={22}
                            color={focused ? '#000' : 'gray'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="user"
                            size={22}
                            color={focused ? '#000' : 'gray'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        height: 60,
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: Fonts['poppins-regular'],
        fontSize: 12,
    },
});
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Splash from "../screens/splashScreens/Splash/Splash";
import OnBoarding from "../screens/authentication/OnBoarding/OnBoarding";
import Login from "../screens/authentication/Login/Login";
import Cadastro from "../screens/authentication/Cadastro/Cadastro";
import Recuperar from "../screens/authentication/Login/RecoverPassword/Recuperar";
import Home from "../screens/appScreens/Home/Home";
import Explorar from "../screens/appScreens/Explorar/Explorar";
import Drive from "../screens/appScreens/Drive/Drive";
import Agenda from "../screens/appScreens/Agenda/Agenda";
import Perfil from "../screens/appScreens/Perfil/Perfil";
import BarbeariaDetalhes from "../components/BarbeariaDetalhes";
import EditarPerfil from "../components/EditarPerfil";
import Favoritos from "../components/Favoritos";

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
            <Stack.Screen name="Favoritos" component={Favoritos} />
            <Stack.Screen name="RoutesTab" component={RoutesTab} />

        </Stack.Navigator>
    );
}

function RoutesTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#000',
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="home" size={size} color={color} />;
                        }

                        return <Ionicons name="home-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Explorar"
                component={Explorar}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="search" size={size} color={color} />;
                        }

                        return <Ionicons name="search-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Drive"
                component={Drive}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="car" size={size} color={color} />;
                        }

                        return <Ionicons name="car-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Agenda"
                component={Agenda}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="calendar" size={size} color={color} />;
                        }

                        return (
                            <Ionicons name="calendar-outline" size={size} color={color} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name="person" size={size} color={color} />;
                        }

                        return <Ionicons name="person-outline" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
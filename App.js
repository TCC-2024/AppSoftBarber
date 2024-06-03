import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import Routes from './src/routes/Routes';
import { useFonts } from 'expo-font';
import fonts from './src/config/fonts';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>

  );
}
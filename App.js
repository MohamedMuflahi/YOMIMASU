import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'; 
import DetailScreen from './src/screens/DetailScreen';
import ReaderScreen from './src/screens/ReaderScreen';

  const Stack = createNativeStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'YOMIMASU'}} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{title: '', headerTransparent: true}}/>
          <Stack.Screen name="Reader" component={ReaderScreen} options={{title: '', headerTransparent: true,  headerTintColor: 'white'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
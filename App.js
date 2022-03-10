import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; 
import DetailScreen from './src/screens/DetailScreen';
import LogInScreen from './src/screens/LogInScreen';
import ReaderScreen from './src/screens/ReaderScreen';

  const Stack = createNativeStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Yomimasu 読",
              headerTitleAlign: "center",
              headerRight: () => (
                <Button
                onPress={() => navigation.navigate("Log")}
                  title="Log in"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="Reader"
            component={ReaderScreen}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Log"
            component={LogInScreen}
            options={{ title: "Log IN", headerTitleAlign: "center" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
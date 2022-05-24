import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'; 
import DetailScreen from './src/screens/DetailScreen';
import LogInScreen from './src/screens/LogInScreen';
import FavScreen from './src/screens/FavScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoggedHome from './src/screens/LoggedHome';
import React,{useState} from 'react';
import { Provider } from "react-redux";
import store from "./src/redux/store";
  const Stack = createNativeStackNavigator();
  export default function App() {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Log"
            component={LogInScreen}
            options={{ title: "Log in", headerTitleAlign: "center" }}
          />
           <Stack.Screen
            name="Sign"
            component={SignUpScreen}
            options={{ title: "Sign Up", headerTitleAlign: "center" }}
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
            name="Fav"
            component={FavScreen}
            options={{ title: "Favorites", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="LoggedHome"
            component={LoggedHome}
            options={{ title: "Yomimasu 読", headerTitleAlign: "center" }}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
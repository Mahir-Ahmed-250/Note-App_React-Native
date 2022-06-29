import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Home from "./src/screens/Home";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCkK_Ih_qk1SfBxF3TdyuVkCkCuyM630cU",

  authDomain: "my-note-app-ccc18.firebaseapp.com",

  projectId: "my-note-app-ccc18",

  storageBucket: "my-note-app-ccc18.appspot.com",

  messagingSenderId: "249332574978",

  appId: "1:249332574978:web:82e89e15df18049ba9301b"

};





// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const user = false;
  const [loaded] = useFonts({
    "LeagueGothic-Regular": require('./assets/fonts/LeagueGothic-Regular.ttf'),
    "Assistant-Medium": require('./assets/fonts/Assistant-Medium.ttf'),
    "Assistant-Bold": require('./assets/fonts/Assistant-Bold.ttf')
  })
  if (!loaded) {
    return (
      <Text>Font is Loading.........</Text>
    )
  }
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

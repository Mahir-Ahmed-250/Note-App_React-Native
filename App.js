import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from "react";



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
export const db = getFirestore(app)











const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   signOut(auth)
  // })

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      console.log(auth)
      if (user && user.emailVerified) {
        setUser(user)
        setLoading(false)
      }
      else {
        setUser(null)
        setLoading(false)
      }
    })

    return authSubscription;
  }, [])



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
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={require('./6os.gif')} style={{
          alignSelf: "center", resizeMode: "contain", width:
            300
        }} />
      </View>
    )
  }

  return (
    <NavigationContainer theme={AppTheme}>

      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }} >
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create"  >
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name="Update" component={Update} />

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
      <FlashMessage position="bottom" />

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

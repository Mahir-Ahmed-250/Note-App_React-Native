import { View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Text from "../text/text";
import { colors } from "../theme/colors";
import Button from "../components/Button";
import GlobalStyles from "../../GlobalStyles";
import Input from "../components/Input";
import { Feather } from '@expo/vector-icons';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../App'
import { showMessage } from "react-native-flash-message";

export default function SignIn({ navigation }) {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)


  const signIn = async () => {
    setLoading(true)
    signOut(auth)
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        if (res.user.emailVerified) {
          showMessage({
            message: "Successfully logged in!",
            type: "success",
            duration: 8000
          })
        }
        else {
          showMessage({
            message: "Your Email is not Verified!",
            type: "danger",
            duration: 8000
          })
        }
      })
      setLoading(false)
    }
    catch (error) {
      console.log('error----->', error)
      showMessage({
        message: error.message,
        type: "danger"
      })
      setLoading(false)
    }
  }


  return (
    <ScrollView>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Image
          source={require("../../assets/signup.png")}
          style={{ alignSelf: "center" }}
        />
        <Text preset="h2" style={styles.Title}>
          Never Forget your Notes
        </Text>

        <View style={{ paddingHorizontal: 12, paddingVertical: 20 }}>
          <Input
            placeholder={"Email address"}
            onChangeText={(text) => setEmail(text)} autoCapitalize={"none"} />

          <View style={styles.passwordContainer}>
            <TextInput style={styles.inputStyle} placeholder={"Password"}
              secureTextEntry={hidePass ? true : false}
              onChangeText={(text) => setPassword(text)}
            />
            <Feather size={20} color="grey" style={{ marginTop: 15 }}
              name={hidePass ? 'eye-off' : 'eye'}
              onPress={() => setHidePass(!hidePass)} />
          </View>
          <Pressable onPress={() => { navigation.navigate('Forget') }}>

            <Text preset="h4" style={{ color: 'blue', textAlign: "right", marginRight: 15 }} >
              Forget password?
            </Text>
          </Pressable>

        </View>

        {
          loading ? (
            <ActivityIndicator />
          ) : (
            <Button onPress={signIn} title={"Login"} customStyles={{ alignSelf: "center", marginBottom: 60 }} />
          )
        }

        <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 10, alignItems: "center" }}>

          <Pressable onPress={() => { navigation.navigate('SignUp') }}>
            <Text preset="h4">
              Don't have an account? <Text preset="h4" style={{ color: 'green', marginLeft: 10, }}>Sign up</Text>
            </Text>
          </Pressable>
        </View>



      </SafeAreaView >
    </ScrollView>


  );
}


const styles = StyleSheet.create({
  Title: {
    textAlign: "center",
    color: colors.red
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    height: 48,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 10
  },
  forget: {
    color: "red"
  }
});
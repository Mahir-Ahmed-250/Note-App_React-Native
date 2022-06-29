import { View, SafeAreaView, StyleSheet, Image, TextInput, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import Text from "../text/text";
import { colors } from "../theme/colors";
import Button from "../components/Button";
import GlobalStyles from "../../GlobalStyles";
import Input from "../components/Input";
import { Feather } from '@expo/vector-icons';



export default function SignIn({ navigation }) {
  const [hidePass, setHidePass] = useState(true);
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

        <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
          <Input placeholder={"Email address"} />
          <View style={styles.passwordContainer}>
            <TextInput style={styles.inputStyle} placeholder={"Password"} secureTextEntry={hidePass ? true : false}
            />
            <Feather size={20} color="grey" style={{ marginTop: 15 }}
              name={hidePass ? 'eye-off' : 'eye'}
              onPress={() => setHidePass(!hidePass)} />
          </View>

        </View>

        <Button onPress={() => { console.log('hello') }} title={"Login"} customStyles={{ alignSelf: "center", marginBottom: 60 }} />


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
    marginBottom: 30
  }
});
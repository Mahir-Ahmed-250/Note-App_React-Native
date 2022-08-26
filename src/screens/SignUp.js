import { View, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Text from "../text/text";
import Button from "../components/Button";
import GlobalStyles from "../../GlobalStyles";
import Input from "../components/Input";
import { Feather } from '@expo/vector-icons';
import { colors } from "../theme/colors";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import { auth, db } from '../../App'
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapShot,
  query,
  where
} from 'firebase/firestore'
import { showMessage } from 'react-native-flash-message'

const genderOptions = ['Male', 'Female']

export default function SignUp({ navigation }) {


  const [gender, setGender] = useState(null)
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)


  const signup = async () => {
    setLoading(true)
    try {
      // Created User With Email & Password
      const result = await createUserWithEmailAndPassword(auth, email, password)

      // Add User Profile to Database
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid
      })

      await sendEmailVerification(auth.currentUser)
        .then(() => {
          showMessage({
            message: "Please check your email inbox or spam for verification link!",
            type: "success",
            duration: 8000
          })

        });

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
      <SafeAreaView style={GlobalStyles.droidSafeArea} >

        <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
          <Input placeholder={"Email Address"} onChangeText={(text) => setEmail(text)} autoCapitalize={"none"} />


          <View style={styles.passwordContainer}>
            <TextInput style={styles.inputStyle} placeholder={"Password"} secureTextEntry={hidePass ? true : false} onChangeText=
              {(text) => setPassword(text)}
            />
            <Feather size={20} color="grey" style={{ marginTop: 15 }}
              name={hidePass ? 'eye-off' : 'eye'}
              onPress={() => setHidePass(!hidePass)} />
          </View>

          <Input placeholder={"Full Name"} onChangeText=
            {(text) => setName(text)}
            autoCapitalize={"words"}

          />
          <Input placeholder={"Age"} keyboardType="numeric" onChangeText=
            {(text) => setAge(text)} />
          <View style={{ marginVertical: 20 }}>
            <Text preset="h5">
              Select gender
            </Text>
          </View>
          {
            genderOptions.map((option) => {
              const selected = option === gender;
              return (
                <Pressable onPress={() => setGender(option)} key={option} style={styles.radioContainer}>
                  <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                    <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                  </View>
                  <Text preset="h4" style={styles.radioText}>
                    {option}
                  </Text>
                </Pressable>
              )
            }

            )
          }
          {
            loading ? (
              <ActivityIndicator />
            ) : (
              <Button title={"Sign Up"} customStyles={{ alignSelf: "center", marginTop: 25 }} onPress={signup} />
            )
          }


        </View>





        <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 10, alignItems: "center" }}>

          <Pressable onPress={() => { navigation.navigate("SignIn") }}>
            <Text preset="h4">
              Already have an account? <Text preset="h4" style={{ color: 'green', marginLeft: 10, }}>Sign in</Text>
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
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center"
  },

  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  radioText: {
    marginLeft: 10
  },
  selectedOuterCircle: {
    borderColor: "#FF7276"
  },
  selectedInnerCircle: {
    backgroundColor: "#FF7276",
    borderColor: "#FF7276"
  }
});
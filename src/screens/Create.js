import { View, Text, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalStyles from '../../GlobalStyles'
import Input from '../components/Input'
import RadioInput from '../components/RadioInput'
import Button from '../components/Button'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../App'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment';


const noteColorOptions = ["red", "blue", "green", "black"]
export default function Create({ navigation, user }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noteColor, setNoteColor] = useState('red');
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, 'notes'), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
        time: String(moment().utcOffset('+06:00').format(' hh:mm a')),
        date: String(new Date())

      })
      setLoading(false)
      navigation.goBack()
      showMessage({
        message: "Note Created Successfully",
        type: "success"
      })

    }
    catch (err) {
      console.log('err--->', err)
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { paddingHorizontal: 20, flex: 1 }]}>
      <Input
        placeholder={"Title"}
        onChangeText=
        {(text) => setTitle(text)}
      />
      <Input
        placeholder={"Description"}
        onChangeText=
        {(text) => setDescription(text)}
        multiline />
      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>
          Select your note color
        </Text>
      </View>
      {noteColorOptions.map((option, index) => (
        <RadioInput
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}

      {loading ? <ActivityIndicator /> :
        <Button title={"Create"} customStyles={{ alignSelf: "center", marginTop: 60, width: "100%" }} onPress={onPressCreate} />
      }

    </SafeAreaView>
  )
}
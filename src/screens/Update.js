import { View, Text, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalStyles from '../../GlobalStyles'
import Input from '../components/Input'
import RadioInput from '../components/RadioInput'
import Button from '../components/Button'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment';

const noteColorOptions = ["red", "blue", "green", "black"]
export default function Create({ navigation, user, route }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
    const noteRef = doc(db, "notes", noteItem.id)
    setLoading(true)
    try {
      await updateDoc(noteRef, {
        title: title,
        description: description,
        color: noteColor,
        date: String(new Date()),
        time: String(moment().utcOffset('+06:00').format(' hh:mm a'))
      })
      setLoading(false)
      navigation.goBack()
      showMessage({
        message: "Note Updated Successfully",
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
        value={title}
      />
      <Input
        placeholder={"Description"}
        onChangeText=
        {(text) => setDescription(text)}
        multiline
        value={description}
      />
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
        <Button title={"Update"} customStyles={{ alignSelf: "center", marginTop: 60, width: "100%" }} onPress={onPressUpdate} />
      }

    </SafeAreaView>
  )
}
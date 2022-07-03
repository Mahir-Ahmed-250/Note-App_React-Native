import { View, SafeAreaView, StyleSheet, Pressable, FlatList, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../GlobalStyles'
import { AntDesign } from '@expo/vector-icons'
import Text from '../text/text'
import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../../App'
import { signOut } from 'firebase/auth'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message'

export default function Home({ user, navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //create the query
    const q = query(collection(db, 'notes'), where('uid', '==', user.uid))
    //create listener
    const notesListenerSubscription = onSnapshot(q, (querySnapShot) => {
      const list = []
      querySnapShot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setNotes(list)
      setLoading(false)
    })

    return notesListenerSubscription;
  }, [])

  const onPressCreate = () => {
    navigation.navigate('Create')

  }

  const renderItem = ({ item }) => {
    const { name, title, description, color, time, date } = item

    const onPressDeleteMsg = async () => {
      try {
        deleteDoc(doc(db, "notes", item.id))
        showMessage({
          message: "Note Deleted Successfully",
          type: "danger"
        })
      }
      catch (err) {
        console.log('err--->', err)
      }
    }

    const onPressDelete = () => {
      Alert.alert(
        "Delete Warning!",
        "Do you really want to Delete this Note?",
        [
          {
            text: "No"
          },
          {
            text: "Yes", onPress: onPressDeleteMsg
          }
        ]
      );
    }

    return (

      <Pressable style={{ backgroundColor: color, marginBottom: 20, borderRadius: 20, padding: 15 }}
        onPress={() => {
          navigation.navigate('Update', { item })
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ width: "80%" }} >
            <Text preset='h1' style={{ color: 'white', fontSize: 28 }}>
              {title}
            </Text>
            <Text preset='h5' style={{ color: 'white', fontSize: 20, marginTop: 15 }}>
              {description}
            </Text>
            <Text preset='h5' style={{ color: 'white', fontSize: 16, marginTop: 25 }}>
              Last Update:
            </Text>
            <Text preset='h5' style={{ color: 'white', fontSize: 18 }}>
              {time} -- {date.slice(0, 15)}
            </Text>
          </View>
          <View >
            <Pressable onPress={onPressDelete}>
              <MaterialIcons name="delete-forever" size={40} color="white" />
            </Pressable>
          </View>
        </View>
      </Pressable>

    )
  }



  const signout = () => {
    Alert.alert(
      "Logout Warning!",
      "Do you really want to logout?",
      [
        {
          text: "No"
        },
        { text: "Yes", onPress: () => signOut(auth) }
      ]
    );

  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
      <View style={styles.container}>
        <View>
          <Text preset='h1' style={{ color: '#FF7276' }} > My Notes</Text>
        </View>


        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={onPressCreate}>

            <AntDesign name="pluscircleo" size={40} color='#FF7276' />
          </Pressable>
          <Pressable style={{ marginLeft: 15 }} onPress={signout}>
            <Entypo name="log-out" size={40} color='#FF7276' />
          </Pressable>
        </View>



      </View>
      {
        notes == 0 ?

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={require('../../assets/not.png')} />
          </View>
          :
          <FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.title} contentContainerStyle={{ padding: 20 }} />

      }


    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#FF7276"
  },
});

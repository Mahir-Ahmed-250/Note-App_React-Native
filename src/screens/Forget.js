import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GlobalStyles from '../../GlobalStyles'
import Text from '../text/text'
import { colors } from '../theme/colors'
import Input from '../components/Input'
import Button from '../components/Button'
import { showMessage } from 'react-native-flash-message'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../App'

export default function Forget({ navigation }) {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handlePasswordReset = () => {
        setLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                showMessage({
                    message: "Password reset link has been send, please check your spam folder",
                    type: "success",
                    duration: 8000
                })
                setLoading(false);
                navigation.goBack()
            })
            .catch((error) => {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 8000
                })
                setLoading(false)
            });
    }
    return (
        <ScrollView>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Image
                    source={require("../../assets/forget.png")}
                    style={{ alignSelf: "center" }}
                />
                <Text preset="h3" style={styles.Title}>
                    Enter your Email Address
                </Text>

                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                    <Input
                        placeholder={"Email address"}
                        onChangeText={(text) => setEmail(text)} autoCapitalize={"none"} />
                </View>
                {
                    loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Button onPress={handlePasswordReset} title={"Send Password Reset Link"} customStyles={{ alignSelf: "center", width: 275, marginBottom: 60 }} />
                    )
                }
            </SafeAreaView>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    Title: {
        textAlign: "center",
        color: colors.black
    },

    inputStyle: {
        flex: 1,
        height: 48,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        marginBottom: 10
    }
});
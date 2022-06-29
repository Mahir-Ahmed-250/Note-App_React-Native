import React from "react";
import { TouchableOpacity, StyleSheet, Pressable } from "react-native"
import Text from "../text/text";
import { colors } from "../theme/colors";

export default function Button({ title, onPress, customStyles }) {
    return (

        <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
            <Text preset="h1" style={styles.title}>{title}</Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        width: 175,
        height: 45,
        backgroundColor: "#FF7276",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        color: colors.white
    }
})
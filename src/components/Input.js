import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors';

export default function Input({ placeholder, secureTextEntry, onChangeText, keyboardType, autoCapitalize, multiline, value }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {

        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        marginBottom: 30
    }
});
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps {
    label: string;
    isPassword: boolean;
    getContent: (data: string) => void;
}

export const FormInput = ({ label, isPassword, getContent }: FormInputProps) => {
    const [inputValue, setInputValue] = useState<string>();

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={isPassword}
                value={inputValue}
                onChangeText={(inputValue) => getContent(inputValue)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'column',
        paddingBottom: 20,
        justifyContent: 'space-around',
    },
    label: {
        paddingBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        height: 45,
        padding: 10,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
        borderRadius: 4,
    },
});

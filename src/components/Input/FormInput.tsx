import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps {
    label: string;
    isPassword: boolean;
    getContent: (data: string) => void;
    validationRegex?: RegExp;
    isValidInput?: (isValid: boolean | null) => void;
    errorLabel?: string;
}

export const FormInput = ({
    label,
    isPassword,
    getContent,
    validationRegex,
    isValidInput,
    errorLabel,
}: FormInputProps) => {
    const [inputValue, setInputValue] = useState<string>();
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const checkValue = (inputValue: string) => {
        const isValidInput = validationRegex && validationRegex.test(inputValue);
        setIsValid(isValidInput === undefined || isValidInput);
        setInputValue(inputValue);
    };

    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={isPassword}
                value={inputValue}
                onChangeText={(inputValue) => {
                    checkValue(inputValue);
                    isValidInput && isValidInput(isValid);
                    getContent(inputValue);
                }}
            />
            {isValid === false && <Text style={styles.errorInput}>{errorLabel}</Text>} 
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
    errorInput: {
        color: 'red',
        fontStyle: 'italic',
        paddingTop: 4,
    },
});

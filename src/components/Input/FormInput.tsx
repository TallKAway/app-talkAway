import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormInputProps {
    label: string;
}

export const FormInput = ({ label }: FormInputProps) => {
    const [inputValue, setInputValue] = useState<string>();

    return (
        <View style={styles.inputWrapper}>
            <Text>{label}</Text>
            <TextInput
                style={styles.textInput}
                multiline={true}
                value={inputValue}
                onChangeText={(inputValue) => setInputValue(inputValue)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        height: 40,
        borderRadius: 18,
        padding: 10,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
    },
    inputWrapper: {
        flexDirection: 'column',
        // width: '100%',
        // height: 'auto',
        paddingBottom: 4,
        justifyContent: 'space-around',
    },
    // sendButton: {
    //     padding: 10,
    //     width: 20,
    //     height: 20,
    // },
});

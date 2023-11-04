import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchInputProps {
    getContent: (data: string) => void;
}

export const SearchInput = ({ getContent }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState<string>();

    return (
        <View style={styles.inputWrapper}>
            <TextInput
                value={inputValue}
                style={styles.textInput}
                placeholder="Trouve toi des amis c'est chaud..."
                onChangeText={(inputValue) => {
                    getContent(inputValue);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textInput: {
        borderWidth: 1,
        height: 45,
        padding: 10,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
        borderRadius: 4,
        width: '100%',
    },
});

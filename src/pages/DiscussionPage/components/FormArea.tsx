import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import SendButtonSVG from '../../../common/svg/up-arrow.svg';

export const FormArea = () => {
    const [messageValue, setMessageValue] = useState('');
    const [allMessage, setallMessage] = useState([]);
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Messages"
                onChangeText={(text) => setMessageValue(text)}
            />
            {!messageValue ? (
                <View style={styles.buttonDisabled}>
                    <SendButtonSVG width={25} height={25} />
                </View>
            ) : (
                <View style={styles.button}>
                    <SendButtonSVG width={25} height={25} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'rgb(226, 226, 226)',
        borderRadius: 22,
        margin: 5,
        padding: 10,
    },
    buttonDisabled: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(226, 226, 226)',
        margin: 5,
        padding: 2,
        borderRadius: 50,
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 118, 246)',
        margin: 5,
        padding: 2,
        borderRadius: 50,
    },
});

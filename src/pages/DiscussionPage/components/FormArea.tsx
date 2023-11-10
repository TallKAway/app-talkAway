import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export const Discussion = () => {
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
                    <Button
                        title="add"
                        disabled
                        // onPress={handleAddMessage}
                    />
                </View>
            ) : (
                <View style={styles.button}>
                    <Button
                        title="add"
                        color="rgb(226, 226, 226)"
                        // onPress={handleAddMessage}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(226, 226, 226)',
        margin: 5,
        padding: 2,
        borderRadius: 50,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 118, 246)',
        margin: 5,
        padding: 2,
        borderRadius: 50,
    },
});

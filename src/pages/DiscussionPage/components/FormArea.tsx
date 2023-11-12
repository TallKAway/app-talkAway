import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SendButton } from '../../../components/Button/SendButton';
import SendButtonSVG from '../../../common/svg/up-arrow.svg';

export const FormArea = () => {
    const [messageValue, setMessageValue] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Messages"
                onChangeText={(text) => setMessageValue(text)}
            />
            <SendButton isDisabled={messageValue ? false : true} submitFunction={() => {}} />
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
        width: '85%',
        borderWidth: 1,
        borderColor: 'rgb(226, 226, 226)',
        borderRadius: 22,
        margin: 5,
        padding: 10,
    },
});

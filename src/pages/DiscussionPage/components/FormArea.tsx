import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SendButton } from '../../../components/Button/SendButton';
import SendButtonSVG from '../../../common/svg/up-arrow.svg';

export const FormArea = ({ onMessageValueChange, messageValueFromFormArea }: any) => {
    const [messageValue, setMessageValue] = useState<string>('');

    const handleTextChange = (text: string) => {
        setMessageValue(text);
        onMessageValueChange(text); // Cette ligne appelle la fonction du parent
      };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Messages"
                onChangeText={handleTextChange}   
                value={messageValueFromFormArea}
            />
            {/* <SendButton isDisabled={messageValue ? false : true} submitFunction={() => {}} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '85%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgb(226, 226, 226)',
        borderRadius: 22,
        padding: 10,
    },
});

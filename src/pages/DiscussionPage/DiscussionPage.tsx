import { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    StyleSheet,
} from 'react-native';

import messages from '../../messageData/messages.json';
import { FormArea } from './components/FormArea';
import { MessageArea } from './components/MessageArea';
import { useHeaderHeight } from '@react-navigation/elements';

interface MessagesProps {
    id: number;
    sender: string;
    content: string;
    timestamp: number;
}

export const DiscussionPage = () => {
    const headerheight = useHeaderHeight();
    const [messageData, setMessageData] = useState<MessagesProps[]>([]);

    useEffect(() => {
        setMessageData(messages);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.box}
                data={messageData}
                renderItem={({ item }) => <MessageArea data={item} />}
                keyExtractor={(item) => item.id.toString()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={headerheight}
                style={styles.keyboard}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.input}>
                        <FormArea />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        textAlign: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    box: {
        flex: 2,
        width: '100%',
        borderRadius: 6,
        paddingTop: 20,
    },

    input: {
        width: 'auto',
        justifyContent: 'flex-end',
    },

    keyboard: {},
});

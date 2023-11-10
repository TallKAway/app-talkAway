import { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    StyleSheet,
} from 'react-native';
import messages from '../../messageData/messages.json';
import { Discussion } from './components/FormArea';
import { MessageArea } from './components/MessageArea';

interface DataProps {
    id: number;
    sender: string;
    content: string;
}

export const DiscussionPage = () => {
    const [messageData, setMessageData] = useState<DataProps[]>([]);

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
                style={styles.keyboard}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.input}>
                        <Discussion />
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
        marginTop: 20,
    },

    input: {
        width: '100%',
        justifyContent: 'flex-end',
    },

    keyboard: {},
});

import { useEffect, useRef, useState } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    StyleSheet,
    Button,
    Text,
} from 'react-native';

import messages from '../../messageData/messages.json';
import { FormArea } from './components/FormArea';
import { MessageArea } from './components/MessageArea';
import { useHeaderHeight } from '@react-navigation/elements';
import { getConversationMessages, getConversationId } from '../../core/api/conversation';
import { useUserContext } from '../../context/CurrentUserProvider';
import { io, Socket } from 'socket.io-client';
// import { IPCONFIG_API_BASE_URL, TALK_AWAY_API_BASE_URL } from '@env';
import { IPCONFIG_API_BASE_URL } from '../../utils/Constant';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { SendButton } from '../../components/Button/SendButton';
interface MessagesProps {
    id: string;
    content: string;
    createdAt: string;
    senderId: string;
    direcConversationId: string;
    isMine: boolean;
}

export const DiscussionPage = ({ route }: any) => {
    const { authTokens } = useUserContext();
    const { id } = route.params;
    const accessToken = authTokens?.accessToken;
    const headerheight = useHeaderHeight();

    const SOCKET_SERVER_URL = IPCONFIG_API_BASE_URL;
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    const [messageData, setMessageData] = useState<MessagesProps[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>();
    const [messageValueFromFormArea, setMessageValueFromFormArea] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);

    const fetchConversation = async (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        if (currentRoom) {
            socket.emit('leave_conversation', { conversationId: currentRoom });
        }

        if (accessToken) {
            const conversationData = await getConversationId(accessToken, id);
            if ('id' in conversationData) {
                socket.emit('join_conversation', {
                    token: accessToken,
                    receiverId: id,
                    conversationId: conversationData.id,
                });
                setCurrentRoom(conversationData.id);

                const conversationMessages = await getConversationMessages(
                    accessToken,
                    conversationData.id
                );
                if (conversationMessages.success) {
                    setMessageData(conversationMessages.data);
                }
            }
        }
    };

    const handleMessageValueChange = (newValue: string) => {
        setMessageValueFromFormArea(newValue);
    };

    const handleSendMessage = () => {
        if (socketRef.current && accessToken && currentRoom && messageValueFromFormArea) {
            socketRef.current.emit('send_message', {
                token: accessToken,
                receiverId: id,
                content: messageValueFromFormArea,
            });
            setMessageValueFromFormArea('');
        } else {
            console.error('Cannot send message, socket is null.');
        }
    };

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            path: '/socket.io',
        });

        socketRef.current.on('connect', () => {
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            setIsConnected(false);
        });

        socketRef.current.on('message', (message) => {
            if (message.direcConversationId === currentRoom) {
                setMessageData((prevMessages) => [...prevMessages, message]);
            }
        });

        fetchConversation(socketRef.current);

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off && socketRef.current.off('message');
                socketRef.current = null;
            }
        };
    }, [currentRoom]);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Connecté au Socket : {isConnected ? 'Oui' : 'Non'}</Text>
            </View>

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
                    <View style={styles.inputContainer}>
                        <FormArea
                            onMessageValueChange={handleMessageValueChange}
                            messageValueFromFormArea={messageValueFromFormArea}
                        />
                        <SendButton
                            isDisabled={messageValueFromFormArea ? false : true}
                            submitFunction={handleSendMessage}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    box: {
        flex: 2,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    inputContainer: {
        width: '100%',
        flexDirection: 'row',
    },

    keyboard: {},
});

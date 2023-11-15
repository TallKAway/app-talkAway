import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SearchInput } from '../../../components/Input/SearchInput';
import { useUserContext } from '../../../context/CurrentUserProvider';
import { getConversation } from '../../../core/api/conversation';
import users from '../../../data/users.json';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export const Contact = () => {
    const [research, setResearch] = useState<string>('');
    const [friendName, setFriendName] = useState<string>('Billy');
    const [friendId, setFriendId] = useState<string>('');
    const [userConversation, setUserConversation] = useState([]);

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    const { isAuthenticated, authTokens, logoutUser } = useUserContext();
    const conversation = getConversation(authTokens?.accessToken);

    useEffect(() => {
        setUserConversation(conversation);
    }, [conversation]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contactWrapper}>
                    <Button
                        title="Log Out"
                        onPress={() => {
                            logoutUser();
                        }}
                    />
                    <SearchInput getContent={(data) => setResearch(data)}></SearchInput>
                    <FlatList
                        data={users}
                        renderItem={({ item }) =>
                            research.length > 0 && item.username.includes(research) ? (
                                <Text>{item.username}</Text>
                            ) : null
                        }
                    />
                    <Button
                        title={`discussion with ${friendName}`}
                        onPress={() => {
                            navigation.navigate('Discussion', {
                                userName: friendName,
                                id: friendId,
                            });
                        }}
                    />

                    {userConversation.length !== 0 ? (
                        userConversation.map((conversation) => {
                            <Button
                                title={`discussion with ${friendName}`}
                                onPress={() => {
                                    navigation.navigate('Discussion', {
                                        userName: friendName,
                                        id: friendId,
                                    });
                                }}
                            />;
                        })
                    ) : (
                        <View>
                            <Text>No Conversation</Text>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    contactWrapper: {
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 42,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 16,
    },
    searchTextInput: {
        borderWidth: 2,
    },
});

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FormInput } from '../../../components/Input/FormInput';
import { useUserContext } from '../../../context/CurrentUserProvider';
import { contact } from '../../../core/api/contact';
import { getConversation } from '../../../core/api/conversation';
import { User } from '../../../domains/Contact';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export const Contact = () => {
    const { isAuthenticated, authTokens, logoutUser } = useUserContext();
    const accessToken = authTokens?.accessToken;

    const [searchFriend, setSearchFriend] = useState<string>('');
    const [friendData, setFriendData] = useState<User>();
    console.log('🚀 ~ file: Contact.tsx:26 ~ Contact ~ friendData:', friendData);

    const [friendName, setFriendName] = useState<string>();
    const [friendId, setFriendId] = useState<string>('');
    const [userConversation, setUserConversation] = useState([]);

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    const conversation = getConversation(accessToken);
    useEffect(() => {
        setUserConversation(conversation);
    }, []);

    const getFriendData = async () => {
        if (accessToken) {
            const allUsers = await contact(accessToken);

            if (allUsers.success) {
                const searchedFriend = allUsers.data.find((user) => user.username === searchFriend);
                setFriendData(searchedFriend);
                setFriendName(searchedFriend?.username);
            }
        }
    };

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
                    <Button
                        title={`discussion with ${friendName}`}
                        onPress={() => {
                            navigation.navigate('Discussion', {
                                username: friendName,
                                id: friendId,
                            });
                        }}
                    />

                    {conversation.length !== 0 ? (
                        conversation.map((conversation: any) => {
                            <Button
                                title={`discussion with ${friendName}`}
                                onPress={() => {
                                    navigation.navigate('Discussion', {
                                        username: friendName,
                                        id: friendId,
                                    });
                                }}
                            />;
                        })
                    ) : (
                        <View>
                            <Text>Pas encore de contact ?</Text>
                            <FormInput
                                getContent={(data) => setSearchFriend(data)}
                                label={'Trouve tes ami.e.s !'}
                                isPassword={false}
                            />
                            <Button title={'Rechercher'} onPress={() => getFriendData()} />
                            {friendName && (
                                <>
                                    <Text>Souhaitez-vous ajouter {friendName} ?</Text>
                                    <Button
                                        title={"Confirmer l'ajout"}
                                        onPress={() => 'Mettre la fonction to add a friend here'}
                                    />
                                </>
                            )}
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

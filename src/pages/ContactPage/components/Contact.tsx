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
import { contact, addContact } from '../../../core/api/contact';
import { User } from '../../../domains/Contact';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export const Contact = () => {
    const { authTokens, logoutUser, user, updateUser } = useUserContext();
    const accessToken = authTokens?.accessToken;

    const [searchFriend, setSearchFriend] = useState<string>('');
    const [friendData, setFriendData] = useState<User>();

    const [friendName, setFriendName] = useState<string>();
    const [friendId, setFriendId] = useState<string>();
    const [friendList, setFriendList] = useState<Array<any>>();

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    useEffect(() => {
        setFriendList(user?.friends);
    }, [user]);

    const getFriendData = async () => {
                if (accessToken) {
            const allUsers = await contact(accessToken);

            if (allUsers.success) {
                const searchedFriend = allUsers.data.find((user) => user.username === searchFriend);
                setFriendData(searchedFriend);
                setFriendName(searchedFriend?.username);
                setFriendId(searchedFriend?.id);
            }
        }
    };

    const addFriend = async () => {
        if (accessToken && friendId) {
            const addFriend = await addContact(accessToken, friendId);
            if (addFriend.success) {
                updateUser();
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
                                    onPress={() => addFriend()}
                                />
                            </>
                        )}
                    </View>
                    <View>
                        <Text>Contact</Text>
                        {friendList?.map((friend: any) => (
                            <Button
                                title={`discussion with ${friend.username}`}
                                onPress={() => {
                                    navigation.navigate('Discussion', {
                                        username: friend.username,
                                        id: friend.id,
                                    });
                                }}
                                key={friend.id}
                            />
                        ))}
                    </View>
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

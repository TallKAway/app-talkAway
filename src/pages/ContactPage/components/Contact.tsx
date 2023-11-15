import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import users from '../../../data/users.json';
import { ScreenStackBottomNavigatorProps } from '../../../domains/Navigation';
import { getConversation } from '../../../core/api/conversation';
import { access } from 'fs';

export const Contact = () => {
    const [research, setResearch] = useState<string>('');
    const [friendName, setFriendName] = useState<string>('Billy');
    const [friendId, setFriendId] = useState<string>('');

    const navigation = useNavigation<ScreenStackBottomNavigatorProps>();

    const { isAuthenticated, authTokens } = useUserContext();

    const { conversation } = getConversation(authTokens?.accessToken);
    console.log('🚀 ~ file: Contact.tsx:31 ~ Contact ~ conversation:', conversation);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contactWrapper}>
                    <Text style={styles.title}>Contacts</Text>
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
                    ></Button>
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

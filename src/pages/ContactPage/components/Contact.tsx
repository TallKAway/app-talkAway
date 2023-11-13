import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Button,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchInput } from '../../../components/Input/SearchInput';
import { ScreenStackBottomNavigatorProps } from '../../../domains/Navigation';
import users from '../../../data/users.json';
import { getCredentials } from '../../../core/utils/credentials';

export const Contact = () => {
    const [research, setResearch] = useState<string>('');
    const [friendName, setFriendName] = useState<string>('Billy');
    const [friendId, setFriendId] = useState<string>('');
    const [userToken, setUserToken] = useState<[] | null>([]);
    const navigation = useNavigation<ScreenStackBottomNavigatorProps>();

    async function getAccesToken() {
        let result = await SecureStore.getItemAsync('accessToken');
        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            alert('No values stored under that key.');
        }
    }

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
                        title="Get token"
                        onPress={() => {
                            getAccesToken();
                        }}
                    />

                    <Text>salut : {userToken}</Text>

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

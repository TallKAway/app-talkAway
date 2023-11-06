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
    Pressable,
    ScrollView,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { SearchInput } from '../../../components/Input/SearchInput';
import { useNavigation } from '@react-navigation/native';
import { ContactItem } from './ContactItem';
import users from '../../../data/users.json';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    cellphone: string;
    friends: Array<number>;
};

export const Contact = () => {
    const [research, setResearch] = useState<string>('');
    const navigation = useNavigation<ScreenStackNavigatorProps>();
    const [hasFriends, setHasFriends] = useState(false);

    const [user, setUser] = useState<User[]>([
        {
            id: 1,
            username: 'wyattFox',
            email: 'dylan.lgvn@gmail.com',
            password: 'mdp1',
            cellphone: '+33630004376',
            friends: [1, 2],
        },
    ]);

    const renderContactItem = () => {
        return user[0].friends.length > 0;
    };

    useEffect(() => {
        setHasFriends(renderContactItem);
    }, [renderContactItem]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contactWrapper}>
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Home'); // En attendant la page/rubique notif
                            }}
                        >
                            <IconFontAwesome name="bell" size={25} color="black" />
                        </Pressable>
                        <Text style={styles.titleH1}>Contacts</Text>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Home'); // En attendant la page/rubique d'ajout de contact
                            }}
                        >
                            <IconIonicons name="person-add" size={25} color="black" />
                        </Pressable>
                    </View>
                    {/* <SearchInput getContent={(data) => setResearch(data)}></SearchInput>
                    <FlatList
                        data={users}
                        renderItem={({ item }) =>
                            research.length > 0 && item.username.includes(research) ? (
                                <>
                                    <ContactItem username={item.username} />
                                </>
                            ) : null
                        }
                        style={styles.searchResults}
                    /> */}
                    <ScrollView
                        contentContainerStyle={{
                            ...styles.contactListWrapper,
                            ...(hasFriends ? {} : { alignItems: 'center' }),
                        }}
                    >
                        {/* <Text style={styles.titleH2}>Tes amis</Text> */}
                        {hasFriends ? (
                            <FlatList
                                data={users}
                                renderItem={({ item }) =>
                                    user[0].friends.includes(item.id) ? (
                                        <ContactItem username={item.username} />
                                    ) : null
                                }
                                style={styles.contactList}
                            />
                        ) : (
                            <View>
                                <Text>Tu n'as pas encore d'amis le sang</Text>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('Home'); // En attendant la page/rubique d'ajout de contact
                                    }}
                                    title="Ajouter un contact"
                                />
                            </View>
                        )}
                    </ScrollView>
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
    contactListWrapper: {
        display: 'flex',
        justifyContent: 'center',
        height: '96%',
    },
    titleH1: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    headerAddButton: {
        fontSize: 40,
        fontWeight: '200',
    },
    searchTextInput: {
        borderWidth: 2,
    },
    searchResults: {
        height: 'auto',
        maxHeight: 170,
        backgroundColor: '#E8ECED',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
    },
    contactList: {},
    titleH2: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
});

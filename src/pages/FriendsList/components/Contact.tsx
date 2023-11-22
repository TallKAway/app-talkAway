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
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { SearchInput } from '../../../components/Input/SearchInput';
import { useNavigation } from '@react-navigation/native';
import { ContactItem } from '../../../components/ContactItem/ContactItem';
import { SearchContact } from './SearchContact';
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
    const [hasFriends, setHasFriends] = useState(false);
    const [listContactSection, setContactListSection] = useState<boolean>(true);
    const [searchContactSection, setSearchContactSection] = useState<boolean>(false);
    const [notificationSection, setNotificationSection] = useState<boolean>(false);

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    const [user, setUser] = useState<User[]>([
        {
            id: 1,
            username: 'wyattFox',
            email: 'dylan.lgvn@gmail.com',
            password: 'mdp1',
            cellphone: '+33630004376',
            friends: [1, 2, 3],
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
                        <Text style={styles.titleH1}>Contacts</Text>
                        <View style={styles.headerNavbar}>
                            {/* {!listContactSection ? (
                                <Pressable
                                    style={styles.headerButton}
                                    onPress={() => {
                                        setContactListSection(true);
                                        setSearchContactSection(false);
                                        setNotificationSection(false);
                                    }}
                                >
                                    <IconAntDesign name="arrowleft" size={25} color="black" />
                                </Pressable>
                            ) : null}
                            <Pressable
                                style={styles.headerButton}
                                onPress={() => {
                                    setNotificationSection(true);
                                    setSearchContactSection(false);
                                    setContactListSection(false);
                                }}
                            >
                                <IconFontAwesome name="bell" size={25} color="black" />
                            </Pressable>

                            <Pressable
                                style={styles.headerButton}
                                onPress={() => {
                                    setSearchContactSection(true);
                                    setContactListSection(false);
                                    setNotificationSection(false);
                                }}
                            >
                                <IconIonicons name="person-add" size={25} color="black" />
                            </Pressable> */}

                            <Pressable
                                style={styles.headerButton}
                                onPress={() => {
                                    navigation.navigate('AddContactPage');
                                }}
                            >
                                <IconIonicons name="person-add" size={25} color="black" />
                            </Pressable>

                            {/* <Button
                                title="Ajouter un ami"
                                onPress={() => {
                                    navigation.navigate('AddContactPage');
                                }}
                            ></Button> */}
                        </View>
                    </View>
                    <View>
                        {listContactSection ? (
                            <View
                                style={{
                                    ...styles.contactListWrapper,
                                    ...(hasFriends ? {} : { alignItems: 'center' }),
                                }}
                            >
                                {hasFriends ? (
                                    <FlatList
                                        data={users}
                                        renderItem={({ item }) =>
                                            user[0].friends.includes(item.id) ? (
                                                <ContactItem
                                                    username={item.username}
                                                    id={item.id}
                                                />
                                            ) : null
                                        }
                                        style={styles.contactList}
                                    />
                                ) : (
                                    <View>
                                        <Text>Tu n'as pas encore d'amis le sang</Text>
                                        <Button
                                            onPress={() => {
                                                navigation.navigate('Chat'); // En attendant la page/rubique d'ajout de contact
                                            }}
                                            title="Ajouter un contact"
                                        />
                                    </View>
                                )}
                            </View>
                        ) : null}

                        {searchContactSection ? <SearchContact /> : null}
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
    headerButton: {
        paddingLeft: 20,
    },
    headerNavbar: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchTextInput: {
        borderWidth: 2,
    },
    contactList: {},
    titleH2: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
});

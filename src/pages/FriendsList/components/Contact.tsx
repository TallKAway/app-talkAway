import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { ContactItem } from '../../../components/ContactItem/ContactItem';
import { useUserContext } from '../../../context/CurrentUserProvider';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    cellphone: string;
};

export const Contact = () => {
    const [hasFriends, setHasFriends] = useState(false);
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    const { user } = useUserContext();

    const renderContactItem = () => {
        if (user) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        setHasFriends(renderContactItem);
    }, [renderContactItem]);

    return (
        <>
            <View style={styles.contactWrapper}>
                <View style={styles.header}>
                    <Text style={styles.titleH1}>Contacts</Text>
                    <View style={styles.headerNavbar}>
                        <Pressable
                            style={styles.headerButton}
                            onPress={() => {
                                navigation.navigate('AddContactPage');
                            }}
                        >
                            <IconIonicons name="person-add" size={25} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>

            {hasFriends ? (
                <FlatList
                    data={user?.friends}
                    renderItem={({ item }) => <ContactItem username={item.username} id={item.id}/>}
                    style={styles.contactList}
                />
            ) : (
                <View>
                    <Text>Tu n'as pas encore d'amis le sang</Text>
                    <Button
                        onPress={() => {
                            navigation.navigate('AddContactPage'); // En attendant la page/rubique d'ajout de contact
                        }}
                        title="Ajouter un contact"
                    />
                </View>
            )}
        </>
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
    contactList: {
        padding: 14,
    },
    titleH2: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
});

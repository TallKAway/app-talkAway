import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    FlatList,
} from 'react-native';
import { useState } from 'react';
import { SearchInput } from '../../../components/Input/SearchInput';
import { ContactItem } from './ContactItem';
import users from '../../../data/users.json';
import friends from '../../../data/friends.json';

export const Contact = () => {
    const [research, setResearch] = useState<string>('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contactWrapper}>
                    <Text style={styles.titleH1}>Contacts</Text>
                    <SearchInput getContent={(data) => setResearch(data)}></SearchInput>
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
                    />
                    <View>
                        <Text style={styles.titleH2}>Tes amis</Text>
                        <FlatList
                            data={friends}
                            renderItem={({ item }) => <ContactItem username={item.username} />}
                        />
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
    titleH1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 16,
    },
    searchTextInput: {
        borderWidth: 2,
    },
    searchResults: {
        height: 'fit-content',
        maxHeight: 170,
        backgroundColor: '#E8ECED',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
    },
    contactList: {
        borderWidth: 1,
    },
    titleH2: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 20,
    },
});

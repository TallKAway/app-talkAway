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

import { useEffect, useState } from 'react';
import { SearchInput } from '../../../components/Input/SearchInput';
import { useNavigation } from '@react-navigation/native';
import { ContactItem } from '../../../components/ContactItem/ContactItem';
import users from '../../../data/users.json';

export const FindContact = () => {
    const [research, setResearch] = useState<string>('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <SearchInput getContent={(data) => setResearch(data)}></SearchInput>
                    <FlatList
                        data={users}
                        renderItem={({ item }) =>
                            research.length > 0 && item.username.includes(research) ? (
                                <>
                                    <ContactItem username={item.username} id={''} />
                                </>
                            ) : null
                        }
                        style={styles.searchResults}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 40,
    },
    searchResults: {
        height: 'auto',
        maxHeight: 170,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
    },
});

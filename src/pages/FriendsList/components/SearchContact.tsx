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
import { ContactItem } from './ContactItem';
import users from '../../../data/users.json';

export const SearchContact = () => {
    const [research, setResearch] = useState<string>('');
    return (
        <View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    searchResults: {
        height: 'auto',
        maxHeight: 170,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
    },
});

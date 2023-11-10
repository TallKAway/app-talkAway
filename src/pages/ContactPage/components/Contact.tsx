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
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchInput } from '../../../components/Input/SearchInput';
import { ScreenStackBottomNavigatorProps } from '../../../domains/Navigation';
import users from '../../../data/users.json';

export const Contact = () => {
    const [research, setResearch] = useState<string>('');
    const navigation = useNavigation<ScreenStackBottomNavigatorProps>();

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
                        title="click batard"
                        onPress={() => {
                            navigation.navigate('Home', { userName: 'billy' });
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

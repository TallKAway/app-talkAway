import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { FriendsList } from './components/FriendsList';
export const FriendsListPage = () => {
    return (
        <SafeAreaView style={styles.contactWrapper}>
            <FriendsList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contactWrapper: {
        flex: 1,
        width: '100%',
        height: 'auto',
    },
});

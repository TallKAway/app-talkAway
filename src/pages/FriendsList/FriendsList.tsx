import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Contact } from './components/Contact';
export const FriendsList = () => {
    return (
        <SafeAreaView style={styles.contactWrapper}>
            <Contact />
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

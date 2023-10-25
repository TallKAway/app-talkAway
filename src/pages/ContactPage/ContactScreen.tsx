import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Contact } from './components/Contact';

export const ContactScreen = () => {
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

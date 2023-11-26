import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { ContactDetails } from './components/ContactDetails';
export const ContactDetailsPage = () => {
    return (
        <SafeAreaView style={styles.contactWrapper}>
            <ContactDetails />
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

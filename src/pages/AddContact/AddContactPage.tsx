import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { FindContact } from './components/FindContact';
export const AddContactPage = () => {
    return (
        <SafeAreaView style={styles.contactWrapper}>
            <FindContact />
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

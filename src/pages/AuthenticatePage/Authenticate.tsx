import { View, Text, StyleSheet } from 'react-native';
import { SignUp } from './components/SignUp';

export const Authenticate = () => {
    return (
        <View style={styles.authenticateWrapper}>
            <SignUp />
        </View>
    );
};

const styles = StyleSheet.create({
    authenticateWrapper: {
        width: '100%',
        height: 'auto',
    },
});

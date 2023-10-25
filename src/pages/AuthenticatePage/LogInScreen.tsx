import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogIn } from './components/LogIn';

export const LogInScreen = () => {
    return (
        <SafeAreaView style={styles.authenticateWrapper}>
            <LogIn />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    authenticateWrapper: {
        flex: 1,
        width: '100%',
        height: 'auto',
    },
});

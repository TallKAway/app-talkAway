import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { SignUp } from './components/SignUp';
import { useNavigation } from '@react-navigation/native';

export const SignUpScreen = () => {
    return (
        <SafeAreaView style={styles.authenticateWrapper}>
            <SignUp />
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

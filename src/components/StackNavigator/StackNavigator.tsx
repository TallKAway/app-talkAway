import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SignUpScreen } from '../../pages/AuthenticatePage/SignUpScreen';
import { LogInScreen } from '../../pages/AuthenticatePage/LogInScreen';
import { TabNavigator } from '../../components/TabNavigator/TabNavigator';
import {
    ScreenStackNavigatorParamList,
    ScreenStackBottomNavigatorParamList,
} from '../../domains/Navigation';
import { useUserContext } from '../../context/CurrentUserProvider';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();

export const StackNavigator = () => {
    const { isAuthenticated } = useUserContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={isAuthenticated ? 'SignUp' : 'HomePage'}
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="HomePage" component={TabNavigator} />
        </Stack.Navigator>
    );
};

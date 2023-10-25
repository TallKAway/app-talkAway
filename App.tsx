import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SignUpScreen } from './src/pages/AuthenticatePage/SignUpScreen';
import { LogInScreen } from './src/pages/AuthenticatePage/LogInScreen';
import { ScreenStackNavigatorParamList } from './src/domains/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="SignUp"
            >
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="LogIn" component={LogInScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

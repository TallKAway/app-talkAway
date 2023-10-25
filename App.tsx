import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SignUpScreen } from './src/pages/AuthenticatePage/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogInScreen } from './src/pages/AuthenticatePage/LogInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            {/* <SafeAreaView style={styles.container}> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Authenticate"
            >
                <Stack.Screen name="Authenticate" component={SignUpScreen} />
                <Stack.Screen name="LogIn" component={LogInScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
            {/* </SafeAreaView> */}
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

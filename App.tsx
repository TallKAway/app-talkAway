import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Authenticate } from './src/pages/AuthenticatePage/Authenticate';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // <SafeAreaView style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="AuthenticateScreen"
            >
                <Stack.Screen name="Authenticate" component={Authenticate} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
        // </SafeAreaView>
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

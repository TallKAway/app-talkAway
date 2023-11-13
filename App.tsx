import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CurrentUserProvider } from './src/context/CurrrentUserProvider';
import { StackNavigator } from './src/components/StackNavigator/StackNavigator';
export default function App() {
    const isSignUp = false;

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <CurrentUserProvider>
                <StackNavigator />
            </CurrentUserProvider>
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

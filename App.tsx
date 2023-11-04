import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SignUpScreen } from './src/pages/AuthenticatePage/SignUpScreen';
import { LogInScreen } from './src/pages/AuthenticatePage/LogInScreen';
import { DiscussionPage } from './src/pages/DiscussionPage/DiscussionPage';
import { ContactPage } from './src/pages/ContactPage/ContactPage';
import {
    ScreenStackNavigatorParamList,
    ScreenStackBottomNavigatorParamList,
} from './src/domains/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();
const TabStack = createBottomTabNavigator<ScreenStackBottomNavigatorParamList>();

export default function App() {
    const isSignUp = true;
    return (
        <NavigationContainer>
            {!isSignUp ? (
                <TabStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="Home"
                >
                    <TabStack.Screen name="Home" component={DiscussionPage} />
                    <TabStack.Screen name="Contact" component={ContactPage} />
                </TabStack.Navigator>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName="SignUp"
                >
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="Contact" component={ContactPage} />
                </Stack.Navigator>
            )}

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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SignUpScreen } from './src/pages/AuthenticatePage/SignUpScreen';
import { LogInScreen } from './src/pages/AuthenticatePage/LogInScreen';
import { DiscussionPage } from './src/pages/DiscussionPage/DiscussionPage';
import { HeaderName, HeaderButton } from './src/components/Header/Header';
import { ContactScreen } from './src/pages/ContactPage/ContactScreen';
import {
    ScreenStackNavigatorParamList,
    ScreenStackBottomNavigatorParamList,
} from './src/domains/Navigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();
const TabStack = createBottomTabNavigator<ScreenStackBottomNavigatorParamList>();

export default function App() {
    const isSignUp = false;

    return (
        <NavigationContainer>
            {!isSignUp ? (
                <TabStack.Navigator
                    screenOptions={{
                        headerShown: true,
                    }}
                    initialRouteName="Contact"
                >
                    <TabStack.Screen
                        name="Home"
                        component={DiscussionPage}
                        initialParams={{ userName: '' }}
                        options={({ navigation, route }) => ({
                            headerTitle: (props) =>
                                route.params.userName ? (
                                    <HeaderName>{route.params.userName}</HeaderName>
                                ) : (
                                    <Text>Default Title</Text>
                                ),
                            // Add a placeholder button without the `onPress` to avoid flicker
                            headerLeft: () => (
                                <HeaderButton title={route.name} path={'Contact'}></HeaderButton>
                            ),
                            tabBarStyle: { display: 'none' },
                        })}
                    />
                    <TabStack.Screen name="Contact" component={ContactScreen} />
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

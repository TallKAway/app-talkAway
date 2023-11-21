import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { HeaderButton, HeaderName } from '../../components/Header/Header';
import { TabNavigator } from '../../components/TabNavigator/TabNavigator';
import { useUserContext } from '../../context/CurrentUserProvider';
import { ScreenStackNavigatorParamList } from '../../domains/Navigation';
import { LogInScreen } from '../../pages/AuthenticatePage/LogInScreen';
import { SignUpScreen } from '../../pages/AuthenticatePage/SignUpScreen';
import { DiscussionPage } from '../../pages/DiscussionPage/DiscussionPage';
import { ContactScreen } from '../../pages/ContactPage/ContactScreen';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();

export const StackNavigator = () => {
    const { isAuthenticated } = useUserContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
            initialRouteName={isAuthenticated ? 'Chat' : 'SignUp'}
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Chat"
                component={TabNavigator}
                // options={{ title: 'Chat' }}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Discussion"
                component={DiscussionPage}
                initialParams={{ username: '' }}
                options={({ route }) => ({
                    headerTitle: () =>
                        route.params.username ? (
                            <HeaderName>{route.params.username}</HeaderName>
                        ) : (
                            <Text>Default Title</Text>
                        ),
                    // headerLeft: () => (
                    //     <HeaderButton title={route.name} path={'Contact'}></HeaderButton>
                    // ),
                })}
            />
        </Stack.Navigator>
    );
};

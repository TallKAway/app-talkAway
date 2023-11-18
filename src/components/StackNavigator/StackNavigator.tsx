import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { HeaderButton, HeaderName } from '../../components/Header/Header';
import { TabNavigator } from '../../components/TabNavigator/TabNavigator';
import { useUserContext } from '../../context/CurrentUserProvider';
import { ScreenStackNavigatorParamList } from '../../domains/Navigation';
import { LogInScreen } from '../../pages/AuthenticatePage/LogInScreen';
import { SignUpScreen } from '../../pages/AuthenticatePage/SignUpScreen';
import { DiscussionPage } from '../../pages/DiscussionPage/DiscussionPage';

const Stack = createNativeStackNavigator<ScreenStackNavigatorParamList>();

export const StackNavigator = () => {
    const { isAuthenticated } = useUserContext();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
            initialRouteName={isAuthenticated ? 'HomePage' : 'SignUp'}
        >
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomePage" component={TabNavigator} options={{ title: 'Chats' }} />
            <Stack.Screen
                name="Discussion"
                component={DiscussionPage}
                initialParams={{ username: '' }}
                options={({ route }) => ({
                    headerTitle: () =>
                        route.params.username ? (
                            <HeaderName>{route.params.username + ' ' + route.params.id}</HeaderName>
                        ) : (
                            <Text>Default Title</Text>
                        ),
                    headerLeft: () => (
                        <HeaderButton title={route.name} path={'Contact'}></HeaderButton>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

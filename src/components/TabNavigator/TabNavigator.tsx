import { LogInScreen } from '../../pages/AuthenticatePage/LogInScreen';
import { DiscussionPage } from '../../pages/DiscussionPage/DiscussionPage';
import { ContactScreen } from '../../pages/ContactPage/ContactScreen';
import { HeaderName, HeaderButton } from '../../components/Header/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import {
    ScreenStackNavigatorParamList,
    ScreenStackBottomNavigatorParamList,
} from '../../domains/Navigation';

const TabStack = createBottomTabNavigator<ScreenStackBottomNavigatorParamList>();

export function TabNavigator() {
    return (
        <TabStack.Navigator
            screenOptions={{
                headerShown: true,
            }}
            initialRouteName="Contact"
        >
            <TabStack.Screen
                name="Discussion"
                component={DiscussionPage}
                initialParams={{ userName: '' }}
                options={({ route }) => ({
                    headerTitle: () =>
                        route.params.userName ? (
                            <HeaderName>{route.params.userName + ' ' + route.params.id}</HeaderName>
                        ) : (
                            <Text>Default Title</Text>
                        ),
                    headerLeft: () => (
                        <HeaderButton title={route.name} path={'Contact'}></HeaderButton>
                    ),
                    tabBarStyle: { display: 'none' },
                })}
            />
            <TabStack.Screen name="Contact" component={ContactScreen} />
        </TabStack.Navigator>
    );
}

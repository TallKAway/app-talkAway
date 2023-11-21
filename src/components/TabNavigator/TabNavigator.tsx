import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FriendsList } from '../../pages/FriendsList/FriendsList';
import { useNavigation } from '@react-navigation/native';
import {
    ScreenStackBottomNavigatorParamList,
    ScreenStackBottomNavigatorProps,
} from '../../domains/Navigation';
import { ContactScreen } from '../../pages/ContactPage/ContactScreen';

const TabStack = createBottomTabNavigator<ScreenStackBottomNavigatorParamList>();

export function TabNavigator() {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
            initialRouteName="Chat"
        >
            <TabStack.Screen name="Chat" component={ContactScreen} />
            <TabStack.Screen name="FriendsList" component={FriendsList} />
        </TabStack.Navigator>
    );
}

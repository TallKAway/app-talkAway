import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FriendsListPage } from '../../pages/FriendsList/FriendsListPage';
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
            <TabStack.Screen name="FriendsList" component={FriendsListPage} options={{title:'Contacts'}} />
        </TabStack.Navigator>
    );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
    ScreenStackBottomNavigatorParamList,
    ScreenStackBottomNavigatorProps
} from '../../domains/Navigation';
import { ContactScreen } from '../../pages/ContactPage/ContactScreen';

const TabStack = createBottomTabNavigator<ScreenStackBottomNavigatorParamList>();

export function TabNavigator() {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
            initialRouteName="Contact"
        >
            <TabStack.Screen name="Contact" component={ContactScreen} />
        </TabStack.Navigator>
    );
}

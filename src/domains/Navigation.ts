import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenStackNavigatorParamList = {
    SignUp: undefined;
    LogIn: undefined;
    Chat: undefined;
    Discussion: { username: string | undefined; id: string };
    AddContactPage: undefined;
    Contact: undefined;
    ContactDetail: { username: string | undefined; id: string };
};
export type ScreenStackBottomNavigatorParamList = {
    Chat: undefined;
    Contact: undefined;
    Settings: undefined;
};

export type ScreenStackNavigatorProps = NativeStackNavigationProp<ScreenStackNavigatorParamList>;

export type ScreenStackBottomNavigatorProps =
    NativeStackNavigationProp<ScreenStackBottomNavigatorParamList>;

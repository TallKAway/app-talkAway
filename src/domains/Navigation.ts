import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenStackNavigatorParamList = {
    SignUp: undefined;
    LogIn: undefined;
    HomePage: undefined;
    Discussion: { username: string | undefined; id: string };
};
export type ScreenStackBottomNavigatorParamList = {
    Contact: undefined;
    Settings: undefined;
};

export type ScreenStackNavigatorProps = NativeStackNavigationProp<ScreenStackNavigatorParamList>;

export type ScreenStackBottomNavigatorProps =
    NativeStackNavigationProp<ScreenStackBottomNavigatorParamList>;

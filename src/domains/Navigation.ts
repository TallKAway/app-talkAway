import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenStackNavigatorParamList = {
    SignUp: undefined;
    LogIn: undefined;
};
export type ScreenStackBottomNavigatorParamList = {
    // navigate(arg0: string): unknown;
    Home: { userName: string };
    Contact: undefined;
};

export type ScreenStackNavigatorProps = NativeStackNavigationProp<ScreenStackNavigatorParamList>;

export type ScreenStackBottomNavigatorProps =
    NativeStackNavigationProp<ScreenStackBottomNavigatorParamList>;

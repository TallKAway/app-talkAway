import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenStackNavigatorParamList = {
    SignUp: undefined;
    LogIn: undefined;
    HomePage: undefined;
};
export type ScreenStackBottomNavigatorParamList = {
    Discussion: { userName: string; id: string };
    Contact: undefined;
};

export type ScreenStackNavigatorProps = NativeStackNavigationProp<ScreenStackNavigatorParamList>;

export type ScreenStackBottomNavigatorProps =
    NativeStackNavigationProp<ScreenStackBottomNavigatorParamList>;

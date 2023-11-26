import {
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    StyleSheet,
    Text,
} from 'react-native';

import { ScreenStackNavigatorProps } from '../../../domains/Navigation';
import { useNavigation } from '@react-navigation/native';

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    cellphone: string;
    friends: Array<number>;
};

export const ContactDetails = () => {
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Text>ContactDetailsPage</Text>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({});

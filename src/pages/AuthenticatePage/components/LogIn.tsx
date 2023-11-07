import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormInput } from '../../../components/Input/FormInput';
import { SubmitButton } from '../../../components/Button/SubmitButton';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';
import { useState } from 'react';
import { login } from '../../../core/api/login/login';
import { UserCredentials } from '../../../core/api/authenticate';

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    async function loginUser({ email, password }: UserCredentials) {
        await login(email, password);
        navigation.navigate('Contact');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Content de te revoir</Text>
                    <FormInput
                        getContent={(data) => setEmail(data)}
                        label={'Email'}
                        isPassword={false}
                    />
                    <FormInput
                        getContent={(data) => setPassword(data)}
                        label={'Mot de passe'}
                        isPassword={true}
                    />
                    <SubmitButton
                        isDisabled={false}
                        title={'Submit'}
                        authFunc={() => loginUser({ email, password })}
                    ></SubmitButton>
                    <Button
                        title="Pas encore chez nous ?"
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 92,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

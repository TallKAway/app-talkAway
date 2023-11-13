import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SubmitButton } from '../../../components/Button/SubmitButton';
import { FormInput } from '../../../components/Input/FormInput';
import { login } from '../../../core/api/login/login';
import { setCredentials } from '../../../core/utils/credentials';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';
import { UserCredentials } from '../../../domains/Credentials';

export const LogIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    async function loginUser({ email, password }: UserCredentials) {
        const tokens = await login(email, password);
        if (tokens.success) {
            setCredentials('accessToken', tokens.accessToken);
            setCredentials('refreshToken', tokens.refreshToken);
            navigation.navigate('HomePage');
        }
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

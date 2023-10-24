import { useState } from 'react';
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

export const SignUp = () => {
    const [email, setEmail] = useState<string>();
    const [pseudo, setPseudo] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmedPassword, setConfirmedPassword] = useState<string>();
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Créer un compte</Text>
                    <FormInput
                        getContent={(data) => setEmail(data)}
                        label={'Email'}
                        isPassword={false}
                    />
                    <FormInput
                        getContent={(data) => setPseudo(data)}
                        label={'Pseudo'}
                        isPassword={false}
                    />
                    <FormInput
                        getContent={(data) => setPassword(data)}
                        label={'Mot de passe'}
                        isPassword={true}
                    />
                    <FormInput
                        getContent={(data) => setConfirmedPassword(data)}
                        label={'Confirmation de mot de passe'}
                        isPassword={true}
                    />
                    <SubmitButton isDisabled={false} title={'Submit'}></SubmitButton>
                    <Button
                        title="Compte déjà créé ?"
                        onPress={() => {
                            navigation.navigate('LogIn');
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
        paddingBottom: 36,
    },
});

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
import * as SecureStore from 'expo-secure-store';
import { SubmitButton } from '../../../components/Button/SubmitButton';
import { FormInput } from '../../../components/Input/FormInput';
import { useUserContext } from '../../../context/CurrentUserProvider';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [cellphone, setCellphone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean | null>(false);
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    const emailRegex = new RegExp('^[\\w.-]+@[\\w-]+(\\.[\\w-]{2,4})+$');
    const usernameRegex = new RegExp('^[a-z]{3}[a-z0-9]{1,}$');
    const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{6,}$');
    const cellphoneRegex = new RegExp('^0\\d{9}$');

    const isPasswordConfirmed = password === confirmedPassword;
    const enableSubmitButton = isPasswordConfirmed && email.length > 0 && username.length > 0;

    const { signUpUser } = useUserContext();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Créer un compte</Text>
                    <FormInput
                        label={'Email'}
                        getContent={(data) => setEmail(data)}
                        isPassword={false}
                        validationRegex={emailRegex}
                        isValidInput={(isValid) => setIsFormValid(isValid)}
                        errorLabel={"Format de l'email invalide"}
                    />
                    <FormInput
                        label={'Pseudo'}
                        getContent={(data) => setUsername(data)}
                        isPassword={false}
                        validationRegex={usernameRegex}
                        isValidInput={(isValid) => setIsFormValid(isValid)}
                        errorLabel={'4 caractères minimum, pas de majuscules'}
                    />

                    <FormInput
                        label={'Téléphone'}
                        getContent={(data) => setCellphone(data)}
                        isPassword={false}
                        validationRegex={cellphoneRegex}
                        isValidInput={(isValid) => setIsFormValid(isValid)}
                        errorLabel={'Numéro de téléphone invalide'}
                    />
                    <FormInput
                        label={'Mot de passe'}
                        getContent={(data) => setPassword(data)}
                        isPassword={true}
                        validationRegex={passwordRegex}
                        isValidInput={(isValid) => setIsFormValid(isValid)}
                        errorLabel={
                            'Minimum 6 caractères avec 1 majuscule, 1 caractère spécial, 1 chiffre'
                        }
                    />
                    <FormInput
                        label={'Confirmation de mot de passe'}
                        getContent={(data) => setConfirmedPassword(data)}
                        isPassword={true}
                        validationRegex={passwordRegex}
                        isValidInput={(isValid) => setIsFormValid(isValid)}
                    />
                    <SubmitButton
                        isDisabled={!enableSubmitButton}
                        title={'Submit'}
                        authFunc={() => signUpUser({ username, email, cellphone, password })}
                    ></SubmitButton>
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

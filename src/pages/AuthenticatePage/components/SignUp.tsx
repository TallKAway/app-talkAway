import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { FormInput } from '../../../components/Input/FormInput';
import { PasswordInput } from '../../../components/Input/PasswordInput';

export const SignUp = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Créez un compte</Text>
                    <FormInput label={'Email'} />
                    <FormInput label={'Pseudo'} />
                    <PasswordInput label={'Mot de passe'} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
        width: 'auto',
        height: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 92,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

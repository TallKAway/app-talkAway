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

import { SubmitButton } from '../../../components/Button/SubmitButton';
export const LogIn = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Content de te revoir</Text>
                    <FormInput label={'Email'} isPassword={false} />
                    <FormInput label={'Mot de passe'} isPassword={true} />$
                    <SubmitButton isDisabled={false} title={'Submit'}></SubmitButton>
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

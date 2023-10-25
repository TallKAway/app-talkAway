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

export const SignUp = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>Créez un compte</Text>
                    <FormInput label={'Email'} isPassword={false} />
                    <FormInput label={'Pseudo'} isPassword={false} />
                    <FormInput label={'Mot de passe'} isPassword={true} />
                    <FormInput label={'Confirmation de mot de passe'} isPassword={true} />
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
    },
});

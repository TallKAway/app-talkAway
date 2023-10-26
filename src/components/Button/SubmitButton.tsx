import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { UserCrendentials, authenticate } from '../../core/api/authenticate';

interface ButtonProps {
    title: string;
    isDisabled: boolean;
}

type SubmitButtonProps = ButtonProps & UserCrendentials;

export const SubmitButton = ({
    title,
    isDisabled,
    username,
    email,
    cellphone,
    password,
}: SubmitButtonProps) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isDisabled ? 'rgba(88,101,242,0.4)' : 'rgba(88,101,242,1)' },
                ]}
                disabled={isDisabled}
                // onPress={() => authenticate('lea12', 'lea12@gmail.com', '0623232323', 'Azerty@123')}
                onPress={() => authenticate(username, email, cellphone, password)}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 18,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

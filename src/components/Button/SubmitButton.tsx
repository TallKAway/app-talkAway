import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthenticationResponse, UserCredentials, authenticate } from '../../core/api/authenticate';

interface ButtonProps {
    title: string;
    isDisabled: boolean;
    authFunc: () => void;
}

type SubmitButtonProps = ButtonProps;

export const SubmitButton = ({ title, isDisabled, authFunc }: SubmitButtonProps) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isDisabled ? 'rgba(88,101,242,0.4)' : 'rgba(88,101,242,1)' },
                ]}
                disabled={isDisabled}
                onPress={authFunc}
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

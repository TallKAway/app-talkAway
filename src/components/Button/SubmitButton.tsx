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

interface ButtonProps {
    title: string;
    isDisabled: boolean;
}

export const SubmitButton = ({ title, isDisabled }: ButtonProps) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isDisabled ? 'rgba(88,101,242,0.4)' : 'rgba(88,101,242,1)' },
                ]}
                disabled={isDisabled}
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

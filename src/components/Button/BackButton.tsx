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
    icon: string;
    isDisabled: boolean;
}

export const BackButton = ({ icon, isDisabled }: ButtonProps) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isDisabled ? 'rgba(88,101,242,0.4)' : 'rgba(88,101,242,1)' },
                ]}
                disabled={isDisabled}
            >
                <Text style={styles.buttonText}>{icon}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'left',
    },
});

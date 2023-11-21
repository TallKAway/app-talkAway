import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SendButtonSVG from '../../common/svg/up-arrow.svg';

interface SendButtonProps {
    isDisabled: boolean;
    submitFunction: () => void;
}

export const SendButton = ({ isDisabled, submitFunction }: SendButtonProps) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: isDisabled ? 'rgb(226, 226, 226)' : 'rgb(0, 118, 246)' },
                ]}
                disabled={isDisabled}
                onPress={submitFunction}
            >
                <SendButtonSVG width={25} height={25} fill={'rgb(255, 255, 255)'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        marginLeft: 4,
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 118, 246)',
        borderRadius: 50,
    },
});

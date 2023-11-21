import { useNavigation } from '@react-navigation/native';
import { PropsWithChildren } from 'react';
import BackButtonSVG from '../../common/svg/left-arrow.svg';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenStackBottomNavigatorProps } from '../../domains/Navigation';

export const HeaderName = ({ children }: PropsWithChildren) => {
    return (
        <View>
            <Text style={styles.headerName}>{children}</Text>
        </View>
    );
};

interface HeaderButtonProps {
    title: string;
    path?: string;
}

export const HeaderButton = ({ title, path }: HeaderButtonProps) => {
    const navigation = useNavigation<ScreenStackBottomNavigatorProps>();
    return (
        <View style={styles.headerButton}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    navigation.navigate('Chat');
                }}
            >
                <View>
                    <BackButtonSVG width={20} height={20} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerName: {
        fontWeight: '500',
        fontSize: 22,
    },

    headerButton: {
        marginLeft: 12,
    },

    backButton: {
        paddingHorizontal: 12,
        paddingVertical: 12,
    },

    textButton: {
        color: 'rgb(0, 118, 246)',
    },
});

import { useNavigation } from '@react-navigation/native';
import { PropsWithChildren } from 'react';

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
                    navigation.navigate('Contact');
                }}
            >
                <View>
                    <Text style={styles.textButton}>Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerName: {
        fontWeight: 'bold',
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

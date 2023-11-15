import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export const useLogout = () => {
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    return () => {
        const logout = async () => {
            try {
                await SecureStore.deleteItemAsync('accessToken');
                await SecureStore.deleteItemAsync('refreshToken');

                navigation.navigate('SignUp');
            } catch (error) {
                console.error('Erreur lors de la déconnexion :', error);
                // Peut-être gérer l'erreur d'une manière spécifique au besoin
            }
        };

        logout(); // Appel de la fonction de déconnexion immédiatement
    };

    // Vous pouvez éventuellement retourner des informations sur la déconnexion si nécessaire
};

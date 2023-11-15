import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ScreenStackNavigatorProps } from '../../../domains/Navigation';

export async function logout() {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        // return false; // Échec de la déconnexion
    }
}

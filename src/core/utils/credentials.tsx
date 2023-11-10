import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { TALK_AWAY_API_BASE_URL } from '@env';
import { CredentialsToken } from '../../domains/Credentials';

export async function setCredentials(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getCredentials() {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (accessToken !== null && refreshToken !== null) {
            const credentials: CredentialsToken = { accessToken, refreshToken };

            checkTokenValidity(credentials);
        }
    } catch (error) {
        console.log(error);
    }

    return null;
}

async function getAccessTokenUsingRefresh(refreshToken: CredentialsToken['refreshToken']) {
    const BASE_URL = TALK_AWAY_API_BASE_URL;

    const response = await fetch(`${BASE_URL}/auth/refreshToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken),
    });

    return response.json();
}

function isTokenExpired(token: string) {
    try {
        const decodedToken = jwtDecode(token);
        console.log('🚀 ~ file: credentials.tsx:41 ~ isTokenExpired ~ decodedToken:', decodedToken);

        const tokenIsExpired = decodedToken.exp < Date.now() / 1000;

        if (tokenIsExpired) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('🚀 ~ file: credentials.tsx:57 ~ isTokenExpired ~ error:', error);
    }
}

async function checkTokenValidity(credentials: CredentialsToken) {
    if (!isTokenExpired(credentials.accessToken)) {
        console.log('returning access');
        return credentials;
    }

    console.log('access expired');
    console.log('checking refresh expiry');

    if (!isTokenExpired(credentials.refreshToken)) {
        console.log('fetching access using refresh');
        const response = await getAccessTokenUsingRefresh(credentials.refreshToken);
        await SecureStore.setItemAsync('accessToken', response.accessToken);
        await SecureStore.setItemAsync('refreshToken', response.refreshToken);
        console.log('UPDATED ONE');
        return response;
    }

    console.log('refresh expired, please login');
    return null;
}

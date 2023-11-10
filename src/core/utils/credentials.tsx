import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { TALK_AWAY_API_BASE_URL } from '@env';
import { CredentialsToken } from '../../domains/Credentials';

export async function setCredentials(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getCredentials(key: keyof CredentialsToken) {
    try {
        const credentials = await SecureStore.getItemAsync(key);
        const refreshedCredentials = credentials && (await checkTokenValidity(credentials));

        if (credentials !== null && refreshedCredentials !== null) {
            return refreshedCredentials;
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
    const decodedToken = jwtDecode(token);
    console.log('🚀 ~ file: credentials.tsx:41 ~ isTokenExpired ~ decodedToken:', decodedToken);

    const tokenIsExpired = decodedToken.exp < Date.now() / 1000;

    if (tokenIsExpired) {
        return true;
    }
    return false;
}

async function checkTokenValidity(keys: CredentialsToken) {
    console.log('Loading keys from storage');
    if (!keys) {
        console.log('access not available, please login');
        return null;
    }

    console.log('checking access');
    if (!isTokenExpired(keys.accessToken)) {
        console.log('returning access');
        return keys;
    }

    console.log('access expired');
    console.log('checking refresh expiry');

    if (!isTokenExpired(keys.refreshToken)) {
        console.log('fetching access using refresh');
        const response = await getAccessTokenUsingRefresh(keys.refreshToken);
        await SecureStore.setItemAsync('keys', JSON.stringify(response));
        console.log('UPDATED ONE');
        return response;
    }

    console.log('refresh expired, please login');
    return null;
}

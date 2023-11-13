import { TALK_AWAY_API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import { isExpired } from 'react-jwt';
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
        throw new Error('Error getting credentials' + ' : ' + error);
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

    return response.json().then((json) => {
        return {
            success: true,
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
        };
    });
}

function isTokenExpired(token: string) {
    try {
        const ismyTokenExpired = isExpired(token);

        if (ismyTokenExpired) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error('Error checking token expiration');
    }
}

async function checkTokenValidity(credentials: CredentialsToken) {
    if (!isTokenExpired(credentials.accessToken)) {
        return credentials;
    }

    if (!isTokenExpired(credentials.refreshToken)) {
        const response = await getAccessTokenUsingRefresh(credentials.refreshToken);
        await SecureStore.setItemAsync('accessToken', response.accessToken);
        await SecureStore.setItemAsync('refreshToken', response.refreshToken);

        return response;
    }

    return null;
}

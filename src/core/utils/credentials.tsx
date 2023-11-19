import { TALK_AWAY_API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import { isExpired } from 'react-jwt';
import { CredentialsToken } from '../../domains/Credentials';

export async function deleteCredentials(key: string) {
    await SecureStore.deleteItemAsync(key);
}

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
            return credentials;
        }
    } catch (error) {
        throw new Error('Error getting credentials' + ' : ' + error);
    }
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

export async function checkTokenValidity(credentials: CredentialsToken) {
    if (!isTokenExpired(credentials.accessToken)) {
        return credentials;
    }

    if (!isTokenExpired(credentials.refreshToken)) {
        const response = await getAccessTokenUsingRefresh(credentials.refreshToken);
        await SecureStore.setItemAsync('accessToken', response.accessToken);
        await SecureStore.setItemAsync('refreshToken', response.refreshToken);

        return response;
    }
    console.log('access not available please login');
    return null;
}

export async function getUser(userId: string) {

    const BASE_URL = TALK_AWAY_API_BASE_URL;

    const accessToken = await SecureStore.getItemAsync('accessToken');

    const response = await fetch(`${BASE_URL}/user/user/current/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
    });

    return response.json().then((json) => {
        return {
            success: true,
            message: json.message,
            data: json.data,
        };
    });
}

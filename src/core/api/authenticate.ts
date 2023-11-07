import { TALK_AWAY_API_AUTH_URL } from '@env';
export interface UserCredentials {
    email: string;
    password: string;
    username?: string;
    cellphone?: string;
}

interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

interface SuccessfulResponse {
    success: true;
    accessToken: string;
    refreshToken: string;
}

interface ErrorResponse {
    success: false;
}

export type AuthenticationResponse = BadCredentialsResponse | SuccessfulResponse | ErrorResponse;

export const authenticate = (
    username: UserCredentials['username'],
    email: UserCredentials['email'],
    cellphone: UserCredentials['cellphone'],
    password: UserCredentials['password']
): Promise<AuthenticationResponse> => {
    const BASE_URL = TALK_AWAY_API_AUTH_URL;

    return fetch(`${BASE_URL}:3002/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, cellphone, password }),
    })
        .then((response: Response): Promise<AuthenticationResponse> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw new Error(
                    `Upstream auth HTTP error: ${response.status} ${response.statusText}`
                );
            }

            return response.json().then((json) => {
                return {
                    success: true,
                    accessToken: json.accessToken, //  access expiration 72h, refresh token expire 24h
                    refreshToken: json.refreshToken,
                };
                // stocker le token
            });
        })
        .catch((e) => {
            console.log('🚀 ~ file: authenticate.ts:56 ~ e:', e);
            return {
                success: false,
            };
        });
};

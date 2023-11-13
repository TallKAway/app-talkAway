import { TALK_AWAY_API_BASE_URL } from '@env';
import { AuthenticationResponse, UserCredentials } from '../../../domains/Credentials';

export const login = async (
    email: UserCredentials['email'],
    password: UserCredentials['password']
): Promise<AuthenticationResponse> => {
    const BASE_URL = TALK_AWAY_API_BASE_URL;

    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response: Response): Promise<AuthenticationResponse> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw {
                    response: response,
                    error: new Error(
                        `Error: ${response.url} ${response.status} ${response.statusText}`
                    ),
                };
            }

            return response.json().then((json) => {
                return {
                    success: true,
                    accessToken: json.accessToken,
                    refreshToken: json.refreshToken,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error.message || 'An error occurred during login.',
            };
        });
};

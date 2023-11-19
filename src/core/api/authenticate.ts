import { TALK_AWAY_API_BASE_URL } from '@env';
import { AuthenticationResponse, UserCredentials } from '../../domains/Credentials';

export const authenticate = (
    username: UserCredentials['username'],
    email: UserCredentials['email'],
    cellphone: UserCredentials['cellphone'],
    password: UserCredentials['password']
): Promise<AuthenticationResponse> => {
    const BASE_URL = TALK_AWAY_API_BASE_URL;
    
    return fetch(`${BASE_URL}/auth/register`, {
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
                    accessToken: json.accessToken,
                    refreshToken: json.refreshToken,
                    user: json.user,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error || 'An error occurred during signup.',
            };
        });
};

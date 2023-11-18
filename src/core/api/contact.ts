import { TALK_AWAY_API_BASE_URL } from '@env';
import { ContactResponse } from '../../domains/Contact';

export const contact = (accessToken: string): Promise<ContactResponse> => {
    const BASE_URL = TALK_AWAY_API_BASE_URL;

    return fetch(`${BASE_URL}/user/user`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
    })
        .then((response: Response): Promise<ContactResponse> => {
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
                    data: json.data,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error.message,
            };
        });
};

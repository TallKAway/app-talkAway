import { TALK_AWAY_API_AUTH_URL } from '@env';

import { getStoredDataValue } from '../../utils/secureStoreData';

export const login = (email: string, password: string) => {
    const BASE_URL = TALK_AWAY_API_AUTH_URL;
    // const accessToken = getStoredDataValue('accessToken');

    return fetch(`${BASE_URL}:3002/auth/login`, {
        method: 'POST',
        headers: {
            // Authorization: 'Bearer ' + accessToken,
            Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw {
                    response: response,
                    error: new Error(
                        `Error: ${response.url} ${response.status} ${response.statusText}`
                    ),
                };
            }

            return response.json().then((json) => {
                console.log('json login', json);
                return json;
            });
        })
        .catch((e) => {
            return {
                success: false,
            };
        });
};

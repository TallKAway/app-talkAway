import { useContext, createContext, useState, PropsWithChildren, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCredentials } from '../core/utils/credentials';

interface UserContext {
    userAccessToken: string | null;
    userRefreshToken: string | null;
}

const initialUserContext = {
    userAccessToken: null,
    userRefreshToken: null,
};

export const UserContext = createContext<UserContext>(initialUserContext);

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const [userCredentials, setUserCredentials] = useState<UserContext>(initialUserContext);

    useEffect(() => {
        const fetchCredentials = async () => {
            const credentials = await getCredentials();

            if (credentials) {
                const { accessToken, refreshToken } = credentials;
                setUserCredentials({
                    userAccessToken: accessToken,
                    userRefreshToken: refreshToken,
                });
            }
        };

        fetchCredentials();
        console.log(userCredentials);
    }, []);

    return <UserContext.Provider value={userCredentials}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

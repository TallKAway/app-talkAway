import { useContext, createContext, useState, PropsWithChildren, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCredentials } from '../core/utils/credentials';

interface UserContext {
    accessToken: Promise<string> | null;
    refreshToken: Promise<string> | null;
}

const initialUserContext = {
    accessToken: null,
    refreshToken: null,
};

export const UserContext = createContext<UserContext>(initialUserContext);

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const [userCredentials, setUserCredentials] = useState<UserContext>(initialUserContext);

    useEffect(() => {
        const fetchData = async () => {
            const credentials = await getCredentials();
            if (credentials) {
                const { accessToken, refreshToken } = credentials;
                setUserCredentials({ accessToken: accessToken, refreshToken: refreshToken });
            }
        };
        fetchData();
    }, []);

    return <UserContext.Provider value={userCredentials}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

import { useNavigation } from '@react-navigation/native';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { login } from '../core/api/login/login';
import { getCredentials, setCredentials } from '../core/utils/credentials';
import { CredentialsToken, UserCredentials } from '../domains/Credentials';
import { ScreenStackNavigatorProps } from '../domains/Navigation';
import { authenticate } from '../core/api/authenticate';

interface AuthContextProps {
    isAuthenticated: boolean;
    authTokens: CredentialsToken | undefined;
    loginUser: ({ email, password }: UserCredentials) => Promise<void>;
    signUpUser: ({ username, email, cellphone, password }: UserCredentials) => Promise<void>;
}

export const UserContext = createContext<AuthContextProps | undefined>(undefined);

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const [authTokens, setAuthTokens] = useState<CredentialsToken>();

    const navigation = useNavigation<ScreenStackNavigatorProps>();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const credentials = await getCredentials();
                setAuthTokens(credentials);
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };

        loadUser();
    }, []);

    async function loginUser({ email, password }: UserCredentials) {
        const tokens = await login(email, password);
        if (tokens.success) {
            setCredentials('accessToken', tokens.accessToken);
            setCredentials('refreshToken', tokens.refreshToken);
            navigation.navigate('HomePage');
        }
    }

    async function signUpUser({ username, email, cellphone, password }: UserCredentials) {
        const tokens = await authenticate(username, email, cellphone, password);
        if (tokens.success) {
            setCredentials('accessToken', tokens.accessToken);
            setCredentials('refreshToken', tokens.refreshToken);
            navigation.navigate('HomePage');
        }
    }

    const contextValue: AuthContextProps = {
        isAuthenticated: !!authTokens,
        authTokens,
        loginUser,
        signUpUser,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

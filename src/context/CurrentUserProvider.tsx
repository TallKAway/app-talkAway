import { useNavigation } from '@react-navigation/native';
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { login } from '../core/api/login/login';
import { deleteCredentials, getCredentials, setCredentials, getUser } from '../core/utils/credentials';
import { CredentialsToken, UserCredentials, User } from '../domains/Credentials';
import { ScreenStackNavigatorProps } from '../domains/Navigation';
import { authenticate } from '../core/api/authenticate';

interface AuthContextProps {
    isAuthenticated: boolean;
    authTokens: CredentialsToken | undefined;
    loginUser: ({ email, password }: UserCredentials) => Promise<void>;
    signUpUser: ({ username, email, cellphone, password }: UserCredentials) => Promise<void>;
    logoutUser: () => Promise<void>;
    user: User | undefined;
    updateUser: () => Promise<void>;
}

export const UserContext = createContext<AuthContextProps | undefined>(undefined);

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const [authTokens, setAuthTokens] = useState<CredentialsToken>();
   
    const [user, setUser] = useState<User>();

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

    async function logoutUser() {
        try {
            deleteCredentials('accessToken');
            deleteCredentials('refreshToken');
            setUser(undefined);
            
            navigation.navigate('SignUp');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async function loginUser({ email, password }: UserCredentials) {
        const tokens = await login(email, password);
                if (tokens.success) {
            setCredentials('accessToken', tokens.accessToken);
            setCredentials('refreshToken', tokens.refreshToken);
            setUser(tokens.user);
            navigation.navigate('Chat');
        }
    }

    async function signUpUser({ username, email, cellphone, password }: UserCredentials) {
        const tokens = await authenticate(username, email, cellphone, password);
                if (tokens.success) {
            setCredentials('accessToken', tokens.accessToken);
            setCredentials('refreshToken', tokens.refreshToken);
            setUser(tokens.user);
            navigation.navigate('Chat');
        }
    }

    async function updateUser() {
        const userData = await getUser(user?.id ?? '');
        if (userData.success) {
            setUser(userData.data);
        }
    }

    const contextValue: AuthContextProps = {
        isAuthenticated: !!authTokens,
        authTokens,
        loginUser,
        signUpUser,
        logoutUser,
        user,
        updateUser
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

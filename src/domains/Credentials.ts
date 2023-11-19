export interface UserCredentials {
    email: string;
    password: string;
    username?: string;
    cellphone?: string;
}

export interface CredentialsToken {
    accessToken: string;
    refreshToken: string;
}

export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface User {
    id: string;
    username: string;
    email: string;
    cellphone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    friendIds: Array<string>;
    inverseFriendIds: Array<string>;
    friends: Array<User>;
    password: string;
}

export interface SuccessfulResponse extends CredentialsToken {
    success: true;
    user: User;
}

export interface ErrorResponse {
    success: false;
}

export type AuthenticationResponse = BadCredentialsResponse | SuccessfulResponse | ErrorResponse;

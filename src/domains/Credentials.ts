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

export interface SuccessfulResponse extends CredentialsToken {
    success: true;
}

export interface ErrorResponse {
    success: false;
}

export type AuthenticationResponse = BadCredentialsResponse | SuccessfulResponse | ErrorResponse;

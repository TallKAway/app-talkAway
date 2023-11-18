import { BadCredentialsResponse, ErrorResponse } from './Credentials';

export interface User {
    cellphone: string;
    createdAt: string;
    deletedAt: null;
    email: string;
    friendIds: Array<string>;
    friends: Array<User>;
    id: string;
    inverseFriendIds: Array<string>;
    updatedAt: string;
    username: string;
}

export interface Contacts {
    data: Array<User>;
}

export interface UserFetchSuccessfull extends Contacts {
    success: true;
}

export type ContactResponse = BadCredentialsResponse | UserFetchSuccessfull | ErrorResponse;

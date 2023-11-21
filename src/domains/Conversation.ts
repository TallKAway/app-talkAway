import { BadCredentialsResponse, ErrorResponse } from './Credentials';

export interface DirectConversation {
    success: true;
    id: string;
    user1Id: string;
    user2Id: string;
    createdAt: string;
}

export interface ConversationFetchSuccessfull extends DirectConversation {
    success: true;
}

export type ConversationResponse = BadCredentialsResponse | ConversationFetchSuccessfull | ErrorResponse;

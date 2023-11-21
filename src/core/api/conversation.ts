import { useEffect, useState } from 'react';
// import { TALK_AWAY_API_BASE_URL, IPCONFIG_API_BASE_URL } from '@env';
import { io, Socket } from 'socket.io-client';
import { ConversationResponse, DirectConversation } from '../../domains/Conversation';
import { TALK_AWAY_API_BASE_URL } from '../../utils/Constant';

export const getConversationMessages = async (accessToken: string, friendId: string) => {
    const BASE_URL = TALK_AWAY_API_BASE_URL;
    return await fetch(`${BASE_URL}/chat/conversation/${friendId}/messages`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
    })
        .then((response: Response): Promise<any> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw new Error(
                    `Upstream auth HTTP error: ${response.status} ${response.statusText}`
                );
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
                error: e.error || 'An error occured during fetching conversation.',
            };
        });
};

export const getConversationId = async (accessToken: string, friendId: string) => {
    const BASE_URL = TALK_AWAY_API_BASE_URL;
    return await fetch(`${BASE_URL}/chat/conversation/${friendId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
    })
        .then((response: Response): Promise<ConversationResponse> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw new Error(
                    `Upstream auth HTTP error: ${response.status} ${response.statusText}`
                );
            }

            return response.json().then((json) => {
                return {
                    success: true,
                    id: json.data.id,
                    user1Id: json.data.user1Id,
                    user2Id: json.data.user2Id,
                    createdAt: json.data.createdAt,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error || 'An error occured during fetching conversation.',
            };
        });
};

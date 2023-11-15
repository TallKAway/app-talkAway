import { useEffect, useState } from 'react';
import { TALK_AWAY_API_BASE_URL } from '@env';
import { io, Socket } from 'socket.io-client';
const socket: Socket = io('https://api-tallkaway.koyeb.app/chat');

export const getConversation = (token: string | undefined) => {
    const [conversation, setConversation] = useState<any>([]); //pour l'instant le type est en any mais c'est à changer

    const BASE_URL = TALK_AWAY_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/chat/conversation/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Baerer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setConversation(json.data);
                } else {
                    console.error('Error fetching conversation data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching conversation data:', error);
            }
        };

        fetchData();
    }, []);

    return conversation;
};

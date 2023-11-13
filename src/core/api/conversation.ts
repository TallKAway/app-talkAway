import { useEffect, useState } from 'react';
import { TALK_AWAY_API_BASE_URL } from '@env';
import { io, Socket } from 'socket.io-client';
const socket: Socket = io('https://api-tallkaway.koyeb.app/chat');

export const getConversation = (token: string) => {
    const [conversation, setConversation] = useState<any[]>([]); //pour l'instant le type est en any mais c'est à changer
    const BASE_URL = TALK_AWAY_API_BASE_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/chat/conversation/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setConversation(json.data); // Mettre à jour l'état avec les données récupérées
                } else {
                    console.error('Error fetching conversation data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching conversation data:', error);
            }
        };

        fetchData();
    }, [token, BASE_URL]);

    return conversation; // Retourner les données pour utilisation dans le composant
};

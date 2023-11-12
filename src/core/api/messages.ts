import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
const socket: Socket = io('https://api-tallkaway.koyeb.app/chat');

export const getMessages = (token: string, friendId: string) => {
    const [currentRoom, setCurrentRoom] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const handleGetMessages = async () => {
            await fetch(`https://api-tallkaway.koyeb.app/chat/conversation/${friendId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Baerer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status && res.status === 'NO_MESSAGE') {
                        socket.emit('join_conversation', {
                            token: token,
                            receivedId: friendId,
                            conversationId: res.data.id,
                        });
                        setCurrentRoom(res.data.id);

                        fetch(
                            `https://api-tallkaway.koyeb.app/chat/conversation/${friendId}/messages`,
                            {
                                method: 'GET',
                                headers: {
                                    Authorization: `Baerer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                setMessages(data.data);
                            })
                            .catch((error) => {
                                console.log('Error while fetching messages: ', error);
                            });
                    }
                });
        };
        handleGetMessages();
    }, []);
};

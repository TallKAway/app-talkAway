import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface DataProps {
    data: {
        id: string;
        content: string;
        createdAt: string;
        senderId: string;
        direcConversationId: string;
        isMine: boolean;
    };
}

export const MessageArea = ({ data }: DataProps) => {
    const handleTimeStampToDate = (date: string) => {
        const messageDate = new Date(date);
        const messageDateFormatted = messageDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
        return messageDateFormatted;
    };

    return (
        <View style={[styles.container, data.isMine ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
            <View style={[styles.messageContainer, data.isMine ? styles.containerRadiusIsMine : styles.containerRadiusIsNotMine]}>
                <Text style={data.isMine ? { color: 'white' } : { color: 'black' }}>
                    {data.content}
                </Text>
            </View>

            <Text style={[styles.timestamp]}>
                {handleTimeStampToDate(data.createdAt)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
        display: 'flex',
    },
    messageContainer: {
        maxWidth: '70%',
        padding: 14,
    },
    timestamp: {
        fontSize: 10,
    },
    containerRadiusIsMine: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'rgb(87, 101, 242)'
    },
    containerRadiusIsNotMine: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgb(226, 226, 226)'
    },

});

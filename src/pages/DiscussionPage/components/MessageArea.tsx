import { View, Text, StyleSheet } from 'react-native';

interface DataProps {
    data: {
        id: number;
        sender: string;
        content: string;
        timestamp: number;
    };
}

export const MessageArea = ({ data }: DataProps) => {
    const user = 'me';

    const handleTimeStampToDate = (date: number) => {
        const messageDate = new Date(date);
        const messageDateFormatted = messageDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
        return messageDateFormatted;
    };

    return (
        <View style={data.sender === user ? styles.container : styles.notMeContainer}>
            {/* {data.sender !== user ? (
                <View>
                    <Text style={styles.notMeSender}>{data.sender}</Text>
                </View>
            ) : null} */}
            <View style={data.sender === user ? styles.box : styles.notMeBox}>
                <Text style={data.sender === user ? styles.message : styles.notMeMessage}>
                    {data.content}
                </Text>
            </View>

            <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>{handleTimeStampToDate(data.timestamp)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    notMeContainer: {
        alignItems: 'flex-start',
    },
    box: {
        maxWidth: '70%',
        padding: 14,
        margin: 6,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'rgb(87, 101, 242)',
    },
    notMeBox: {
        maxWidth: '70%',
        padding: 14,
        margin: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgb(226, 226, 226)',
    },
    sender: {
        color: 'white',
    },
    notMeSender: {
        paddingTop: 14,
        paddingLeft: 6,
        color: 'rgb(200, 200, 200)',
    },
    message: {
        color: 'white',
    },
    notMeMessage: {
        color: 'black',
    },
    timestampContainer: {
        paddingHorizontal: 14,
    },

    timestamp: {
        alignSelf: 'flex-end',
        fontSize: 10,
    },
});

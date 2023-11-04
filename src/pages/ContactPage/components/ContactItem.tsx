import { Text, View, StyleSheet } from 'react-native';

interface SearchInputProps {
    username: string;
}

export const ContactItem = ({ username }: SearchInputProps) => {
    return (
        <View style={styles.contactItem}>
            <View style={styles.profilePic}>
                <View style={styles.state}></View>
            </View>
            <View>
                <Text>{username}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contactItem: {
        flexDirection: 'row',
        height: 65,
        padding: 10,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        borderRadius: 30,
        borderColor: 'rgb(206, 204, 204)',
        width: 50,
        height: 50,
        borderWidth: 1,
        marginRight: 10,
    },
    bio: {
        color: 'grey',
    },
    state: {
        height: 10,
        width: 10,
        borderRadius: 30,
        backgroundColor: 'green',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 2,
        right: 2,
    },
});

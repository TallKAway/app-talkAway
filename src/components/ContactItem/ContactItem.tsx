import { Text, View, StyleSheet } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ScreenStackNavigatorProps } from '../../domains/Navigation';

interface SearchInputProps {
    username: string;
    id: number;
}

export const ContactItem = ({ username, id }: SearchInputProps) => {
    const navigation = useNavigation<ScreenStackNavigatorProps>();

    return (
        <View style={styles.contactItem}>
            <View style={styles.contactItemButtons}>
                <View style={styles.profilePic}>
                    <View style={styles.state}></View>
                </View>
                <Text>{username}</Text>
            </View>
            <View style={styles.contactItemActionsButtons}>
                <IconFeather
                    name="user"
                    size={25}
                    color="black"
                    onPress={() => {
                        navigation.navigate('ContactDetail', {});
                    }}
                />
                <IconFeather
                    name="message-circle"
                    size={25}
                    color="black"
                    onPress={() => {
                        navigation.navigate('Discussion', {
                            username: username,
                            id: id,
                        });
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contactItem: {
        flexDirection: 'row',
        height: 65,
        paddingTop: 10,
        borderColor: 'rgb(206, 204, 204)',
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    contactItemButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactItemActionsButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
});

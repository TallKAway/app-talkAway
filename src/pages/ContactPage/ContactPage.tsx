import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCredentials } from '../../core/utils/credentials';

export const ContactPage = () => {
    return (
        <SafeAreaView>
            <Text>Hello World</Text>
            <Button
                title="Get token"
                onPress={() => {
                    getCredentials('accessToken');
                }}
            />
        </SafeAreaView>
    );
};

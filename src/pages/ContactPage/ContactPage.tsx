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

// accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRlMDhmNDBhMGRkYmZlZjU5ZjM5NjQiLCJ1c3JEYXRhIjoiNmQyZThhYmE4YTMxMmFhYzYwMzQ4ZTA2ZDdhNzEwNDU6YjI2YTk5ODY4YTM3MjkzZTI1YjI0ODBmYzIwZGQyMjE2MjRlZDBlZjUzMmNiZDljMWYxZGYyNTE4MzAzMDY1OCIsImlhdCI6MTY5OTYxMjkxNiwiZXhwIjoxNjk5Njk5MzE2fQ.UOHJnRyp6yb7hCpfsLljnuWipKByv_MlMHmuJhw_NmQ"
// refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRlMDhmNDBhMGRkYmZlZjU5ZjM5NjQiLCJ1c3JEYXRhIjoiZjRlODg3YWVjYTNkN2IxNGFiOGUzNmEzMjJiY2FiMmU6Yjc3NThkOTliMTEyYTExY2I3YTdlNmQwNTMzMGRhNWYyMWU1NDU2ODM2N2Q1YTYzOWVkYjAxYzViZWM5OTlkYyIsImlhdCI6MTY5OTYxMjkxNiwiZXhwIjoxNzAwMjE3NzE2fQ.2uQg3phab9Pxcw9F7h5tvjAKTrKv8SfGg1V4c2GE_94"

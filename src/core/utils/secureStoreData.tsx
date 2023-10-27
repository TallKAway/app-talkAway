import * as SecureStore from 'expo-secure-store';

export async function storeStringData(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
    console.log('🚀 ~ file: secureStoreData.tsx:5 ~ storeStringData ~ key:', key);
    console.log('🚀 ~ file: secureStoreData.tsx:5 ~ storeStringData ~ value:', value);
}

export async function getStoredDataValue(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        console.log('🚀 ~ file: secureStoreData.tsx:10 ~ getValueFor ~ result:', result);
    } else {
        console.log('No values stored under that key');
    }
}

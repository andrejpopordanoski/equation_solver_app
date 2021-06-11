/* eslint-disable @typescript-eslint/naming-convention */
import AsyncStorage from '@react-native-community/async-storage';

export const tokenHelper = {
    async getToken() {
        const persist = await AsyncStorage.getItem('persist:testkit');

        if (persist) {
            try {
                const { accessToken } = JSON.parse(JSON.parse(persist).auth).data.data;
                return accessToken;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    },
    async getRefreshToken() {
        const persist = await AsyncStorage.getItem('persist:testkit');
        if (persist) {
            try {
                const { refreshToken } = JSON.parse(JSON.parse(persist).auth).data.data;
                return refreshToken;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    },
    async IsAccessTokenExpired() {
        const persist = await AsyncStorage.getItem('persist:testkit');
        if (persist) {
            try {
                const { data } = JSON.parse(JSON.parse(persist).auth).data;
                const { expires_in } = data;
                const { token_creation } = data;
                const date_now = Date.now();
                return (date_now - token_creation) / 1000 + 500 > expires_in;
            } catch (message) {
                console.warn('Catch exception parsing persist:testkit', message);
                return false;
            }
        } else {
            return false;
        }
    },

    parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    },
};

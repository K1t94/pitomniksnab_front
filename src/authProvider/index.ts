import axios from 'axios';
import get from 'lodash/get';
import qs from 'qs';
import { AuthProvider } from 'ra-core';
import moment from 'moment-timezone';
import { OAUTH_CLIENT_TOKEN, OAUTH_TOKEN_ENDPOINT } from '../../config';

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const requestConfig = {
            method: 'POST',
            url: OAUTH_TOKEN_ENDPOINT,
            responseType: 'json',
            headers: {
                Authorization: `Basic ${OAUTH_CLIENT_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                grant_type: 'password',
                username: String(username).trim(),
                password,
            }),
        };

        const defaultErrorMessage = 'Что-то пошло не так, попробуй еще позже.';

        try {
            // @ts-ignore
            const request = await axios(requestConfig);
            const tokenInfo = get(request, 'data');
            const expires = String(moment.utc(tokenInfo.accessTokenExpiresAt).toDate().getTime());

            localStorage.setItem('accessToken', tokenInfo.accessToken);
            localStorage.setItem('accessTokenExpiresAt', expires);
        } catch (error) {
            let errorMessage = defaultErrorMessage;
            let isInvalidGrant = false;
            if (error && error.response) {
                if (error.response.status === 400) {
                    isInvalidGrant = get(error.response, 'data.name') === 'invalid_grant';
                }
            }

            if (isInvalidGrant) {
                errorMessage = 'Не правильный логин или пароль';
            }

            throw new Error(errorMessage);
        }

        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiresAt');

        return Promise.resolve();
    },
    checkError: () => {
        console.log('checkError');

        return Promise.resolve();
    },
    checkAuth: () => {
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');

        const date = new Date();
        const now = date.getTime();

        if (!accessToken || !accessTokenExpiresAt) {
            return Promise.reject();
        }

        const exp = parseInt(accessTokenExpiresAt, 10);

        if (exp < now) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    getPermissions: () => {
        console.log('getPermissions');
        return Promise.reject('Unknown method');
    },
};

export default authProvider;

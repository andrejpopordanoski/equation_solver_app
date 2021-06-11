import { encode as btoa } from 'base-64';
import requestAgent from 'components/src/services/requestAgent';
import { LOGIN_API } from 'components/src/services/api';
import { tokenHelper } from 'components/src/services/tokenHelpers';

import { handleSuccess, handleError } from './utils';

export const loginApiRequest = async (email: string | Blob, password: string | Blob): any => {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);
    try {
        const responseData = await requestAgent.post(
            `${LOGIN_API}?grant_type=password`,
            data,
            {
                Authorization: `Basic ${btoa('ClientId:secret')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            undefined
        );
        return handleSuccess(responseData);
    } catch (e) {
        return handleError(e);
    }
};

export const refreshTokenRequest = async (): any => {
    const data = new FormData();

    tokenHelper
        .getRefreshToken()
        .then(async refreshToken => {
            data.append('refresh_token', refreshToken);

            const responseData = await requestAgent.post(
                `${LOGIN_API}?grant_type=refresh_token`,
                data,
                {
                    Authorization: `Basic ${btoa('ClientId:secret')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                undefined
            );

            return handleSuccess(responseData);
        })
        .catch(e => {
            return handleError(e);
        });
};

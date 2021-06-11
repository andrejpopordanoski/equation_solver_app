import requestAgent from 'components/src/services/requestAgent';
import { tokenHelper } from 'components/src/services/tokenHelpers';
import { debugLogger } from 'components/src/services/logger';
import { handleSuccess, handleError } from './utils';

export const GetApiRequest = async (API: any): Promise<any> => {
    const token = await tokenHelper.getToken();
    let error = null;
    const responseData = await requestAgent
        .get(API, {
            Authorization: `Bearer ${token}`,
        })
        .catch(err => {
            debugLogger.error(`${err} CAUGHT ERROR`, API);
            error = err;
        });
    if (error) {
        return handleError(error);
    }
    if (responseData) {
        if (responseData.status === 200) {
            return handleSuccess(responseData);
        }
    }
};

export const PostApiRequest = async (API: any, data: any | FormData | undefined, headers: any): Promise<any> => {
    const token = await tokenHelper.getToken();
    let error = null;
    const responseData = await requestAgent
        .post(
            API,
            data,
            headers
                ? {
                      ...headers,
                      Authorization: `Bearer ${token}`,
                  }
                : {
                      Authorization: `Bearer ${token}`,
                  },
            undefined
        )
        .catch(err => {
            debugLogger.error(`${err} CAUGHT ERROR`);
            error = err;
        });
    if (error) {
        return handleError(error);
    }
    if (responseData.status === 200) {
        return handleSuccess(responseData);
    }
};

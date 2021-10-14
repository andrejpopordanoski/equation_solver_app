import axios, { Method } from 'axios';
// import Config from 'react-native-config';
import { env } from 'components/src/services/env';
import { debugLogger } from './logger';

console.log(env);

// export const API_ENDPOINT = env.REACT_APP_PATH;
export const API_ENDPOINT = 'http://192.168.1.104:8000';

const requestsLog: { date: string; urlRequested: any; requestType: any; requestData: any; wasSuccessful: boolean; error?: any }[] = [];

const perform = (method: Method, url: string, data: any | undefined, headers: { [x: string]: any } | undefined) => {
    debugLogger.info(`===== ${method} REQUEST FROM ======= ${url}`);

    const performFunc = (): Promise<unknown> => {
        if (method === 'GET') {
            return axios({
                method,
                url,
                headers: headers
                    ? {
                          ...headers,
                          'Content-Type': headers['Content-Type'] || 'application/json',
                      }
                    : {},
            });
        }
        return axios({
            method,
            url,
            data,
            headers: headers
                ? {
                      ...headers,
                      'Content-Type': headers['Content-Type'] || 'application/json',
                  }
                : {},
        });
    };

    return performFunc()
        .then((res: any) => {
            requestsLog.push({
                date: new Date().toUTCString(),
                urlRequested: url,
                requestType: method,
                requestData: data,
                wasSuccessful: true,
            });
            return res;
        })
        .catch((e: any) => {
            requestsLog.push({
                date: new Date().toUTCString(),
                urlRequested: url,
                requestType: method,
                requestData: data,
                wasSuccessful: false,
                error: e,
            });
            throw e;
        });
};

export default {
    get: (path: any, headers: any) => {
        return perform('GET', API_ENDPOINT + path, {}, headers || {});
    },
    post: (path: any, data: any | undefined, headers: any, auth: any) => perform('POST', API_ENDPOINT + path, data, headers || {}),
    getLog: () => requestsLog,
    // Not auth implemented
    useUrl: (url: any) => {
        return {
            get: () => perform('GET', url, undefined, undefined),
            post: (data: Record<string, unknown> | undefined, additional: { headers: { [x: string]: any } | undefined }) =>
                perform('POST', url, data, additional.headers),
        };
    },
};

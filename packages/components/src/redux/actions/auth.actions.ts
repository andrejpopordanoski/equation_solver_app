// import { ActionStatus } from 'src/';
import AsyncStorage from '@react-native-community/async-storage';
import { persistor } from 'components/src/redux/config/store';
import { loginApiRequest, refreshTokenRequest } from 'components/src/services/apiRequests/login';
import { debugLogger } from 'components/src/services/logger';
import { LOGIN, LOGOUT, STORAGE_PERSIST } from '../constants/auth.constants';
import { ActionStatus } from '../core/ActionStatus';
import { buildActionType } from './buildActionType';

const passwordLoginAction = (email: string | Blob, password: string | Blob) => async (
    dispatch: (arg0: {
        type: string;
        payload?:
            | { success: boolean; data: any }
            | { success: boolean; errors: any }
            | { success: boolean; data: any }
            | { success: boolean; errors: any };
    }) => void
) => {
    dispatch({ type: buildActionType(LOGIN, ActionStatus.START) });
    const response = await loginApiRequest(email, password);

    if (response.success) {
        response.data.token_creatiron = Date.now();
        dispatch({
            type: buildActionType(LOGIN, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
        dispatch({ type: buildActionType(STORAGE_PERSIST, ActionStatus.DONE) });
        await persistor.flush();
    } else {
        dispatch({
            type: buildActionType(LOGIN, ActionStatus.DONE),
            payload: {
                ...response,
            },
        });
    }
};

const refreshProviderToken = async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    const tokenPromise = refreshTokenRequest().then((response: { data: { token_creation: number } }) => {
        response.data.token_creation = Date.now();
        dispatch({
            type: buildActionType(LOGIN, ActionStatus.DONE),
            payload: { ...response, fetchingToken: false },
        });
        persistor.flush();
        dispatch({ type: buildActionType(STORAGE_PERSIST, ActionStatus.DONE) });
        return Promise.resolve();
    });

    dispatch({
        type: buildActionType(LOGIN, ActionStatus.REFRESH),
        payload: {
            fetchingToken: tokenPromise,
        },
    });
    return tokenPromise;
};

const logoutAction = () => async (dispatch: (arg0: { type: string }) => void) => {
    try {
        dispatch({ type: buildActionType(LOGOUT, ActionStatus.DONE) });
        await AsyncStorage.removeItem('persist:testkit');
        return true;
    } catch (exception) {
        debugLogger.warn('Exception with logout action ', exception);
        return false;
    }
};

export { passwordLoginAction, refreshProviderToken, logoutAction };

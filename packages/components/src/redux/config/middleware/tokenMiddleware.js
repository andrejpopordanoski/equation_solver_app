import { tokenHelper } from 'components/src/services/tokenHelpers';
import { refreshProviderToken } from 'components/src/redux/actions/auth.actions';
import { LOGIN, STORAGE_PERSIST } from 'components/src/redux/constants/auth.constants';
import { debugLogger } from 'components/src/services/logger';

function onlyOnce() {
    let executed = false;
    return function (buffer, next) {
        if (executed === true) {
            return;
        }
        executed = true;
        buffer.forEach(action => {
            return next(action);
        });
    };
}

const func = onlyOnce();
const buffer = [];

export default function tokenMiddleware({ dispatch, getState }) {
    return next => async action => {
        if (
            (action.type && action.type.includes('persist')) ||
            (action.type && action.type.includes(LOGIN.entity)) ||
            (action.type && action.type.includes(STORAGE_PERSIST.entity))
        ) {
            return next(action);
        }

        const store = getState();

        if (tokenHelper.isAccessTokenExpired && !store.auth.data.fetchingToken) {
            debugLogger.warn('ACCESS TOKEN EXPIRED - Refreshing...');
            refreshProviderToken(dispatch).then(() => {
                debugLogger.info('TOKEN REFRESHED');
                tokenHelper.sendTokenToUnity();
                return next(action);
            });
        } else if (tokenHelper.isAccessTokenExpired && store.auth.data.fetchingToken) {
            buffer.push(action);

            store.auth.data.fetchingToken.then(() => {
                func(buffer, next);
            });
        } else {
            return next(action);
        }
    };
}

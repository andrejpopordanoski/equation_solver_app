import { ActionStatus } from 'components/src/redux/core/ActionStatus';
import { buildActionType } from 'components/src/redux/actions/buildActionType';
import { NOT_AUTHORIZED, LOGIN, STORAGE_PERSIST } from 'components/src/redux/constants/auth.constants';
import { StateStatus } from 'components/src/redux/core/StateStatus';

const notInitState = {
    data: {},
    status: StateStatus.NOT_INITIALIZED,
    error: null,
    persisted: false,
};

const auth = (state = notInitState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case buildActionType(LOGIN, ActionStatus.START):
            return {
                status: StateStatus.LOADING,
                data: {},
                error: null,
                persisted: false,
            };

        // case buildActionType(LOGIN, ActionStatus.REFRESH):
        //     return {
        //         ...state,
        //         data: { ...action.payload },
        //         persisted: false,
        //         status: StateStatus.REFRESHING,
        //     };

        case buildActionType(LOGIN, ActionStatus.DONE):
            return {
                status: StateStatus.LOADED,
                data: { ...action.payload },
                persisted: false,
                error: null,
                version: +new Date(),
            };

        case buildActionType(STORAGE_PERSIST, ActionStatus.DONE):
            return { ...state, persisted: true, version: +new Date() };

        case buildActionType(LOGIN, ActionStatus.FAILED):
            return { status: StateStatus.ERROR, error: action.payload };

        case NOT_AUTHORIZED:
            // state = notInitState;
            return {
                status: StateStatus.NOT_INITIALIZED,
                data: null,
                error: NOT_AUTHORIZED,
                persisted: false,
            };
        default:
            return state;
    }
};

export { auth };

import { ActionStatus } from 'components/src/redux/core/ActionStatus';
import { buildActionType } from 'components/src/redux/actions/buildActionType';
import { StateStatus } from 'components/src/redux/core/StateStatus';

const initialState = {
    auth: '',
    data: {},
    status: StateStatus.NOT_INITIALIZED,
    version: 0,
};

const basicReducer = (actionType: { entity: any }) => (state = initialState, action: { type: any; payload: { errors: any; data: any } }) => {
    switch (action.type) {
        case buildActionType(actionType, ActionStatus.START):
            return {
                ...state,
                status: StateStatus.LOADING,
                version: state.version,
                entity: actionType.entity,
            };

        case buildActionType(actionType, ActionStatus.DONE):
            return {
                status: StateStatus.LOADED,
                data: action.payload,
                entity: actionType.entity,
                version: +new Date(),
            };

        case buildActionType(actionType, ActionStatus.FAILED):
            return {
                status: StateStatus.ERROR,
                errors: action.payload.errors,
            };

        case buildActionType(actionType, ActionStatus.FAILED_BACKUP):
            return {
                status: StateStatus.ERROR,
                data: action.payload.data,
                errors: action.payload.errors,
            };

        case buildActionType(actionType, ActionStatus.RESET):
            return initialState;

        default:
            return state;
    }
};

export { basicReducer };

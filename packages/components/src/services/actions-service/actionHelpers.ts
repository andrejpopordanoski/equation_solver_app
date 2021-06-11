import { buildActionType } from 'components/src/redux/actions/buildActionType';
import { ActionStatus } from 'components/src/redux/core/ActionStatus';
import { GetApiRequest, PostApiRequest } from '../apiRequests';

export const getAction = async (dispatch: any, constant: any, api: any) => {
    dispatch({ type: buildActionType(constant, ActionStatus.START) });
    const response = await GetApiRequest(api);
    if (response.success) {
        dispatch({
            type: buildActionType(constant, ActionStatus.DONE),
            payload: response.data,
        });
    } else {
        dispatch({
            type: buildActionType(constant, ActionStatus.FAILED),
            payload: {
                errors: response.errors,
            },
        });
    }
};

export const postAction = async (dispatch: any, constant: any, api: any, data: any) => {
    dispatch({ type: buildActionType(constant, ActionStatus.START) });
    const response = await PostApiRequest(api, data, undefined);
    if (response.success) {
        dispatch({
            type: buildActionType(constant, ActionStatus.DONE),
            payload: response.data,
        });
    } else {
        dispatch({
            type: buildActionType(constant, ActionStatus.FAILED),
            payload: {
                errors: response.errors,
            },
        });
    }
};

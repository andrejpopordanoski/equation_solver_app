import { GetApiRequest, PostApiRequest } from 'components/src/services/apiRequests';
import { GET_RANDOM_API } from 'components/src/services/api';
import { getAction, postAction } from 'components/src/services/actions-service/actionHelpers';
import { ActionStatus } from '../core/ActionStatus';
import { buildActionType } from './buildActionType';
import { GET_RANDOM } from '../constants/main.constants';

export const getRandomApi = () => async (dispatch: any) => {
    getAction(dispatch, GET_RANDOM, GET_RANDOM_API());
};

export const postRandomApi = (bla: any, bla2: any, bla3: any) => async (dispatch: any) => {
    const data = new FormData();

    data.append('bla', bla);
    data.append('bla2', bla2);
    data.append('bla3', bla3);

    postAction(dispatch, GET_RANDOM, GET_RANDOM_API(), data);
};

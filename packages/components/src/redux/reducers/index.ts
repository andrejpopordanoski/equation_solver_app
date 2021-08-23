// created with createNewAction.sh
import { MER_PREDICT } from 'components/src/redux/constants/main.constants';
// created with createNewAction.sh
import { CROP_IMAGE } from 'components/src/redux/constants/main.constants';
import { GET_RANDOM } from 'components/src/redux/constants/main.constants';
import { AnyAction, combineReducers, EmptyObject } from 'redux';
import { buildActionType } from '../actions/buildActionType';
import { LOGOUT } from '../constants/auth.constants';
import { ActionStatus } from '../core/ActionStatus';
import { basicReducer } from './basic.reducer';

const rootReducer = combineReducers({
    someReducer: basicReducer(GET_RANDOM),
    // created with createNewAction.sh
    cropImage: basicReducer(CROP_IMAGE),
    // created with createNewAction.sh
    merPrediction: basicReducer(MER_PREDICT),
});

export default (state: any, action: any) => rootReducer(action.type === buildActionType(LOGOUT, ActionStatus.DONE) ? undefined : state, action);

import { GET_RANDOM } from 'components/src/redux/constants/main.constants';
import { AnyAction, combineReducers, EmptyObject } from 'redux';
import { buildActionType } from '../actions/buildActionType';
import { LOGOUT } from '../constants/auth.constants';
import { ActionStatus } from '../core/ActionStatus';
import { basicReducer } from './basic.reducer';

const rootReducer = combineReducers({
    someReducer: basicReducer(GET_RANDOM),
});

export default (state: any, action: any) => rootReducer(action.type === buildActionType(LOGOUT, ActionStatus.DONE) ? undefined : state, action);

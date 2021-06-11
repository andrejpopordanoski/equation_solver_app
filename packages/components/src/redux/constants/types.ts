import { Action } from 'components/src/redux/core/Action';

export const RESET_PASSWORD = { entity: 'RESET_PASSWORD', action: Action.HANDLE };
export const FORGOT_PASSWORD = { entity: 'FORGOT_PASSWORD', action: Action.HANDLE };
export const UPDATE_PASSWORD = { entity: 'PASSWORD', action: Action.UPDATE };
export const FORGOT_PASSWORD_RESET = { entity: 'FORGOT_PASSWORD', action: Action.RESET };

export const UPDATE_PROFILE = { entity: 'PROFILE', action: Action.UPDATE };
export const LOGIN = { entity: 'LOGIN', action: Action.HANDLE };
export const PROVIDER_IN = { entity: 'PROVIDER_IN', action: Action.HANDLE };

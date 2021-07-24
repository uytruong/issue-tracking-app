import { User } from '@app/data/model/user';
import { ActionType, createAction, props } from '@ngrx/store';

export const LOGIN = '@Auth/Login';
export const LOGIN_SUCCESS = '@Auth/LoginSuccess';
export const LOGIN_FAILED = '@Auth/LoginFailed';
export const LOGOUT = '@Auth/Logout';

export const login = createAction(LOGIN, props<{ username: string; password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
export const loginFailed = createAction(LOGIN_FAILED, props<{ error?: string }>());
export const logout = createAction(LOGOUT);

// export type AuthActionTypes =
//   | ActionType<typeof login>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginFailed>
//   | ActionType<typeof logout>;

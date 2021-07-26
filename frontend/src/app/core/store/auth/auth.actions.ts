import { User } from '@app/data/model/user';
import { ActionType, createAction, props } from '@ngrx/store';

export const LOGIN = '@Auth/Login';
export const LOGIN_SUCCESS = '@Auth/LoginSuccess';
export const GET_PROJECT = '@Auth/GetProject';
export const GET_PROJECT_SUCCESS = '@Auth/GetProjectSuccess';
export const GET_PROJECT_FAILED = '@Auth/GetProjectFailed';
export const LOGIN_FAILED = '@Auth/LoginFailed';
export const LOGOUT = '@Auth/Logout';

export const login = createAction(LOGIN, props<{ username: string; password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User }>());
export const getProject = createAction(GET_PROJECT, props<{ ids: string[] }>());
export const getProjectSuccess = createAction(GET_PROJECT_SUCCESS, props<{ ids: string[] }>());
export const getProjectFailed = createAction(GET_PROJECT_FAILED, props<{ ids: string[] }>());
export const loginFailed = createAction(LOGIN_FAILED, props<{ error?: string }>());
export const logout = createAction(LOGOUT);

// export type AuthActionTypes =
//   | ActionType<typeof login>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginFailed>
//   | ActionType<typeof logout>;

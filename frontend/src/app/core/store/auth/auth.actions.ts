import { Register } from '@app/data/model/register.model';
import { User } from '@app/data/model/user.model';
import { ActionType, createAction, props } from '@ngrx/store';

export const LOGIN = '@Auth/Login';
export const REGISTER = '@Auth/Register';
export const AUTO_LOGIN = '@Auth/AutoLogin';
export const LOGIN_SUCCESS = '@Auth/LoginSuccess';
export const REGISTER_SUCCESS = '@Auth/RegisterSuccess';
export const GET_PROJECT = '@Auth/GetProject';
export const GET_PROJECT_SUCCESS = '@Auth/GetProjectSuccess';
export const GET_PROJECT_FAILED = '@Auth/GetProjectFailed';
export const LOGIN_FAILED = '@Auth/LoginFailed';
export const REGISTER_FAILED = '@Auth/RegisterFailed';
export const LOGOUT = '@Auth/Logout';

export const login = createAction(LOGIN, props<{ username: string; password: string }>());
export const register = createAction(REGISTER, props<{ registerPayload: Register }>());
export const autoLogin = createAction(AUTO_LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User, success: string, redirect: boolean }>());
export const registerSuccess = createAction(REGISTER_SUCCESS, props<{ success: string }>());
export const getProject = createAction(GET_PROJECT, props<{ ids: string[] }>());
export const getProjectSuccess = createAction(GET_PROJECT_SUCCESS, props<{ ids: string[] }>());
export const getProjectFailed = createAction(GET_PROJECT_FAILED, props<{ ids: string[] }>());
export const loginFailed = createAction(LOGIN_FAILED, props<{ error?: string }>());
export const registerFailed = createAction(REGISTER_FAILED, props<{ error?: string }>());
export const logout = createAction(LOGOUT);

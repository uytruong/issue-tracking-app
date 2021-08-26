import { createReducer, on } from '@ngrx/store';
import { AuthState, AuthStatus } from './auth.state';
import * as fromAuthActions from './auth.actions';

const initialState: AuthState = {
  user: null,
  projects: [],
  status: AuthStatus.INIT,
  success: '',
  error: ''
};

export const authReducer = createReducer(
  initialState,
  on(fromAuthActions.login, (state) => {
    return {
      ...state,
      status: AuthStatus.LOADING,
      error: ''
    };
  }),
  on(fromAuthActions.register, (state) => {
    return {
      ...state,
      status: AuthStatus.LOADING,
      error: ''
    };
  }),
  on(fromAuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      success: action.success,
      status: AuthStatus.SUCCESS
    }
  }),
  on(fromAuthActions.registerSuccess, (state, action) => {
    return {
      ...state,
      success: action.success,
      status: AuthStatus.SUCCESS
    }
  }),
  on(fromAuthActions.loginFailed, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: AuthStatus.ERROR
    }
  }),
  on(fromAuthActions.registerFailed, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: AuthStatus.ERROR
    }
  }),
  on(fromAuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      status: AuthStatus.INIT
    }
  })
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState, AuthStatus } from './auth.state';

export const authSelector = createFeatureSelector<AppState, AuthState>('auth');

export const userSelector = createSelector(authSelector, state => state.user);
export const loadingSelector = createSelector(authSelector, state => state.status === AuthStatus.LOADING);
export const errorSelector = createSelector(authSelector, state => state.error);

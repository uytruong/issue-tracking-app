import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken } from '@app/data/model/jwt-token.model';
import { AuthService } from '@app/modules/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap((action) => this.authService.login(action.username, action.password)),
      map((loginPayload) => {
        console.log('[AuthEffects] login - loginPayload: ', loginPayload);
        const token: JwtToken = {
          token: loginPayload.access_token,
          expiresIn: +loginPayload.expires_in * 1000,
          user: loginPayload.user
        };
        localStorage.setItem('userToken', JSON.stringify(token));
        return fromAuthActions.loginSuccess({ user: loginPayload.user, redirect: true });
      }),
      catchError((e: Error) => of(fromAuthActions.loginFailed({ error: e.message })))
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.autoLogin),
      map(() => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (!userToken) {
          return fromAuthActions.loginFailed({ error: 'Token expires' });
        }
        return fromAuthActions.loginSuccess({ user: userToken.user, redirect: false });
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => {
        localStorage.removeItem('userToken');
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false }
  );
}

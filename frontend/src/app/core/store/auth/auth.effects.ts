import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken } from '@app/data/model/jwt-token.model';
import { User } from '@app/data/model/user.model';
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
        const token: JwtToken = {
          token: loginPayload.access_token,
          expiresIn: +loginPayload.expires_in * 1000,
          expirationDate: new Date(new Date().getTime() + +loginPayload.expires_in * 1000),
          user: loginPayload.user
        };
        localStorage.setItem('userToken', JSON.stringify(token));
        this.authService.setLogoutTimer(token.expiresIn);
        return fromAuthActions.loginSuccess({ user: loginPayload.user, redirect: true });
      }),
      catchError((e: Error) => of(fromAuthActions.loginFailed({ error: e.message })))
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.autoLogin),
      map(() => {
        const userTokenData: {
          token: string,
          expiresIn: string,
          expirationDate: string;
          user: User,
        } = JSON.parse(localStorage.getItem('userToken'));
        if (!userTokenData) {
          return fromAuthActions.loginFailed({ error: 'Token expires' });
        }
        const expirationDuration = new Date(userTokenData.expirationDate).getTime() - Date.now();
        this.authService.setLogoutTimer(expirationDuration);
        return fromAuthActions.loginSuccess({ user: userTokenData.user, redirect: false });
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

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => {
          localStorage.removeItem('userToken');
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}

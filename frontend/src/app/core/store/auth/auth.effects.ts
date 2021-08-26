import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserConst } from '@app/core/constant/user-const';
import { JwtToken } from '@app/data/model/jwt-token.model';
import { User } from '@app/data/model/user.model';
import { AuthService } from '@app/modules/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import parse from 'parse-duration';

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
      switchMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((loginPayload) => {
            const token: JwtToken = {
              token: loginPayload.access_token,
              expiresIn: parse(loginPayload.expires_in),
              expirationDate: new Date(new Date().getTime() + parse(loginPayload.expires_in)),
              user: loginPayload.user
            };
            localStorage.setItem(UserConst.UserToken, JSON.stringify(token));
            this.authService.setLogoutTimer(token.expiresIn);
            return fromAuthActions.loginSuccess({ user: loginPayload.user, success: '', redirect: true });
          }),
          catchError((e: HttpErrorResponse) =>
            of(fromAuthActions.loginFailed({ error: e.error.message }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.register),
      switchMap((action) =>
        this.authService.register(action.registerPayload).pipe(
          map(() => {
            return fromAuthActions.registerSuccess({
              success: 'Register successfully! Please log in.'
            });
          }),
          catchError((e: HttpErrorResponse) =>
            of(fromAuthActions.registerFailed({ error: e.error.message }))
          )
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.autoLogin),
      map(() => {
        const userTokenData: {
          token: string;
          expiresIn: string;
          expirationDate: string;
          user: User;
        } = JSON.parse(localStorage.getItem(UserConst.UserToken));
        if (!userTokenData) {
          return { type: 'DUMMY ' };
        }
        const expirationDuration = new Date(userTokenData.expirationDate).getTime() - Date.now();
        this.authService.setLogoutTimer(expirationDuration);
        return fromAuthActions.loginSuccess({
          user: userTokenData.user,
          success: 'Login successfully',
          redirect: false
        });
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
          localStorage.removeItem(UserConst.UserToken);
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}

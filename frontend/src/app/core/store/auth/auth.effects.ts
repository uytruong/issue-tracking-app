import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap((action) => this.authService.login(action.username, action.password)),
      map((user) => fromAuthActions.loginSuccess({ user: user })),
      catchError((e: Error) => of(fromAuthActions.loginFailed({ error: e.message })))
    )
  );
}

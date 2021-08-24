import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUrl } from '@app/core/configs/api-url';
import { UserConst } from '@app/core/constant/user-const';
import { logout } from '@app/core/store/auth/auth.actions';
import { Login } from '@app/data/model/login.model';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer;

  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string): Observable<Login> {
    return this.http.post<Login>(loginUrl, { username, password });
  }

  setLogoutTimer(duration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, duration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  getAuthorizationToken() {
    const userTokenData = JSON.parse(localStorage.getItem(UserConst.UserToken));
    return userTokenData?.token;
  }
}

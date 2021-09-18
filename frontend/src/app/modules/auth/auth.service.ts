import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUrl, registerUrl } from '@app/core/configs/api-url';
import { UserConst } from '@app/core/constant/user-const';
import { logout } from '@app/core/store/auth/auth.actions';
import { LoginResponse } from '@app/data/model/login-response.model';
import { Register } from '@app/data/model/register.model';
import { User } from '@app/data/model/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer;

  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(loginUrl, { username, password });
  }

  register(payload: Register): Observable<User> {
    return this.http.post<User>(registerUrl, payload);
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectApiUrl } from '@app/core/configs/api-url';
import { UserConst } from '@app/core/constant/user-const';
import {
  CreateProjectPayload,
  CreateProjectResponse,
  Project
} from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectListService {
  constructor(private http: HttpClient) {}

  getProjectsByIds(ids: string[]): Observable<Project[]> {
    const options =
      ids.length !== 0
        ? { params: new HttpParams().set('ids', encodeURIComponent(JSON.stringify(ids))) }
        : {};
    return this.http.get<Project[]>(projectApiUrl, options);
  }

  createProject(payload: CreateProjectPayload): Observable<CreateProjectResponse> {
    console.log('createProject: ', payload);
    return this.http.post<CreateProjectResponse>(projectApiUrl, payload);
  }

  updateUserToken(user: User) {
    const userTokenData: {
      token: string;
      expiresIn: string;
      expirationDate: string;
      user: User;
    } = JSON.parse(localStorage.getItem(UserConst.UserToken));
    userTokenData.user = user;
    localStorage.setItem(UserConst.UserToken, JSON.stringify(userTokenData));
  }
}

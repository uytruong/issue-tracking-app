import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectApiUrl, userApiUrl } from '@app/core/configs/api-url';
import { UserConst } from '@app/core/constant/user-const';
import {
  CreateProjectPayload,
  CreateProjectResponse,
  DeleteProjectPayload,
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
    return this.http.post<CreateProjectResponse>(projectApiUrl, payload);
  }

  deleteProject(payload: DeleteProjectPayload): Observable<CreateProjectResponse> {
    const options = { params: new HttpParams().set('userId', payload.userId) };
    return this.http.delete<CreateProjectResponse>(
      `${projectApiUrl}/${payload.projectId}`,
      options
    );
  }

  getUsersByUsername(username: string) {
    const options = username ? { params: new HttpParams().set('username', username) } : {};
    return this.http.get<User[]>(userApiUrl, options);
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectApiUrl } from '@app/core/configs/api-url';
import { Project, ProjectCategory } from '@app/data/model/project.model';
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
}

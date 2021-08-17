import { Injectable } from '@angular/core';
import { Issue, IssuePriority, IssueStage, IssueType } from '@app/data/model/issue.model';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Project } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { issueApiUrl, projectApiUrl, userApiUrl } from '@app/core/configs/api-url';

const dummyComments: IssueComment[] = [
  {
    id: 'commentId1',
    userId: '611a19e3fbf0ab3761e8760e',
    issueId: '3',
    content: 'This is the content of this comment. Good job!',
    createdAt: '2021-08-03T08:00:00Z',
    updatedAt: '2021-08-03T08:00:00Z'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectByKey(key: string): Observable<Project[]> {
    const options = key ? { params: new HttpParams().set('key', key) } : {};
    return this.http.get<Project[]>(projectApiUrl, options);
  }

  getIssuesByProjectId(id: string): Observable<Issue[]> {
    const options = id ? { params: new HttpParams().set('projectId', id) } : {};
    return this.http.get<Issue[]>(issueApiUrl, options);
  }

  updateIssue(issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${issueApiUrl}/${issue.id}`, issue);
  }

  getUsersByProjectId(id: string): Observable<User[]> {
    const options = id ? { params: new HttpParams().set('projectId', id) } : {};
    return this.http.get<User[]>(userApiUrl, options);
  }

  getCommentsByIssueId(id: string): Observable<IssueComment[]> {
    const comments = dummyComments.filter((comment) => comment.issueId === id);
    if (comments) {
      return of(comments);
    } else {
      throw new Error(`Users not found`);
    }
  }
}

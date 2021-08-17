import { Injectable } from '@angular/core';
import { Issue, IssuePriority, IssueStage, IssueType } from '@app/data/model/issue.model';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Project } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { projectApiUrl, userApiUrl } from '@app/core/configs/api-url';

const dummyIssues: Issue[] = [
  {
    id: '1',
    title: 'Backlog-Bug-Low-0',
    stage: IssueStage.BACKLOG,
    type: IssueType.BUG,
    priority: IssuePriority.LOW,
    listPosition: 0,
    description: '',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a19e3fbf0ab3761e8760e', '611a1b68fbf0ab3761e87615'],
    projectId: '611a704a059957025ce6563e',
    createdAt: '2021-07-04T08:00:00Z',
    updatedAt: '2021-07-04T08:00:00Z'
  },
  {
    id: '2',
    title: 'Backlog-Story-Medium-1',
    stage: IssueStage.BACKLOG,
    type: IssueType.STORY,
    priority: IssuePriority.MEDIUM,
    listPosition: 1,
    description: '',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a19e3fbf0ab3761e8760e', '611a1b92fbf0ab3761e8761b'],
    projectId: '611a704a059957025ce6563e',
    createdAt: '2021-07-04T08:01:00Z',
    updatedAt: '2021-07-04T08:01:00Z'
  },
  {
    id: '3',
    title: 'Selected-Task-High-0',
    stage: IssueStage.SELECTED,
    type: IssueType.TASK,
    priority: IssuePriority.HIGH,
    listPosition: 0,
    description:
      '<div>Selected Task High</div><div>This is the description of this task edited with @kolkov/angular-editor.</div><div>I find it very cool :D</div>',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a1b87fbf0ab3761e87618', '611a1b68fbf0ab3761e87615'],
    projectId: '611a704a059957025ce6563e',
    createdAt: '2021-07-04T08:02:00Z',
    updatedAt: '2021-07-04T08:02:00Z'
  },
  {
    id: '4',
    title: 'Selected-Task-High-1',
    stage: IssueStage.SELECTED,
    type: IssueType.TASK,
    priority: IssuePriority.HIGH,
    listPosition: 1,
    description: '',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a1b68fbf0ab3761e87615'],
    projectId: '611a704a059957025ce6563e',
    createdAt: '2021-07-04T08:03:00Z',
    updatedAt: '2021-07-04T08:03:00Z'
  },
  {
    id: '5',
    title: 'Selected-Task-High-2',
    stage: IssueStage.SELECTED,
    type: IssueType.TASK,
    priority: IssuePriority.HIGH,
    listPosition: 2,
    description: '',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a19e3fbf0ab3761e8760e'],
    projectId: '611a704a059957025ce6563e',
    createdAt: '2021-07-04T08:04:00Z',
    updatedAt: '2021-07-04T08:04:00Z'
  },
  {
    id: '6',
    title: 'Backlog-Task-Low-1',
    stage: IssueStage.BACKLOG,
    type: IssueType.TASK,
    priority: IssuePriority.LOW,
    listPosition: 0,
    description: '',
    reporterId: '611a19e3fbf0ab3761e8760e',
    assigneesId: ['611a1b92fbf0ab3761e8761b'],
    projectId: '611a76626c3d510831176ddb',
    createdAt: '2021-07-04T09:00:00Z',
    updatedAt: '2021-07-04T09:00:00Z'
  }
];

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
    const issues = dummyIssues.filter((issue) => issue.projectId === id);
    if (issues) {
      return of(issues);
    } else {
      throw new Error(`Issues not found`);
    }
  }

  getUsersByProjectId(id: string): Observable<User[]> {
    const options = id ? { params: new HttpParams().set('projectId', id) } : {};
    return this.http
      .get<User[]>(userApiUrl, options)
      .pipe(map((users) => users.filter((user) => user.projectIds.includes(id))));
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

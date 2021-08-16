import { Injectable } from '@angular/core';
import { Issue, IssuePriority, IssueStage, IssueType } from '@app/data/model/issue.model';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Project, ProjectCategory } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { filter, map } from 'rxjs/operators';

const dummyProjects: Project[] = [
  {
    id: 'abc-projectId',
    category: ProjectCategory.SOFTWARE,
    description: 'This is a software project',
    avatarUrl: 'https://i.pinimg.com/originals/24/70/08/2470083b72ec71f8a6727a70562bb7cc.jpg',
    key: 'abc',
    name: 'Apple Ball Cat',
    createdAt: '2021-07-03T08:00:00Z',
    updatedAt: '2021-07-03T08:00:00Z'
  },
  {
    id: 'xyz-projectId',
    category: ProjectCategory.BUSINESS,
    description: 'This is a business project',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_sIyYS38uLOr8A3s3kPW5PbgPR8JSuQMKQ&usqp=CAU',
    key: 'xyz',
    name: "X'mas Young Zoo",
    createdAt: '2021-07-03T09:00:00Z',
    updatedAt: '2021-07-03T09:00:00Z'
  }
];

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
    projectId: 'abc-projectId',
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
    projectId: 'abc-projectId',
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
    projectId: 'abc-projectId',
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
    projectId: 'abc-projectId',
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
    projectId: 'abc-projectId',
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
    projectId: 'xyz-projectId',
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
  private userAPIUrl: string;

  constructor(private http: HttpClient) {
    this.userAPIUrl = environment.apiUrl + '/users';
  }

  getProjectByKey(key: string): Observable<Project> {
    const project = dummyProjects.find((proj) => proj.key === key);
    if (project) {
      return of(project);
    } else {
      throw new Error(`Project with key ${key} not found`);
    }
  }

  getIssuesByProjectId(id: string): Observable<Issue[]> {
    const issues = dummyIssues.filter((issue) => issue.projectId === id);
    if (issues) {
      return of(issues);
    } else {
      throw new Error(`Issues not found`);
    }
  }

  getProjectsByIds(ids: string[]): Observable<Project[]> {
    const projects = dummyProjects.filter((project) => ids.includes(project.id));
    if (projects) {
      return of(projects);
    } else {
      throw new Error(`Projects not found`);
    }
  }

  getUsersByProjectId(id: string): Observable<User[]> {
    const options = id ? { params: new HttpParams().set('projectId', id) } : {};

    return this.http
      .get<User[]>(this.userAPIUrl, options)
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

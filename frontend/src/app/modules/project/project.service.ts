import { Injectable } from '@angular/core';
import { Issue, IssuePriority, IssueStage, IssueType } from '@app/data/model/issue.model';
import { IssueComment } from '@app/data/model/issue-comment.model';
import { Project, ProjectCategory } from '@app/data/model/project.model';
import { User } from '@app/data/model/user.model';
import { Observable, of } from 'rxjs';

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
    reporterId: 'reporter1',
    assigneesId: ['userId1', 'userId2'],
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
    reporterId: 'reporter1',
    assigneesId: ['userId1', 'userId4'],
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
    description: '<div>Selected Task High</div><div>This is the description of this task edited with @kolkov/angular-editor.</div><div>I find it very cool :D</div>',
    reporterId: 'reporter1',
    assigneesId: ['userId3', 'userId2'],
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
    reporterId: 'reporter1',
    assigneesId: ['userId2'],
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
    reporterId: 'reporter1',
    assigneesId: ['userId1'],
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
    reporterId: 'reporter1',
    assigneesId: ['userId4'],
    projectId: 'xyz-projectId',
    createdAt: '2021-07-04T09:00:00Z',
    updatedAt: '2021-07-04T09:00:00Z'
  }
];

const dummyUsers: User[] = [
  {
    id: 'userId1',
    username: 'uytruong',
    fullname: 'Uy Truong',
    email: 'uytruong97@gmail.com',
    avatarUrl: 'https://vcdn-vnexpress.vnecdn.net/2020/09/23/01-4451-1600828895.jpg',
    projectIds: ['abc-projectId', 'xyz-projectId'],
    createdAt: '2021-06-03T08:01:00Z',
    updatedAt: '2021-06-03T08:01:00Z'
  },
  {
    id: 'userId2',
    username: 'johnmayer',
    fullname: 'John Mayer',
    email: 'johnmayer@email.com',
    avatarUrl: 'https://www.rollingstone.com/wp-content/uploads/2021/07/JOHN_MAYER_SHOT_04_04482-11.jpg?resize=1800,1200&w=1800',
    projectIds: ['abc-projectId'],
    createdAt: '2021-06-03T08:02:00Z',
    updatedAt: '2021-06-03T08:02:00Z'
  },
  {
    id: 'userId3',
    username: 'johnfrusciante',
    fullname: 'John Frusciante',
    email: 'johnfrusciante@email.com',
    avatarUrl: 'https://edm.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTczNzIwNDkyMTM2NDc0MTcw/lx465e8s568d2hxgxfqvag.jpg',
    projectIds: ['abc-projectId'],
    createdAt: '2021-06-03T08:03:00Z',
    updatedAt: '2021-06-03T08:03:00Z'
  },
  {
    id: 'userId4',
    username: 'davidgilmour',
    fullname: 'David Gilmour',
    email: 'davidgilmour@email.com',
    avatarUrl: 'https://cdn.uc.assets.prezly.com/d24ba9ed-fb25-42d4-b466-bb6b6f2779a7/-/crop/4000x3041/0,959/-/preview/-/preview/2048x2048/-/quality/best/-/format/auto/',
    projectIds: ['abc-projectId'],
    createdAt: '2021-06-03T08:04:00Z',
    updatedAt: '2021-06-03T08:04:00Z'
  },
  {
    id: 'userId5',
    username: 'ichikanito',
    fullname: 'Ichika Nito',
    email: 'ichikanito@email.com',
    avatarUrl: 'https://www.ibanez.com/common/product_artist_file/file/a_main_ichika.jpg',
    projectIds: ['abc-projectId'],
    createdAt: '2021-06-03T08:05:00Z',
    updatedAt: '2021-06-03T08:05:00Z'
  }
];

const dummyComment: IssueComment[] = [
  {
    id: 'commentId1',
    userId: 'userId1',
    issueId: '3',
    content: 'This is the content of this comment. Good job!',
    createdAt: '2021-08-03T08:00:00Z',
    updatedAt: '2021-08-03T08:00:00Z'
  },
]

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() {}

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
    const projects = dummyProjects.filter(project => ids.includes(project.id));
    if (projects) {
      return of(projects);
    } else {
      throw new Error(`Projects not found`);
    }
  }

  getUsersByProjectId(id: string): Observable<User[]> {
    const users = dummyUsers.filter(user => user.projectIds.includes(id));
    if (users) {
      return of(users);
    } else {
      throw new Error(`Users not found`);
    }
  }
}

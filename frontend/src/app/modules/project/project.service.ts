import { Injectable } from '@angular/core';
import { Issue, IssuePriority, IssueStage, IssueType } from '@app/data/model/issue';
import { Project, ProjectCategory } from '@app/data/model/project';
import { Observable, of } from 'rxjs';

const dummyProjects: Project[] = [
  {
    id: 'abc-projectId',
    category: ProjectCategory.SOFTWARE,
    description: 'This is a software project',
    avatarUrl: 'https://i.pinimg.com/originals/24/70/08/2470083b72ec71f8a6727a70562bb7cc.jpg',
    key: 'abc',
    name: 'Apple Ball Cat',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021'
  },
  {
    id: 'xyz-projectId',
    category: ProjectCategory.BUSINESS,
    description: 'This is a business project',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6_sIyYS38uLOr8A3s3kPW5PbgPR8JSuQMKQ&usqp=CAU',
    key: 'xyz',
    name: 'X\'mas Young Zoo',
    createdAt: '01/02/2021',
    updatedAt: '01/02/2021'
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
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'abc',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
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
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'abc',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
  },
  {
    id: '3',
    title: 'Selected-Task-High-0',
    stage: IssueStage.SELECTED,
    type: IssueType.TASK,
    priority: IssuePriority.HIGH,
    listPosition: 0,
    description: '',
    reporterId: 'reporter1',
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'abc',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
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
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'abc',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
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
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'abc',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
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
    assigneesId: ['assignee1', 'assignee2'],
    projectId: 'xyz',
    createdAt: '01/01/2021',
    updatedAt: '01/01/2021',
  }
]; 

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private issues: Issue[] = [];

  constructor() { }

  getProjectByKey(key: string): Observable<Project> {
    const project = dummyProjects.find(proj => proj.key === key);
    return of(project);
  }
}

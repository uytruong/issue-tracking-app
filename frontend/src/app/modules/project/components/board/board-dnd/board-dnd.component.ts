import { Component, OnInit } from '@angular/core';
import {
  Issue,
  IssuePriority,
  IssueStage,
  IssueType,
} from '@app/data/model/issue';

@Component({
  selector: 'app-board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss'],
})
export class BoardDndComponent implements OnInit {
  stages: IssueStage[] = [
    IssueStage.BACKLOG,
    IssueStage.SELECTED,
    IssueStage.IN_PROGRESS,
    IssueStage.DONE,
  ];

  dumpIssues: Issue[] = [
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
      projectId: 'abc123',
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
      projectId: 'abc123',
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
      projectId: 'abc123',
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
      projectId: 'abc123',
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
      projectId: 'abc123',
      createdAt: '01/01/2021',
      updatedAt: '01/01/2021',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  sortIssue(stage: IssueStage) {
    const sortedIssues = this.dumpIssues
      .filter((issue) => issue.stage === stage)
      .sort((a, b) => {
        return a.listPosition - b.listPosition;
      });
    return sortedIssues;
  }
}

import { IssuePriority, IssueStage, IssueType } from '@app/data/model/issue';
import { Icon } from '@app/data/ui-model/icon';

export const issueStageDisplay = {
  [IssueStage.BACKLOG]: 'BACKLOG',
  [IssueStage.SELECTED]: 'SELECTED',
  [IssueStage.IN_PROGRESS]: 'IN PROGRESS',
  [IssueStage.DONE]: 'DONE'
};

export const issueStageDisplayColor = {
  [IssueStage.BACKLOG]: '#676b6b',
  [IssueStage.SELECTED]: '#676b6b',
  [IssueStage.IN_PROGRESS]: '#164da6',
  [IssueStage.DONE]: '#107d21'
};

export const issueTypeIconData = {
  [IssueType.STORY]: new Icon('book', 'fill', '#329419'),
  [IssueType.TASK]: new Icon('check', 'outline', '#2ca0f2'),
  [IssueType.BUG]: new Icon('bug', 'fill', '#f2402c')
};

export const issuePriorityColor = {
  [IssuePriority.LOW]: '#2de327',
  [IssuePriority.MEDIUM]: '#ed7e07',
  [IssuePriority.HIGH]: '#f53b22'
};

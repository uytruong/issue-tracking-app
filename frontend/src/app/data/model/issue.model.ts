export interface Issue {
  id: string;
  title: string;
  stage: IssueStage;
  type: IssueType;
  priority: IssuePriority;
  listPosition: number;
  description: string;
  reporterId: string;
  assigneesId: string[];
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssuePayload {
  title: string;
  stage: IssueStage;
  type: IssueType;
  priority: IssuePriority;
  description: string;
  reporterId: string;
  assigneesId: string[];
  projectId: string;
}

export const enum IssueStage {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done'
}

export const enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}

export const enum IssuePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

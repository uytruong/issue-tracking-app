export enum IssueStage {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done'
}

export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}

export enum IssuePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

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

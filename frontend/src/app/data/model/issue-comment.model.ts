export interface IssueComment {
  id: string;
  userId: string;
  issueId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueCommentPayload {
  userId: string;
  issueId: string;
  content: string;
}

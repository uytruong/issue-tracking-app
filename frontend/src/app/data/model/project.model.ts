import { User } from "./user.model";

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  category: ProjectCategory;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  userIds: string;
  name: string;
  key: string;
  description: string;
  category: ProjectCategory;
}

export interface DeleteProjectPayload {
  projectId: string;
  userId: string;
}

export interface CreateProjectResponse {
  project: Project;
  user: User;
}

export interface DeleteProjectResponse {
  project: Project;
  user: User;
}

export interface UpdateProjectPayload {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
}

export const enum ProjectCategory {
  SOFTWARE = 'Software',
  BUSINESS = 'Business'
}

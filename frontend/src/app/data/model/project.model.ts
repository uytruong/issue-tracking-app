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
  userId: string;
  name: string;
  key: string;
  description: string;
  category: ProjectCategory;
}

export interface CreateProjectResponse {
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

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

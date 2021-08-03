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

export const enum ProjectCategory {
  SOFTWARE = 'Software',
  BUSINESS = 'Business'
}

export interface User {
    id: string;
    username: string;
    fullname: string;
    role: Role;
    email: string;
    avatarUrl: string;
    projectIds: string[];
    createdAt: string;
    updatedAt: string;
}

export const enum Role {
    ADMIN = 'admin',
    User = 'user',
  }
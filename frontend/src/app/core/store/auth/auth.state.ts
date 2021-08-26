import { Project } from "@app/data/model/project.model";
import { User } from "@app/data/model/user.model";

export const enum AuthStatus {
  INIT = 'INIT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AuthState {
  user: User;
  projects: Project[];
  status: AuthStatus,
  success?: string,
  error?: string  
}

import { Project } from "@app/data/model/project";
import { User } from "@app/data/model/user";

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
  error?: string  
}

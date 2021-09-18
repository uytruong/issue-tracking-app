import { User } from './user.model';

export interface LoginResponse {
  access_token: string;
  expires_in: string;
  user: User;
}

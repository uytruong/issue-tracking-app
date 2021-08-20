import { User } from './user.model';

export interface Login {
  access_token: string;
  expires_in: string;
  user: User;
}

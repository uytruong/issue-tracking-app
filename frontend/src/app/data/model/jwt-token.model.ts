import { User } from "./user.model";

export interface JwtToken {
  token: string;
  expiresIn: number;
  expirationDate: Date;
  user: User;
}

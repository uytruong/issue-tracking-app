import { UserDto } from 'src/users/dto/user.dto';

export interface LoginResponseDto {
  access_token: string;
  expires_in: string;
  user: UserDto;
}

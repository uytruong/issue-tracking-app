import { BaseDto } from 'src/shared/base.dto';

export class CreateUserDto extends BaseDto {
  readonly username: string;
  readonly password: string;
  readonly avatarUrl?: string;
}

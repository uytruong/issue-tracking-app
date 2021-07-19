import { BaseDto } from 'src/shared/base.dto';

export class UpdateUserDto extends BaseDto {
  readonly username?: string;
  readonly avatarUrl?: string;
}

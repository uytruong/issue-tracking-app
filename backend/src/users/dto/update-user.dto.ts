import { BaseDto } from 'src/shared/base.dto';
import { Role } from '../models/role.enum';

export class UpdateUserDto extends BaseDto {
  readonly username?: string;
  readonly avatarUrl?: string;
  readonly projectIds?: string[];
  readonly role: Role;
}

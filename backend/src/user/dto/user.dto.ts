import { BaseDto } from 'src/shared/base.dto';
import { AutoMap } from '@automapper/classes';

export class UserDto extends BaseDto {
  @AutoMap()
  username: string;

  @AutoMap()
  avatarUrl?: string;

  @AutoMap()
  projectId: string[];
}

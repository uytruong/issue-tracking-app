import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/shared/base.dto';

export class UpdateProjectDto extends BaseDto {
  @AutoMap()
  category: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  avatarUrl: string;
}

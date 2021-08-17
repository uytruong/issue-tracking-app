import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/shared/base.dto';

export class ProjectDto extends BaseDto {
  @AutoMap()
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @AutoMap()
  @IsNotEmpty({ message: 'Key is required' })
  key: string;

  @AutoMap()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  avatarUrl: string;
}

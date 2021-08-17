import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/shared/base.dto';

export class IssueDto extends BaseDto {
  @AutoMap()
  title: string;

  @AutoMap()
  stage: string;

  @AutoMap()
  type: string;

  @AutoMap()
  priority: string;

  @AutoMap()
  listPosition: number;

  @AutoMap()
  description: string;

  @AutoMap()
  reporterId: string;

  @AutoMap()
  assigneesId: string[];

  @AutoMap()
  projectId: string;
}

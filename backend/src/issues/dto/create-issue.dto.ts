import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/shared/base.dto';

export class CreateIssueDto extends BaseDto {
  @AutoMap()
  title: string;

  @AutoMap()
  stage: string;

  @AutoMap()
  type: string;

  @AutoMap()
  priority: string;

  @AutoMap()
  description: string;

  @AutoMap()
  reporterId: string;

  @AutoMap()
  assigneesId: string[];

  @AutoMap()
  projectId: string;
}

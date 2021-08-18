import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/shared/base.dto';

export class IssueCommentDto extends BaseDto {
  @AutoMap()
  @IsNotEmpty({ message: 'User Id is required' })
  userId: string;

  @AutoMap()
  @IsNotEmpty({ message: 'Issue Id is required' })
  issueId: string;

  @AutoMap()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;
}

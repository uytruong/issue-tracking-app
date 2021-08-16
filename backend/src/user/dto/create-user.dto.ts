import { BaseDto } from 'src/shared/base.dto';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateUserDto extends BaseDto {
  @IsNotEmpty({ message: 'Username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;

  @IsNotEmpty({ message: 'Fullname is required' })
  readonly fullname: string;

  @ArrayNotEmpty({ message: 'Project Id is required' })
  readonly projectIds: string[];

  readonly email?: string;

  readonly avatarUrl?: string;
}

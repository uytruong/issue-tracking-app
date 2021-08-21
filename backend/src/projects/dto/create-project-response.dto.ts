import { UserDto } from 'src/users/dto/user.dto';
import { ProjectDto } from './project.dto';

export class CreateProjectResponseDto {
  project: ProjectDto;
  user: UserDto;
}

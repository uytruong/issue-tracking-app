import { AutoMap } from '@automapper/classes';

export class UserTest {
  @AutoMap()
  username: string;

  password: string;

  @AutoMap()
  avatarUrl: string;

  @AutoMap()
  projectId: string[];

  @AutoMap()
  id: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

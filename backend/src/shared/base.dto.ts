import { AutoMap } from '@automapper/classes';

export class BaseDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  createdAt: string;

  @AutoMap()
  updatedAt?: string;
}

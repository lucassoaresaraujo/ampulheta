import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DefaultScope,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

import { User } from './User';
import { ProjectUsers } from './ProjectUsers';
import { Time } from './Time';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] },
}))
@Table
export class Project extends Model<Project> {
  @ApiProperty()
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING(150) })
  title: string;

  @ApiProperty()
  @Column({ type: DataType.STRING(250) })
  description: string;

  @BelongsToMany(
    () => User,
    () => ProjectUsers,
  )
  users: User[];

  @HasMany(() => Time)
  times: Time[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DefaultScope,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Project } from './Project';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
}))
@Table
export class Time extends Model<Time> {
  @ApiProperty()
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty()
  @Column({ type: DataType.DATE })
  started_at: Date;

  @ApiProperty()
  @Column({ type: DataType.DATE })
  ended_at: Date;

  @ForeignKey(() => Project)
  project_id: number;

  @BelongsTo(() => Project)
  project: Project;
}

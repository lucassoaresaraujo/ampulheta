import { ForeignKey, Column, Table, Model } from 'sequelize-typescript';
import { Project } from './Project';
import { User } from './User';

@Table
export class ProjectUsers extends Model<ProjectUsers> {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}

import { hash, compare } from 'bcryptjs';
import {
  Table,
  Model,
  Column,
  BeforeCreate,
  DefaultScope,
  DataType,
  BeforeUpdate,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
}))
@Table
export class User extends Model<User> {
  @ApiProperty()
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING(150) })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: DataType.STRING(20), unique: true })
  login: string;

  @Column
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async encryptPassword(user: User): Promise<void> {
    if (user.password) {
      user.password = await hash(user.password, 8);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}

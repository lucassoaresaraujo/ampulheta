import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Op, FindOptions } from 'sequelize';

import { UserDto } from '../dtos/User.dto';
import { User } from '../models/User';
import { CreatedUser } from '../dtos/CreatedUserDto';

@Injectable()
export class UserService {
  async create(newUser: UserDto): Promise<CreatedUser> {
    const findUserSameEmailOrLogin = await User.findOne({
      where: { [Op.or]: { email: newUser.email, login: newUser.login } },
    });

    if (findUserSameEmailOrLogin) {
      throw new ConflictException('This email or login already exists');
    }

    const { id, name, email, login } = await User.create(newUser);
    const createdUser: CreatedUser = { id, name, email, login };
    return createdUser;
  }

  async findById(
    id: number,
    options?: Omit<FindOptions, 'where'>,
  ): Promise<User> {
    const user = await User.findByPk(id, options);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUser: UserDto): Promise<CreatedUser> {
    const user = await this.findById(id);

    if (user.email !== updateUser.email) {
      const findUserSameEmail = await User.findOne({
        where: { email: updateUser.email },
      });

      if (findUserSameEmail) {
        throw new ConflictException('This email already exists');
      }
    }

    if (user.login !== updateUser.login) {
      const findUserSameLogin = await User.findOne({
        where: { login: updateUser.login },
      });

      if (findUserSameLogin) {
        throw new ConflictException('This login already exists');
      }
    }

    const { name, email, login } = await user.update(updateUser);
    const updatedUser: CreatedUser = { id, name, email, login };
    return updatedUser;
  }
}

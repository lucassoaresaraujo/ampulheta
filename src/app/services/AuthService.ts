import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenDto } from '../dtos/Token.dto';
import { AuthCredentialsDto } from '../dtos/AuthCredentialsDto';
import { User } from '../models/User';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dtos/JwtPayload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async authenticate({
    login,
    password,
  }: AuthCredentialsDto): Promise<TokenDto> {
    const user = await User.findOne({
      attributes: { include: ['password'] },
      where: { login },
    });

    const isValidPassword = await user?.validatePassword(password);

    if (user && isValidPassword) {
      const tokenPayload: JwtPayload = { id: user.id };
      const token = this.jwtService.sign(tokenPayload);
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          login: user.login,
          name: user.name,
        },
      };
    }

    throw new UnauthorizedException('User not found or invalid password');
  }
}

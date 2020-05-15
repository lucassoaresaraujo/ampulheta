import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/app/dtos/JwtPayload';

import { User } from 'src/app/models/User';
import { UserService } from '../services/UserService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      const { id } = payload;

      const user = await this.userService.findById(id);

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

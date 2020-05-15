import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSequelizeConfig } from './config/sequelize.config';
import { getJwtConfig } from './config/jwt.config';

import { User } from './app/models/User';
import { Project } from './app/models/Project';
import { Time } from './app/models/Time';
import { ProjectUsers } from './app/models/ProjectUsers';

import { UserController } from './app/controllers/UserController';
import { ProjectController } from './app/controllers/ProjectControler';
import { TimeController } from './app/controllers/TimeControler';

import { UserService } from './app/services/UserService';
import { ProjectService } from './app/services/ProjectService';
import { TimeService } from './app/services/TimeService';
import { AuthService } from './app/services/AuthService';
import { AuthController } from './app/controllers/AuthController';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './app/auth/jwt.strategy';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<SequelizeModuleOptions> => getSequelizeConfig(configService),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => getJwtConfig(configService),
    }),
    SequelizeModule.forFeature([User, Project, ProjectUsers, Time]),
  ],
  controllers: [
    UserController,
    ProjectController,
    TimeController,
    AuthController,
  ],
  providers: [
    UserService,
    ProjectService,
    TimeService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AppModule {}

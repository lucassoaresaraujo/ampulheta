import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

export const getSequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  autoLoadModels: true,
  synchronize: true,
  logging: true,
  define: {
    underscored: true,
    paranoid: true,
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

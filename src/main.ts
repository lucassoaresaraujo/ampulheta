/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenvFlow from 'dotenv-flow';
import { swaggerOptions } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenvFlow.config();

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

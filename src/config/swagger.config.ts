import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Sistema Ampulheta')
  .setDescription('API do Sistema Ampulheta')
  .setVersion('1.0')
  .setBasePath('api/v1')
  .addBearerAuth()
  .build();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { validateEnvs } from './utils/env.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { FRONTEND_URL } = validateEnvs();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    credentials: true,
    origin: FRONTEND_URL,
  });

  app.use(helmet());

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

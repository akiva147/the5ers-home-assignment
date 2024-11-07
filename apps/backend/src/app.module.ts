import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from './guards/auth.guard';
import { UserModule } from './modules/user/user.module';
import { validateEnvs } from './utils/env.utils';

const { DB_CONNECTION, DB_NAME } = validateEnvs();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(DB_CONNECTION, {
      ignoreUndefined: true,
      dbName: DB_NAME,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

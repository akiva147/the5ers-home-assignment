import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvs } from './utils/env.utils';

const { DB_CONNECTION, DB_NAME } = validateEnvs();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(DB_CONNECTION, {
      ignoreUndefined: true,
      dbName: DB_NAME,
    }),
  ],
  providers: [],
})
export class AppModule {}

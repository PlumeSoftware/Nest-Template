import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';

const configService = new ConfigService();

import entities from '../lib/entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: configService.get('SQL_HOST'),
        port: Number(configService.get('SQL_PORT')),
        username: configService.get("SQL_USER"),
        password: configService.get('SQL_PASS'),
        database: configService.get('SQL_BASE'),
        entities: entities,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [

  ],
})
export class AppModule { }

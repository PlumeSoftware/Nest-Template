import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ContactModule } from '../ops/mail/mail.module';
import { meta } from '../lib/entity/meta';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';
import { LogService } from '../ops/log/log.service';
import { projectServer, serverEmail, databaseConfig } from '../lib/config/backend'
@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => projectServer, () => serverEmail, () => databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('SQL_HOST'),
        port: configService.get('SQL_PORT'),
        username: configService.get('SQL_USER'),
        password: configService.get('SQL_PASS'),
        database: configService.get('SQL_BASE'),
        entities: meta,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(meta),

    ContactModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    LogService
  ],
})
export class AppModule { }

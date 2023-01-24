import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { meta } from '../../lib/entity/meta';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
    imports: [TypeOrmModule.forFeature(meta)],
    providers: [LogService],
    controllers: [LogController]
})
export class LogModule { }

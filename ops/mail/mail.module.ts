import { Module } from '@nestjs/common';
import { ContactController } from './mail.controller';
import { ContactService } from './mail.service';

@Module({
    providers: [ContactService],
    controllers: [ContactController]
})
export class ContactModule { }

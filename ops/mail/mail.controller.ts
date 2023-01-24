import { Body, Controller, Post, Request } from '@nestjs/common';
import { EmailReq } from '../../lib/entity/request/sendEmailReq';
import { ContactService } from './mail.service';

@Controller()
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    public async sendEmailToHost(@Body() body: EmailReq): Promise<void> {
        await this.contactService.sendEmail(body.title, body.content, body.receiver)
        return;
    }
}

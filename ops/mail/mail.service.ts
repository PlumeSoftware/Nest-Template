import { Injectable } from '@nestjs/common';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer'
import { serverEmail } from '../../lib/config/backend';

@Injectable()
export class ContactService {
    public async sendEmail(title: string, content: string, receiver: string): Promise<void> {
        const transporter: Transporter = createTransport(serverEmail)
        const options: SendMailOptions = {
            from: serverEmail.auth.user,
            to: receiver,
            subject: title,
            html: content
        }
        await transporter.sendMail(options);
    }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDTO } from './dto/email.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(emailDto: EmailDTO) {
    const url = `google.com`;

    await this.mailerService.sendMail({
      to: emailDto?.to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: emailDto?.subject,
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: emailDto?.name,
        url,
      },
    });
  }
}

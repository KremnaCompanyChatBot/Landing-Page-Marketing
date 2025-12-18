import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordReset(email: string, link: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset.</p><p><a href="${link}">${link}</a></p>`,
    });
  }
}

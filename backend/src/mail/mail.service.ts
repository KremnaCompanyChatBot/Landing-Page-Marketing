import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordReset(email: string, token: string) {
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Kremna - Password Reset Request',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4ECDC4; margin: 0;">Kremna Automation</h1>
            </div>
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; border: 1px solid #eee;">
              <h2 style="font-size: 20px; margin-top: 0;">Password Reset Request</h2>
              <p>Hello,</p>
              <p>You have requested to reset your password. You can set a new password by clicking the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #4ECDC4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset My Password</a>
              </div>
              <p style="font-size: 14px; color: #666;">This link is valid for 1 hour. If you did not make this request, please ignore this email.</p>
            </div>
            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
              © 2025 Kremna Automation Team. All rights reserved.
            </div>
          </div>
        `,
      });
      this.logger.log(`Password reset email sent successfully: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}: ${error.message}`);
      throw error;
    }
  }
}
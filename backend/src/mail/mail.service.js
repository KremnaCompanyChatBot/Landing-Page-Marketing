import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordReset(email: string, token: string) {
    // Frontend URL'ini environment variable'dan alalım, yoksa varsayılanı kullanalım.
    // DevOps bu değişkeni Render'da ayarlamalı: FRONTEND_URL=https://kremna-app.vercel.app
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${token}`; // Token'ı URL parametresi değil path parametresi olarak gönderelim (Frontend rotasına uygun)

    this.logger.log(`Attempting to send password reset email to: ${email}`);

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Kremna - Password Reset Request',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4ECDC4; text-align: center;">Password Reset</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #4ECDC4; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p style="font-size: 14px; color: #666;">If you did not request this, please ignore this email. This link is valid for 1 hour.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
            <p style="text-align: center; font-size: 12px; color: #999;">© 2025 Kremna Automation Team</p>
          </div>
        `,
      });
      
      this.logger.log(`Email successfully sent to ${email}`);
    } catch (error) {
      // Hatanın detayını loglayalım
      this.logger.error(`FAILED to send email to ${email}. Error: ${error.message}`, error.stack);
      
      // Kullanıcıya genel bir hata dönelim ama sunucuyu çökertmeyelim
      throw new InternalServerErrorException('Failed to send email. Please try again later.');
    }
  }
}
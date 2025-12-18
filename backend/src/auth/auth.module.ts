import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GoogleStrategy } from './google/google.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    MailModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not set!');
        }

        const expiresInValue = configService.get<string>(
          'JWT_EXPIRES_IN',
          '1h',
        );

        let expiresInFinal: string | number;
        if (/^\d+$/.test(expiresInValue)) {
          expiresInFinal = parseInt(expiresInValue, 10);
        } else {
          expiresInFinal = expiresInValue;
        }

        return {
          secret: secret,
          signOptions: { expiresIn: expiresInFinal as any },
        };
      },
      inject: [ConfigService],
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy, GoogleStrategy],

  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}

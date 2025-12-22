import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get(
      'GOOGLE_CALLBACK_URL',
      'http://localhost:3000/api/auth/google/callback',
    );

    if (!clientID || !clientSecret) {
      throw new InternalServerErrorException(
        'Google OAuth Client ID or Secret not configured in .env file',
      );
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3000/api/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { name, emails } = profile;
    const googleUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };
    this.logger.log(`Google user profile received: ${googleUser.email}`);
    try {
      const user = await this.authService.findOrCreateGoogleUser(googleUser);
      if (!user) {
        throw new InternalServerErrorException(
          'Could not find or create user after Google validation',
        );
      }
      done(null, user);
    } catch (error) {
      this.logger.error(
        `Error during Google user validation: ${error.message}`,
        error.stack,
      );
      done(error, false);
    }
  }
}

import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private googleClient: OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (googleClientId) {
      this.googleClient = new OAuth2Client(googleClientId);
    } else {
      this.logger.warn('GOOGLE_CLIENT_ID environment variable is not set!');
    }
  }

  async login(email: string, password: string): Promise<any> {
    this.logger.log(`Attempting login for email: ${email}`);
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`Login failed: User not found for email ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password || user.password === 'GOOGLE_SIGNUP_PLACEHOLDER') { 
        this.logger.warn(`Login failed: User ${email} registered via Google, password login disabled.`);
        throw new UnauthorizedException('Please log in using your Google account.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for email ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`Login successful for email: ${email}`);
    const { password: userPassword, ...result } = user;
    return this.generateJwtToken(result);
  }

  generateJwtToken(user: Partial<User>) {
     const payload = {
       sub: user.id,
       email: user.email,
       companyName: user.companyName,
     };
     const token = this.jwtService.sign(payload);
     return {
       success: true,
       token,
       user: {
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         companyName: user.companyName,
       },
     };
  }


  async validateGoogleTokenAndLogin(googleToken: string): Promise<any> {
    if (!this.googleClient) {
        throw new InternalServerErrorException('Google Client is not configured.');
    }
    try {
      this.logger.log('Verifying Google token...');
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });
      const googleUser = ticket.getPayload();

      if (!googleUser || !googleUser.email) {
        this.logger.error('Invalid Google token or email missing.');
        throw new UnauthorizedException('Invalid Google token');
      }

      this.logger.log(`Google token verified for email: ${googleUser.email}`);
      const userResult = await this.findOrCreateGoogleUser(googleUser);
      const tokenResponse = this.generateJwtToken(userResult.user);
      return { ...tokenResponse, isNewUser: userResult.isNewUser };

    } catch (error) {
      this.logger.error(`Error verifying Google token: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Could not verify Google token', error.message);
    }
  }

  async findOrCreateGoogleUser(googleProfile: any): Promise<{ user: User, isNewUser: boolean }> {
    this.logger.log(`Finding or creating user for Google email: ${googleProfile.email}`);
    try {
      let user = await this.userService.findOneByEmail(googleProfile.email);
      let isNewUser = false;

      if (!user) {
        this.logger.log(`Creating new user via Google: ${googleProfile.email}`);
        isNewUser = true;

        const firstName = googleProfile.given_name || googleProfile.name || 'Google';
        const lastName = googleProfile.family_name || 'User';

        user = await this.userService.create({
          email: googleProfile.email,
          firstName: firstName,
          lastName: lastName,
          password: 'GOOGLE_SIGNUP_PLACEHOLDER', 
          companyName: undefined, 
        });

        this.logger.log(`New user created with ID: ${user.id}`);
      } else {
        this.logger.log(`Existing user found with ID: ${user.id}`);
      }
      return { user, isNewUser };
    } catch (error) {
      this.logger.error(`Error finding/creating Google user: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Could not process google user: ${error.message}`, error.message);
    }
  }
}


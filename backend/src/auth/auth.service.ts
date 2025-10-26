import { Injectable, UnauthorizedException, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library'; 
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
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (clientId) {
      this.googleClient = new OAuth2Client(clientId);
    } else {
      this.logger.warn('GOOGLE_CLIENT_ID environment variable is not set!');
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password) {
        throw new UnauthorizedException('Please log in using your Google account');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      companyName: user.companyName
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
      throw new InternalServerErrorException('Google Client is not configured');
    }
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: googleToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });
      const googlePayload = ticket.getPayload();

      if (!googlePayload || !googlePayload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const { user, isNewUser } = await this.findOrCreateGoogleUser(googlePayload);

      const jwtPayload = {
         sub: user.id,
         email: user.email,
         companyName: user.companyName
      };
      const token = this.jwtService.sign(jwtPayload);

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
        isNewUser: isNewUser, 
      };
    } catch (error) {
      this.logger.error(`Error validating Google token: ${error.message}`, error.stack);
      throw new UnauthorizedException('Could not validate Google token');
    }
  }

  async findOrCreateGoogleUser(googleProfile: any): Promise<{ user: User, isNewUser: boolean }> {
    const user = await this.userService.findOneByEmail(googleProfile.email);

    if (user) {
      return { user: user, isNewUser: false }; 
    }

    this.logger.log(`Creating new user via Google: ${googleProfile.email}`);
    try {
      const newUser = await this.userService.create({
        email: googleProfile.email,
        firstName: googleProfile.given_name,
        lastName: googleProfile.family_name,
        password: undefined, 
        companyName: undefined, 
      });
      return { user: newUser, isNewUser: true };
    } catch (error) {
      this.logger.error(`Error finding/creating Google user: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Could not process google user`, error.message);
    }
  }

  generateJwtToken(user: User): { token: string } {
       const payload = {
         sub: user.id,
         email: user.email,
         companyName: user.companyName
       };
       const token = this.jwtService.sign(payload);
       return { token };
  }
}


import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error(
        'JWT_SECRET environment variable is not set! Check your .env file.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      this.logger.error('Invalid token payload: missing "sub" field.');
      throw new UnauthorizedException('Invalid token structure.');
    }

    const user = await this.userService.findOneById(String(payload.sub));

    if (!user) {
      this.logger.warn(
        `Auth failed: User with ID ${payload.sub} not found in database.`,
      );
      throw new UnauthorizedException('Access Denied. User no longer exists.');
    }

    return user;
  }
}

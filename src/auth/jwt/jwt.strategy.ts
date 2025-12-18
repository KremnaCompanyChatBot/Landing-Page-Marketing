import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set!');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: secret, 
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.sub); 
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}


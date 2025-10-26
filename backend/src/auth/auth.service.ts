import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user; 
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      companyName: user.companyName 
    };

    return {
      success: true,
      token: this.jwtService.sign(payload), 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName, 
        email: user.email,
        companyName: user.companyName,
      },
    };
  }
}

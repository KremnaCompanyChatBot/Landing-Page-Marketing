#!/bin/bash

# Complete Google Auth Removal Script
# Run this from your Mac in ~/Landing-Page-Marketing

set -e

echo "🗑️  Removing ALL Google Auth code..."
echo ""

cd ~/Landing-Page-Marketing

# 1. Clean auth.service.ts
echo "📝 Cleaning auth.service.ts..."
cat > /tmp/auth.service.cleaned.ts << 'EOF'
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, companyName, phoneNumber } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('This email is already registered.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      isGoogleUser: false,
    });

    await this.userRepository.save(user);

    return {
      success: true,
      message: 'User registered successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    console.log('[AuthService] Login attempt for email:', email);

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      console.log('[AuthService] User not found for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      console.log('[AuthService] User has no password set');
      throw new BadRequestException('Please use alternative login method');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('[AuthService] Invalid password for user:', email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      isGoogleUser: user.isGoogleUser,
    };
    const token = this.jwtService.sign(payload);

    console.log('[AuthService] Login successful for user:', email);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
EOF

cp /tmp/auth.service.cleaned.ts backend/src/auth/auth.service.ts

# 2. Clean auth.controller.ts
echo "📝 Cleaning auth.controller.ts..."
cat > /tmp/auth.controller.cleaned.ts << 'EOF'
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UseGuards, 
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return {
      user: req.user,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout() {
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}
EOF

cp /tmp/auth.controller.cleaned.ts backend/src/auth/auth.controller.ts

# 3. Clean auth.module.ts
echo "📝 Cleaning auth.module.ts..."
cat > /tmp/auth.module.cleaned.ts << 'EOF'
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '7d' 
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
EOF

cp /tmp/auth.module.cleaned.ts backend/src/auth/auth.module.ts

# 4. Clean package.json
echo "📝 Cleaning package.json..."
sed -i '' '/"passport-google-oauth20"/d' backend/package.json
sed -i '' '/@types\/passport-google-oauth20/d' backend/package.json

# 5. Clean .env
echo "📝 Cleaning .env..."
if [ -f "backend/.env" ]; then
    sed -i '' '/GOOGLE_CLIENT_ID/d' backend/.env
    sed -i '' '/GOOGLE_CLIENT_SECRET/d' backend/.env
    sed -i '' '/GOOGLE_CALLBACK_URL/d' backend/.env
fi

# 6. Delete compiled JS files (they will be regenerated)
echo "📝 Removing old compiled files..."
rm -f backend/src/auth/auth.service.js
rm -f backend/src/auth/auth.controller.js
rm -f backend/src/auth/auth.module.js
rm -f backend/src/auth/auth.service.d.ts
rm -f backend/src/auth/auth.controller.d.ts

echo ""
echo "✅ All Google Auth code removed!"
echo ""
echo "📋 Files modified:"
echo "  - backend/src/auth/auth.service.ts"
echo "  - backend/src/auth/auth.controller.ts"
echo "  - backend/src/auth/auth.module.ts"
echo "  - backend/package.json"
echo "  - backend/.env"
echo ""
echo "🔍 Verifying..."
grep -r "Google" backend/src/auth/ --include="*.ts" || echo "✓ No Google references found!"
echo ""
echo "📤 Now commit and push:"
echo "  git add ."
echo "  git commit -m 'Complete removal of Google OAuth - clean version'"
echo "  git push origin backend-v4"
echo ""

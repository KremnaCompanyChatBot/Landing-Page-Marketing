import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- Gerekli paket

@Module({
  imports: [
    UserModule,
    
    ConfigModule.forRoot({
        isGlobal: true, 
    }),

    JwtModule.registerAsync({
        imports: [ConfigModule], 
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), 
            signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService], 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports: [AuthService], 
})
export class AuthModule {}

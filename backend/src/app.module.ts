import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity'; 

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ 
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get<string>('DB_HOST', 'localhost'), 
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_DATABASE', 'kremna_db'),
        entities: [User], 
        autoLoadEntities: true, 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
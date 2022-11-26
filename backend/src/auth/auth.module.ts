import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/users/user.providers';
import { jwtConstants } from './constants/jwt.constant';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginController } from './usecases/login/login.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [...userProviders, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [LoginController],
})
export class AuthModule {}

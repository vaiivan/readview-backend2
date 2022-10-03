import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utilities/constants';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions:{expiresIn:'30days'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}

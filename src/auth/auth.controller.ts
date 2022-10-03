import { Controller, Post, Request, Logger, UseGuards, Get, Body } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}
  private readonly logger = new Logger(AuthService.name)

  
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const token = await this.authService.sigingToken(user[0])
    return {statusCode:200, user: user, token: token.access_token}
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async localLogin(@Request() req) {
    const token = await this.authService.sigingToken(req.user)
    return {
      statusCode: 200,
      user: req.user,
      token: token.access_token
    }
  }
}

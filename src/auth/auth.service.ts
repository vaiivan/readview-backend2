import { Injectable, Logger} from '@nestjs/common';
import { checkPassword } from '../utilities/hash';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  // constructor
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService) {}

  //import nestjs/logger
  private readonly logger = new Logger(AuthService.name)
  
  
  //find out the user and check the passsword
  async validateUser(email:string, password:string) {
    try {
      const result = await this.userService.getUserByEmailAndLogin(email)

      if(result.length == 0){
        return false
      } else {
        const checking = await checkPassword(password, result[0].password)
        if (checking){
          return result
        } else {
          return false
        }
      }
    } catch(e){
      this.logger.error(e)
      return false
    }
  }

  //signing a token
  async sigingToken(user: any){
    const payload = {email: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }


}

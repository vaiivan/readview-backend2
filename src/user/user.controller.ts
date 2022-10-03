import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utilities/multerConfig';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // insert user_genre 
  @Post()
  async InsertGenre(@Request() req, @Body() likedgenres:number[]){
    const userId = req.user.id
    const result = await this.userService.insertUserGenre(userId, likedgenres)
    return result
  }

  //get the current userID
  @Get()
  async findCurrentUser(@Request() req) {
    const userId = req.user.id;
    const result = await this.userService.findUser(userId);
    return [{statusCode: 200, user: result}];
  }

  //get one specific userID
  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    const result = await this.userService.findUserWithFollowedNum(+id)
    return result;
  }
  
  //deactivate user
  @Patch('remove')
  async deactivateUser(@Request() req){
    const userId = req.user.id;
    const result = await this.userService.deactivate(userId)
    return result
  }

  //update user profile
  
  @Patch('username')
  async updateUsername(@Request() req, @Body('value') value){
    const userId = req.user.id
    const type = 'username'
    const result = await this.userService.updateUser(type,value, userId)
    return result
  }

  @Patch('email')
  async updateEmail(@Request() req, @Body('value') value){
    const userId = req.user.id
    const type = 'email'
    const result = await this.userService.updateUser(type, value, userId)
    return result
  }

  @Patch('info')
  async updateInfo(@Request() req, @Body('value') value){
    const userId = req.user.id
    const type = 'info'
    const result = await this.userService.updateUser(type, value, userId)
    return result
  }

  @Patch('password')
  async updatePassword(@Request() req, @Body('value') value){

    const userId = req.user.id
    const result = await this.userService.updatePassword(value, userId)
    return result
  }

  @Patch('image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateUser(
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req,
  ) {
    const userId = req.user.id
    const profile = file.filename
    const type = 'profile_picture'
    const result = await this.userService.updateUser(type,profile,userId)
    return result
    
  }

}

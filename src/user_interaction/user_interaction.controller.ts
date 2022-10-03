import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserInteractionService } from './user_interaction.service';

@UseGuards(JwtAuthGuard)
@Controller('user-interaction')
export class UserInteractionController {
  constructor(
    private readonly userInteractionService: UserInteractionService,
  ) {}

  @Get('readlist')
  async getReadList(@Request() req, @Query('page') pageNo:string) {
    const userId = req.user.id;
    const type = 'read';
    const result = await this.userInteractionService.getList(type, userId, +pageNo);
    return result;
  }

  @Get('readinglist')
  async GetReadingList(@Request() req, @Query('page') pageNo:string) {
    const userId = req.user.id;
    const type = 'reading';
    const result = await this.userInteractionService.getList(type, userId, +pageNo);
    return result;
  }

  @Get('wantlist')
  async GetWantList(@Request() req, @Query('page') pageNo:string) {
    const userId = req.user.id;
    const type = 'want';
    const result = await this.userInteractionService.getList(type, userId, +pageNo);
    return result;
  }

  @Get('recentRead/:id')
  async GetRecentRead(@Param('id') id:string){
    const type = 'read'
    const result = await this.userInteractionService.getRecent(+id)
    return result
  }

  @Get('recommendation')
  async recommendation(@Request() req){
    const userId = req.user.id
    const result = await this.userInteractionService.recommendation(userId);
    return result
  }

}

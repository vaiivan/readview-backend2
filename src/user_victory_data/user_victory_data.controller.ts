import { Controller, Get, Request, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserVictoryDataService } from './user_victory_data.service';

@UseGuards(JwtAuthGuard)
@Controller('uservictorydata')
export class UserVictoryDataController {
  constructor(
    private readonly userVictoryDataService: UserVictoryDataService,
  ) {}

  @Get('')
  async getUserRating(@Request() req) {
    try {
      const userId = req.user.id;
      const rating = await this.userVictoryDataService.getUserRating(userId);
      const genre = await this.userVictoryDataService.getUserGenre(userId);
      const author = await this.userVictoryDataService.getUserAuthor(userId);
      const fiction = await this.userVictoryDataService.getUserFiction(userId);


      let result = {
        rating: rating,
        genre: genre,
        author: author,
        fiction: fiction,
      };
      return result;
    } catch (e) {
      return [{ status: 400, message: 'Internal Server Error' }]
    }
  }

  @Get(':id')
  async getRating(@Param('id') id: string) {
    const result = await this.userVictoryDataService.getUserRating(+id);
    return result;
  }
}

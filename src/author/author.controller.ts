import {
  Request,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('author/:id')
  async author(@Param('id') authorId: number) {
    const result = await this.authorService.author(authorId);
    return result;
  }

  @Get('booklist/:id')
  async GetAuthorBooklist(@Request() req, @Param('id') authorId: number) {
    const userId = req.user.id;
    const result = await this.authorService.authorBooklist(authorId, userId);
    return result;
  }

  @Get('check/:id')
  async CheckFollowStatus(@Request() req, @Param('id') authorId: number) {
    const userId = req.user.id;
    const result = await this.authorService.checkfollow(authorId, userId);
    return result;
  }

  @Get('user')
  async getUserFollowedAuthorList(@Request() req) {
    const userId = req.user.id;
    const result = await this.authorService.getUserFollowedAuthorList(userId);
    return result;
  }

  @Get('searchAuthor')
  async searchAuthor(@Query('search') search: string) {
    const result = await this.authorService.searchAuthor(search);
    return result;
  }

  @Post('followAuthor/:id')
  async followAuthor(@Request() req, @Param('id') authorId: number) {
    const userId = req.user.id;
    const result = await this.authorService.followAuthor(userId, authorId);
    return result;
  }

  @Patch('unfollowAuthor/:id')
  unfollowAuthor(@Request() req, @Param('id') authorId: number) {
    const userId = req.user.id;
    return this.authorService.unfollowAuthor(userId, authorId);
  }
}

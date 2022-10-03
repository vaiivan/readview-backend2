import { Request, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchService } from './search.service';

@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  //get a list of genre
  @Get('genre')
  async getAllGenre() {
    const result = await this.searchService.getAllGenre();
    return result;
  }

  @Get('genre')
  async searchByGenres(@Query('search') search: string) {
    const result = await this.searchService.searchByGenres(search);
    return result;
  }

  @Get('title')
  async searchByTitle(@Request() req, @Query('search') search: string, @Query('page') pageNo:string) {
    const userId = req.user.id
    const result = await this.searchService.searchBookByTitle(search, userId,+pageNo);
    return result;
  }

  @Get('isbn')
  async searchByISBN(@Request() req, @Query('search') search: string, @Query('page') pageNo:string) {
    const userId = req.user.id
    const result = await this.searchService.searchBookByISBN(search, userId,+pageNo);
    return result;
  }

  @Get('author')
  async searchByAuthors(@Query('search') search: string, @Query('page') pageNo:string) {
    const result = await this.searchService.searchByAuthors(search, +pageNo);
    return result;
  }

  @Get('user')
  async searchByUser(@Query('search') search: string, @Query('page') page: string) {
    const result = await this.searchService.searchByUser(search, +page);
    return result;
  }

  @Get('booklist')
  async booklistBySearch(@Query('search') search: string, @Query('page') pageNo:string) {
    const result = await this.searchService.booklistBySearch(search, +pageNo);
    return result;
  }
}

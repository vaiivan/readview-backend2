import {
  Request,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooklistService } from './booklist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateBooklistDto,
  InsertBookIntoBooklistDto,
} from './dto/create-booklist.dto';
import { UpdateBooklistDto } from './dto/update-booklist.dto';

@UseGuards(JwtAuthGuard)
@Controller('booklist')
export class BooklistController {
  constructor(private readonly booklistService: BooklistService) {}

  @Post('createBooklist')
  async createBooklist(
    @Body() CreateBooklistDto: CreateBooklistDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    const result = await this.booklistService.createBooklist(
      userId,
      CreateBooklistDto,
    );
    return result;
  }

  @Patch('updated/:id')
  async updateBooklist(
    @Body() updated: UpdateBooklistDto,
    @Param('id') booklist_id: string,
    @Request() req,
  ) {
    const result = await this.booklistService.updateBooklist(
      +booklist_id,
      updated,
    );
    return result;
  }

  @Post('addBookIntoBooklist')
  async addBookIntoBooklist(
    @Body() createBooklistDto: InsertBookIntoBooklistDto,
  ) {
    const result = await this.booklistService.addBookIntoBooklist(
      createBooklistDto,
    );
    return result;
  }

  @Get('checkBook/:bookid/:booklistid')
  async checkBookInsideBooklist(
    @Request() req,
    @Param('bookid') bookId: string,
    @Param('booklistid') booklistId: string,
  ) {
    const result = await this.booklistService.checkBookInsideBooklist(
      +bookId,
      +booklistId,
    );
    return result;
  }

  @Get('/checkbooklist/:id')
  async checkIfTheUserFollowedTheBookList(@Request() req, @Param('id') booklist_id) {
    const userId = req.user.id;
    const result = await this.booklistService.checkIfFollowed(
      userId,
      booklist_id,
    );
    return result;
  }

  @Get('/ownerFollowedBooklist')
  async followedBooklist(@Request() req) {
    const userId = req.user.id;
    const result = await this.booklistService.followedBooklist(userId);
    return result;
  }

  @Get('/booklistInfo/:booklistId')
  async booklistInfo(@Param('booklistId') booklist_id: string) {
    const result = await this.booklistService.booklistInfo(+booklist_id);
    return result;
  }

  @Get('/booksfromBooklist/:booklistId')
  async booksfromBooklist(@Param('booklistId') booklist_id: number) {
    const result = await this.booklistService.booksfromBooklist(booklist_id);
    return result;
  }

  @Get('/ownerBooklist')
  async checkOwnerBooklist(@Request() req) {
    const userId = req.user.id;
    const result = await this.booklistService.checkOwnerBooklist(userId);
    return result;
  }

  @Get('/userBooklist/:id')
  async checkUserBooklist(@Param('id') id:string) {
    const result = await this.booklistService.checkUserBooklist(+id);
    return result;
  }

  @Post('followOrUnfollowBooklist/:booklistId')
  async followOrUnfollowBooklist(
    @Request() req,
    @Param('booklistId') booklist_id: number,
  ) {
    const userId = req.user.id;
    const check = await this.booklistService.checkIfFollowed(
      userId,
      booklist_id,
    );
    if (check.length == 0) {
      const result = await this.booklistService.followBooklist(
        userId,
        booklist_id,
      );
      return result;
    } else {
      const result = await this.booklistService.unfollowBooklist(
        userId,
        booklist_id,
      );
      return result;
    }
  }

  @Patch('/removeBookFromBookList/:id/:bookId')
  async removeBookFromBooklist(
    @Param('id') booklist_id: number,
    @Param('bookId') bookId: number,
  ) {
    const result = await this.booklistService.removeBookFromBooklist(
      booklist_id,
      bookId,
    );
    return result;
  }

  @Patch('/removeBookList/:id')
  async removeBooklist(@Param('id') booklist_id: number) {
    const result = await this.booklistService.removeBooklist(booklist_id);
    return result;
  }
}

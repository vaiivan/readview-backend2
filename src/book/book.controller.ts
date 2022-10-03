import {
  Controller,
  Get,
  Request,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { Chance } from 'chance';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookService } from './book.service';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // get the top 5
  // -------------------------------------------------------------------------------------------------------------------

  //get the latest published
  @Get('latest')
  async findLatest() {
    const result = await this.bookService.findlatest3();
    return result;
  }

  //get the top 5 ranking
  @Get('rankingTop5')
  async findByRanking() {
    const result = await this.bookService.findByRanking();
    return result;
  }

  //get the book with most read
  @Get('mostread')
  async findByMostRead() {
    const result = await this.bookService.findByMostRead();
    return result;
  }

  //get the book with most want
  @Get('mostwant')
  async findByMostWant() {
    const result = await this.bookService.findByMostWant();
    return result;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get single book
  // -------------------------------------------------------------------------------------------------------------------

  // get active book info for book profile
  @Get('setProfile/:bookId')
  async setProfile(@Request() req, @Param('bookId') bookId: string) {
    const userId = req.user.id;
    const bookInfo = await this.bookService.findOneBookById(+bookId, +userId);
    return bookInfo[0];
  }

  // get Top 3 book quotes
  @Get('topQuotes/:id')
  async getTopQuotes(@Param('id') id: string) {
    const res = await this.bookService.getQuotes(+id);
    const quotes = [];
    for (let quote of res) {
      quotes.push(quote['content']);
    }
    return quotes;
  }

  // get Rating info
  @Get('fullRating/:bookId')
  async getFullRating(@Param('bookId') bookId: string) {
    const ratingInfo = {};
    const resRatingNum = await this.bookService.getRatingNum(+bookId);
    const resAvgRate = await this.bookService.getAvgRate(+bookId);
    const resRateFive = await this.bookService.getRateFive(+bookId);
    const resRateFour = await this.bookService.getRateFour(+bookId);
    const resRateThree = await this.bookService.getRateThree(+bookId);
    const resRateTwo = await this.bookService.getRateTwo(+bookId);
    const resRateOne = await this.bookService.getRateOne(+bookId);
    const resReadNumOfActiveBook = await this.bookService.readNumOfActiveBook(
      +bookId,
    );
    const resReadingNumOfActiveBook =
      await this.bookService.readingNumOfActiveBook(+bookId);
    const resSavedNumOfActiveBook = await this.bookService.savedNumOfActiveBook(
      +bookId,
    );

    ratingInfo['numOfRatings'] = +resRatingNum[0]['count'];
    ratingInfo['rating'] = +resAvgRate[0]['avg'];
    ratingInfo['fiveStarsNum'] = +resRateFive[0]['count'];
    ratingInfo['fourStarsNum'] = +resRateFour[0]['count'];
    ratingInfo['threeStarsNum'] = +resRateThree[0]['count'];
    ratingInfo['twoStarsNum'] = +resRateTwo[0]['count'];
    ratingInfo['oneStarNum'] = +resRateOne[0]['count'];
    ratingInfo['readNum'] = +resReadNumOfActiveBook[0]['count'];
    ratingInfo['readingNum'] = +resReadingNumOfActiveBook[0]['count'];
    ratingInfo['savedNum'] = +resSavedNumOfActiveBook[0]['count'];

    return ratingInfo;
  }

  @Patch('saveBookStatus/:bookId/:status')
  async saveBook(
    @Param('bookId') bookId: string,
    @Request() req,
    @Param('status') status: string,
  ) {
    let desiredStatus = status;
    if (status == 'save') {
      desiredStatus = 'want to read';
    }

    const userId = req.user.id;
    // check current status
    const resStatus =
      await this.bookService.findUserReadingStatusOfSpecificBook(
        +bookId,
        +userId,
      );

    if (resStatus ==  desiredStatus || desiredStatus == 'null') {
      const res = await this.bookService.unsaveBook(+userId, +bookId);
      return res;
    } else if (resStatus == 'unread') {
      const res = await this.bookService.newReadStatus(
        +userId,
        +bookId,
        desiredStatus,
      );
      return res;
    } else {
      const res = await this.bookService.changeReadingStatus(
        +userId,
        +bookId,
        desiredStatus,
      );

      return res;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Main Ranking
  // -------------------------------------------------------------------------------------------------------------------

  @Get('getTopBooks')
  async getTopBooks() {
    const res = await this.bookService.getTopBooks();
    return res;
  }
}

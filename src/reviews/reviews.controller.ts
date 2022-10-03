import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    const userId = req.user.id;
    const result = await this.reviewsService.createReview(
      userId,
      createReviewDto,
    );
    return result;
  }

  @Get('/user')
  async findAllByCurrentUserId(@Request() req) {
    const id = req.user.id
    const result = await this.reviewsService.findAllReviewsById('user',+id);
    return result;
  }

  @Get('/user/:id')
  async findAllByUserId(@Param('id') id: string) {
    const result = await this.reviewsService.findAllReviewsById('user',+id);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = this.reviewsService.findOneReviewById(+id);
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewsService.updateReview(+id, updateReviewDto);
    return result;
  }

  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    const result = await this.reviewsService.deactivateReview(+id);
    return result;
  }

  @Post('rating/:id/:rating')
  async addRating(
    @Request() req,
    @Param('id') bookId: number,
    @Param('rating') rating: number,
  ) {
    const userId = req.user.id;
    const check = await this.reviewsService.checkRatingRecord(userId, bookId);

    if (check.length == 0) {
      const result = await this.reviewsService.addRating(
        userId,
        bookId,
        rating,
      );
      return result;
    } else {
      const result = await this.reviewsService.updateRating(
        userId,
        bookId,
        rating,
      );
      return result;
    }
  }

  @Get('3review/:id')
  async get3Reviews(@Param('id') bookId: number) {
    const result = await this.reviewsService.get3Reviews(bookId);
    return result;
  }

  @Get('allreview/:id')
  async getAllReviews(@Param('id') bookId: number) {
    const result = await this.reviewsService.getAllReviews(bookId);
    return result;
  }


}

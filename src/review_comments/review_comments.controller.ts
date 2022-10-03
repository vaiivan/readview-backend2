import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReviewCommentsService } from './review_comments.service';
import { CreateReviewCommentDto } from './dto/create-review_comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review_comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('review-comments')
export class ReviewCommentsController {
  constructor(private readonly reviewCommentsService: ReviewCommentsService) {}

  @Post()
  async create(@Request() req, @Body() createReviewCommentDto: CreateReviewCommentDto) {
    const userId = req.user.id
    const result = await this.reviewCommentsService.createComment(userId,createReviewCommentDto)
    return result;
  }

  @Get('bookreview/:id')
  async findAllByBookreviewId(@Param('id') id:string) {
    const result = await this.reviewCommentsService.findById('bookreview',+id)
    return result
  }

  @Get('user/:id')
  async findAllByUserId(@Param('id') id:string) {
    const result = await this.reviewCommentsService.findById('user',+id)
    return result
  }

  @Get(':id')
  async findSpecificComment(@Param('id') id: string) {
    const result = await this.reviewCommentsService.findById('comment',+id);
    return result
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewCommentDto: UpdateReviewCommentDto) {
    const result = this.reviewCommentsService.update(+id, updateReviewCommentDto)
    return result;
  }

  @Delete(':id')
  async deactivateComment(@Param('id') id: string) {
    const result = await this.reviewCommentsService.deactivateComment(+id)
    return result;
  }
}

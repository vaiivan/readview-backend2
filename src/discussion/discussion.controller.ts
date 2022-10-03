import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Logger,
  Query,
} from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import {
  AddCommentDto,
  CreateDiscussionDto,
} from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}
  private readonly logger = new Logger(DiscussionService.name);

  @Post('create')
  create(@Body() createDiscussionDto: CreateDiscussionDto, @Request() req) {
    const userId = req.user.id;
    return this.discussionService.create(+userId, createDiscussionDto);
  }

  @Get('discussionLead/:discussionId')
  discussionLead(@Param('discussionId') discussionId: number) {
    const result = this.discussionService.discussionLead(discussionId);
    return result;
  }

  @Get('discussionComments/:discussionId')
  discussionComments(@Param('discussionId') discussionId: number) {
    const result = this.discussionService.discussionComments(discussionId);
    return result;
  }

  @Get('allDiscussion')
  allDiscussion(@Query('page') page:string) {
    return this.discussionService.allDiscussion(+page);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscussionDto: UpdateDiscussionDto,
  ) {
    return this.discussionService.update(+id, updateDiscussionDto);
  }

  // LIKE FUNCTIONS

  @Post('like/:discussionId/')
  like(@Param('discussionId') discussionId: string, @Request() req) {
    const userId = req.user.id;

    return this.discussionService.like(+discussionId, +userId);
  }

  @Patch('removeLikeUnlike/:discussionId')
  removeLikeUnlike(
    @Param('discussionId') discussionId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.discussionService.removeLikeUnlike(+discussionId, +userId);
  }

  @Post('unlike/:discussionId/')
  unlike(@Param('discussionId') discussionId: string, @Request() req) {
    const userId = req.user.id;
    return this.discussionService.unlike(+discussionId, +userId);
  }

  @Get('checkStatus/:discussionId')
  checkStatus(@Param('discussionId') discussionId: string, @Request() req) {
    const userId = req.user.id;

    return this.discussionService.checkStatus(+discussionId, +userId);
  }

  @Post('addComment/:discussionId')
  addComment(
    @Param('discussionId') discussionId: string,
    @Request() req,
    @Body() addCommentDto: AddCommentDto,
  ) {
    const userId = req.user.id;

    return this.discussionService.addComment(
      +userId,
      addCommentDto,
      +discussionId,
    );
  }
}

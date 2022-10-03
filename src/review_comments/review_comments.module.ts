import { Module } from '@nestjs/common';
import { ReviewCommentsService } from './review_comments.service';
import { ReviewCommentsController } from './review_comments.controller';

@Module({
  controllers: [ReviewCommentsController],
  providers: [ReviewCommentsService]
})
export class ReviewCommentsModule {}

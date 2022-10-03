import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewCommentDto } from './create-review_comment.dto';

export class UpdateReviewCommentDto extends PartialType(CreateReviewCommentDto) {
    content:string;
}

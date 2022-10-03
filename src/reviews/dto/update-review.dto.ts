import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    content:string;
    privateStatus: boolean;
    spoiler:boolean;
    active:boolean;
}

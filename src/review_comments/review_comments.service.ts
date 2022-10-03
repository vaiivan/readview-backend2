import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateReviewCommentDto } from './dto/create-review_comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review_comment.dto';

@Injectable()
export class ReviewCommentsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  // -------------------------------------------------------------------------------------------------------------------
  // create Comment
  // -------------------------------------------------------------------------------------------------------------------

  async createComment(
    userId: number,
    createReviewCommentDto: CreateReviewCommentDto,
  ) {
    try {
      const { book_review_id, content } = createReviewCommentDto;
      await this.knex('book_review_comment').insert([
        {
          user_id: userId,
          book_review_id: book_review_id,
          content: content,
        },
      ]);
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // find the comment by id
  // -------------------------------------------------------------------------------------------------------------------

  async findById(type: string, id: number) {
    try {
      let column;
      if (type == 'bookreview') {
        column = 'book_review_id';
      } else if (type == 'user') {
        column = 'user_id';
      } else if (type == 'comment') {
        column = 'id';
      }

      const result = await this.knex('book_review_comment')
        .select('*')
        .where(column, id)
        .where('active', true);
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // updating the  Comment
  // -------------------------------------------------------------------------------------------------------------------

  async update(id: number, updateReviewCommentDto: UpdateReviewCommentDto) {
    try {
      const { content } = updateReviewCommentDto;
      await this.knex('book_review_comment')
        .update({
          content: content,
        })
        .where('id', id);
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // deactivating the  Comment
  // -------------------------------------------------------------------------------------------------------------------

  async deactivateComment(id: number) {
    try {
      await this.knex('book_review_comment')
        .update({
          active: false,
        })
        .where('id', id);
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }
}

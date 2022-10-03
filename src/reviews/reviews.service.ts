import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  // -------------------------------------------------------------------------------------------------------------------
  // create Review
  // -------------------------------------------------------------------------------------------------------------------

  async createReview(userId: number, createReviewDto: CreateReviewDto) {
    try {
      let { book_id, content, privateStatus, spoiler } = createReviewDto;

      await this.knex('book_review').insert([
        {
          user_id: +userId,
          book_id: +book_id,
          content: content,
          private: privateStatus,
          spoiler: spoiler,
        },
      ]);
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // find all Review by book id
  // -------------------------------------------------------------------------------------------------------------------

  async findAllReviewsById(type: string, id: number) {
    try {
      let column;
      if (type == 'book') {
        column = 'book_id';
      } else if (type == 'user') {
        column = 'user_id';
      }

      const result = await this.knex('book_review')
        .select('*')
        .where(column, id)
        .where('private', false)
        .where('active', true);
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // find one specific review
  // -------------------------------------------------------------------------------------------------------------------

  async findOneReviewById(id: number) {
    try {
      const result = await this.knex('book_review')
        .select('*')
        .where('id', id)
        .where('active', true);
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // update review
  // -------------------------------------------------------------------------------------------------------------------

  async updateReview(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const { content, privateStatus, spoiler, active } = updateReviewDto;
      await this.knex('book_review')
        .update({
          content: content,
          private: privateStatus,
          spoiler: spoiler,
          active: active,
        })
        .where('id', id);

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // deactivate review
  // -------------------------------------------------------------------------------------------------------------------

  async deactivateReview(id: number) {
    try {
      await this.knex('book_review')
        .update({
          active: false,
        })
        .where('id', id);
      return [{ status: 200, message: 'Success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async checkRatingRecord(userId: number, bookId: number) {
    try {
      const result = await this.knex.raw(
        `
        select rating, user_id, book_id from user_book where user_id = ? and book_id = ?
      `,
        [userId, bookId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async addRating(userId: number, bookId: number, rating: number) {
    try {
      await this.knex.raw(
        `
        insert into user_book (user_id, book_id, rating, reading_status, created_at, updated_at) values (?, ?, ?, 'read', now(), now())
      `,
        [userId, bookId, rating],
      );

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async updateRating(userId: number, bookId: number, rating: number) {
    try {
      await this.knex.raw(
        `
        update user_book set rating = ?, updated_at = now() where user_id = ? and book_id = ?
      `,
        [rating, userId, bookId],
      );

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async get3Reviews(bookId: number) {
    try {
      const result = await this.knex.raw(
        `
        select x.*, ub.rating from 
        (select users.id as user_id, book_review.spoiler, users.username, book_id, book_review.content, 
        book_review.updated_at, users.profile_picture from book_review 
        inner join users on book_review.user_id = users.id
        where book_id  = ?) as x 
        left join user_book as ub on x.user_id = ub.user_id 
        and ub.book_id = ? 
        order by updated_at desc limit 3
        `,
        [bookId, bookId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getAllReviews(bookId: number) {
    try {
      const result = await this.knex.raw(
        `
        select x.*, ub.rating from 
        (select users.id as user_id, book_review.spoiler, users.username, book_id, book_review.content, book_review.id,
        book_review.updated_at, users.profile_picture from book_review 
        inner join users on book_review.user_id = users.id
        where book_id  = ?) as x 
        left join user_book as ub on x.user_id = ub.user_id 
        and ub.book_id = ? 
        order by updated_at desc
        `,
        [bookId, bookId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }
}

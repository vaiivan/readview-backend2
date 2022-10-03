import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UserInteractionService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  async getList(type: string, userId: number, pageNo:number) {
    try {
      let page = pageNo * 20
      let status;
      if (type == 'read') {
        status = 'read';
      } else if (type == 'reading') {
        status = 'reading';
      } else if (type == 'want') {
        status = 'want to read';
      }

      const result = await this.knex.raw(
        `select x.* from (
          select distinct user_book.reading_status as readerStatus, book.id, book.isbn, book.title, book.book_picture, book.info, author.author_name, avg(user_book.rating) as rating, 
          publish_date, array_agg(distinct genre_name) as genre, publisher_name, pages, user_book.updated_at from book 
          inner join author_book on book.id = author_book.book_id 
          inner join author on author_book.author_id = author.id 
          inner join user_book on book.id = user_book.book_id
          inner join book_genre on book.id = book_genre.book_id 
          inner join genre on book_genre.genre_id = genre.id
          inner join book_publisher on book.id = book_publisher.book_id
          inner join publisher on book_publisher.publisher_id = publisher.id
          where user_book.user_id = ? and user_book.reading_status = ?
          group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, book.id, publisher_name, pages,user_book.reading_status, user_book.updated_at 
          order by user_book.updated_at desc)
          as x limit 20 offset ?`,
        [userId, status, page]
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async getRecent(userId: number) {
    try {
      const result = await this.knex.raw(
        `select x.* from (
          select distinct book.id, book.book_picture, user_book.updated_at from book 
          inner join user_book on book.id = user_book.book_id
          inner join book_publisher on book.id = book_publisher.book_id
          where user_book.user_id = ? and user_book.reading_status = 'read'
          group by book.book_picture, book.id, user_book.updated_at
          order by user_book.updated_at desc)
          as x limit 3`,
        [userId]
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async recommendation(id: number) {
    try {
      const result = await this.knex.raw(
        `select x.*, ub.reading_status,ub.rating as user_rating from 
        (select book.id, book.isbn, book.title, book.book_picture, book.info, author.author_name, avg(user_book.rating) as Ave_rating, 
        publish_date, array_agg(distinct genre_name) as genre_name, publisher_name, pages from book 
        inner join author_book on book.id = author_book.book_id 
        inner join author on author_book.author_id = author.id 
        inner join user_book on book.id = user_book.book_id
        inner join book_genre on book.id = book_genre.book_id 
        inner join genre on book_genre.genre_id = genre.id
        inner join book_publisher on book.id = book_publisher.book_id
        inner join publisher on book_publisher.publisher_id = publisher.id
        group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, 
        book.id, publisher_name, pages) as x
        left join user_book as ub on x.id = ub.book_id 
        and ub.user_id = ? 
        group by x.isbn, x.title, x.book_picture, x.info, x.author_name, x.publish_date, 
        x.id, x.publisher_name, x.pages, ub.reading_status, x.Ave_rating, x.genre_name, ub.rating
        having reading_status is null and ub.rating is null
        order by random() limit 10`,
        [id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

}

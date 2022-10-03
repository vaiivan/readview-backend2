import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UserVictoryDataService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  async getUserRating(userId: number) {
    try {
      const result = await this.knex.raw(
        `select rating, CAST (count(rating) as INT) from users inner join user_book on users.id = user_book.user_id where users.id = ? group by rating;`,
        [userId],
      );
      let ratings = result.rows;
      let allRatingRecord = [];
      for (let rating of ratings) {
        allRatingRecord.push(rating.rating);
      }
      if (
        (allRatingRecord.length == 1 && allRatingRecord[0] == null) ||
        allRatingRecord.length == 0
      ) {
        return [];
      }
      if (!allRatingRecord.includes(10)) {
        ratings.push({ rating: 10, count: 0 });
      }
      if (!allRatingRecord.includes(8)) {
        ratings.push({ rating: 8, count: 0 });
      }
      if (!allRatingRecord.includes(6)) {
        ratings.push({ rating: 6, count: 0 });
      }
      if (!allRatingRecord.includes(4)) {
        ratings.push({ rating: 4, count: 0 });
      }
      if (!allRatingRecord.includes(2)) {
        ratings.push({ rating: 2, count: 0 });
      }
      return ratings;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getUserGenre(userId: number) {
    try {
      const result = await this.knex.raw(
        `select genre_name, CAST(count(book.title) as INT) from users inner join user_book on users.id = user_book.user_id
      inner join book on user_book.book_id = book.id 
      inner join book_genre on book.id = book_genre.book_id 
      inner join genre on book_genre.genre_id = genre.id
      where users.id = ? and user_book.reading_status = 'read' and users.active = true
      group by genre_name order by count(book.title) desc limit 10
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getUserReadingTimeline(userId: number) {
    try {
      const result = await this.knex.raw(
        `select date_trunc('year', user_book.created_at), cast (count(book_id) as INT) from users inner join user_book on users.id = user_book.user_id 
        where users.id = ? group by date_trunc('year', user_book.created_at), user_book.reading_status, users.id
        having reading_status = 'read'        
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getUserAuthor(userId: number) {
    try {
      const result = await this.knex.raw(
        `select author_name, cast (count(author_name) as INT) from users inner join user_book on users.id = user_book.user_id
        inner join book on user_book.book_id = book.id 
        inner join author_book on book.id = author_book.book_id 
        inner join author on author_book.author_id = author.id
        where users.id = ? and user_book.reading_status = 'read'
        group by author_name order by count(author_name) desc limit 10        
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getUserFiction(userId: number) {
    try {
      const result = await this.knex.raw(
        ` select z.*, round((z.nonfiction/z.total*100)) as nonfictionratio, round((z.fiction/z.total*100)) as fictionratio from
        (select y.*, (y.nonfiction + y.fiction) as total from
        (select sum(case when x.genre_name <> 'Fiction' then x.count else 0 end) as Nonfiction, 
        sum(case when x.genre_name = 'Fiction' then x.count else 0 end) as fiction from 
        (select genre.genre_name, count(genre), reading_status from users 
        inner join user_book on users.id = user_book.user_id
        inner join book on user_book.book_id = book.id 
        inner join book_genre on book.id = book_genre.book_id 
        inner join genre on book_genre.genre_id = genre.id
        where users.id = ? and reading_status = 'read'
        group by genre,reading_status, genre.genre_name 
        order by count(genre) desc limit 8
        ) as x 
        ) as y)
        as z      
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }
}

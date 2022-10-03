import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { now } from 'moment';

@Injectable()
export class BookService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  // -------------------------------------------------------------------------------------------------------------------
  // find books with ranking
  // -------------------------------------------------------------------------------------------------------------------

  //find the top 3 latest published book
  async findlatest3() {
    try {
      const result = await this.knex.raw(
        'select id, book_picture from book order by publish_date desc limit 3;',
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 200, message: 'Internal Server Error' }];
    }
  }

  //find ranking top 5
  async findByRanking() {
    try {
      const result = await this.knex.raw(
        `SELECT avg(user_book.rating), book_id, book.title, book.book_picture, count(user_book.rating)
        FROM user_book INNER JOIN book ON book.id = user_book.book_id 
        GROUP BY user_book.reading_status,book_id, book.title, book.book_picture 
        having count(user_book.rating) > 50
        order by avg(user_book.rating) desc Limit 5`,
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 200, message: 'Internal Server Error' }];
    }
  }

  //find most read top 5
  async findByMostRead() {
    try {
      const result = await this.knex.raw(
        `SELECT count(user_book.reading_status), book_id, book.title, book.book_picture, user_book.reading_status
        FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'read' 
        GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
        order by count(user_book.reading_status) desc Limit 5`,
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 200, message: 'Internal Server Error' }];
    }
  }

  //find most want to read top 5
  async findByMostWant() {
    try {
      const result = await this.knex.raw(
        `SELECT count(user_book.reading_status), book_id, book.title, book.book_picture, user_book.reading_status
        FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'want to read' 
        GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
        order by count(user_book.reading_status) desc Limit 5`,
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 200, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // find a specific book with id
  // -------------------------------------------------------------------------------------------------------------------

  async findOneBookById(bookId: number, userId: number) {
    try {
      const result = await this.knex.raw(
        `select ub.reading_status as readerStatus, x.* from (
          select distinct book.id, book.isbn, book.title, book.book_picture, book.info, author.author_name,author.id as author_id, avg(user_book.rating) as rating, 
          publish_date, array_agg(distinct genre_name) as genre, publisher_name, pages from book 
          inner join author_book on book.id = author_book.book_id 
          inner join author on author_book.author_id = author.id 
          inner join user_book on book.id = user_book.book_id
          inner join book_genre on book.id = book_genre.book_id 
          inner join genre on book_genre.genre_id = genre.id
          inner join book_publisher on book.id = book_publisher.book_id
          inner join publisher on book_publisher.publisher_id = publisher.id
          where book.id = ? group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, book.id, publisher_name, pages ,author.id)
          as x 
          left outer join user_book as ub on x.id = ub.book_id
          and ub.user_id = ?; `,
        [bookId, userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get genre by book id
  // -------------------------------------------------------------------------------------------------------------------
  async getBookGenre(id: number) {
    try {
      const result = await this.knex
        .select('genre_name')
        .from('book')
        .innerJoin('book_genre', 'book_id', '=', 'book.id')
        .innerJoin('genre', 'genre_id', '=', 'genre.id')
        .where('book.id', id);
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // find the book ranking and ranking data
  // -------------------------------------------------------------------------------------------------------------------

  async findOneBookRanking(id: number) {
    try {
      const result = await this.knex.raw(
        `SELECT avg(user_book.rating), book_id, count(user_book.reading_status), user_book.reading_status
        FROM book INNER JOIN user_book ON book.id = user_book.book_id WHERE book.id = ?
        GROUP BY user_book.reading_status,book_id, book.title, book.book_picture`,
        [id],
      );

      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async findOneBookRating(id: number) {
    try {
      const result = await this.knex.raw(
        `SELECT avg(user_Book.rating) FROM user_book WHERE book_id=? `,
        [id],
      );

      if (result.rowCount == 0) {
        return undefined;
      }

      const conversion = Math.round((parseInt(result.rows[0]['avg']) / 10) * 5);

      return conversion;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getTopBooks() {
    try {
      const results = await this.knex.raw(
        `(select cast (null as bigint) as toprated, (cast (count(user_id) as INT)) as mostread, cast (null as bigint) as mostcomment,  book_picture, book.title, book.id from user_book inner join book on user_book.book_id = book.id where reading_status = 'read' group by book.id, book_picture order by mostread desc limit 3) union (select cast (avg(rating) as INT) as toprated, cast (null as bigint) as mostread, cast (null as bigint) as mostcomment, book_picture,book.title, book.id from user_book inner join book on user_book.book_id = book.id group by book.id, user_book.rating, book_picture having user_book.rating is not null order by toprated desc limit 3) union (select cast(null as bigint) as toprated, cast(null as bigint) as mostread, cast (count(user_id) as INT) as mostcomment, book_picture, book.title, book.id from book_review inner join book on book_review.book_id = book.id group by book.id, book_picture order by mostcomment desc limit 3)`,
        [],
      );

      let categories = ['toprated', 'mostread', 'mostcomment'];

      for (let i = 0; i < 9; i++) {
        for (let category of categories) {
          if (results.rows[i][category] != null) {
            results.rows[i][category] = parseInt(results.rows[i][category]);
          }
        }
      }
      return results.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // read status
  // -------------------------------------------------------------------------------------------------------------------

  async findUserReadingStatusOfSpecificBook(bookId: number, userId: number) {
    try {
      const result = await this.knex.raw(
        `SELECT reading_status from user_book WHERE book_id=? AND user_id=?`,
        [bookId, userId],
      );

      if (result.rowCount == 0 || result['rows'][0]['reading_status'] == null) {
        return 'unread';
      }
      const status = result['rows'][0]['reading_status'];
      return status;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async readNumOfActiveBook(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('reading_status', 'read');
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 200, message: 'Internal Server Error' }];
    }
  }

  async readingNumOfActiveBook(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('reading_status', 'reading');
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async savedNumOfActiveBook(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('reading_status', 'want to read');
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async changeReadingStatus(userId: number, bookId: number, status: string) {
    try {
      await this.knex.raw(
        `UPDATE user_book SET reading_status=? ,updated_at = NOW() WHERE user_id=? AND book_id=?`,
        [status, userId, bookId],
      );
      return [{ status: 200, message: 'ok' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async unsaveBook(userId: number, bookId: number) {
    try {
      await this.knex.raw(
        `DELETE FROM user_book WHERE user_id=? AND book_id=?`,
        [userId, bookId],
      );
      return [{ status: 200, message: 'ok' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async newReadStatus(userId: number, bookId: number, desiredStatus: string) {
    try {
      await this.knex
        .insert({
          user_id: userId,
          book_id: bookId,
          reading_status: desiredStatus,
        })
        .into('user_book');
      return [{ status: 200, message: 'ok' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // quotes
  // -------------------------------------------------------------------------------------------------------------------

  async getQuotes(id: number) {
    try {
      const result = await this.knex.raw(
        `SELECT content FROM book_quote WHERE book_id=? LIMIT 3`,
        [id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Ratings
  // -------------------------------------------------------------------------------------------------------------------

  async getRatingNum(bookId: number) {
    try {
      const res = await this.knex.raw(
        `SELECT COUNT(*) FROM user_book WHERE book_id=? AND rating IS NOT NULL`,
        [bookId],
      );
      return res.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getAvgRate(bookId: number) {
    try {
      const res = await this.knex
        .avg('rating')
        .from('user_book')
        .where('book_id', bookId);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getRateFive(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('rating', 10);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getRateFour(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('rating', 8);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getRateThree(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('rating', 6);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getRateTwo(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('rating', 4);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async getRateOne(bookId: number) {
    try {
      const res = await this.knex
        .count('*')
        .from('user_book')
        .where('book_id', bookId)
        .where('rating', 2);
      return res;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }
}

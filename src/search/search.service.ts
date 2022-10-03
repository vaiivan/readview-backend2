import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class SearchService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  // -------------------------------------------------------------------------------------------------------------------
  // get all genres
  // -------------------------------------------------------------------------------------------------------------------
  async getAllGenre() {
    try {
      const result = await this.knex.select('id', 'genre_name').from('genre');
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async searchByGenres(query: string) {
    try {
      const result = await this.knex.raw(
        `
      select book.title, book.book_picture, book.isbn,book.info,genre.genre_name from book inner join book_genre on book.id = book_genre.id 
      inner join genre on book_genre.genre_id = genre.id where genre.genre_name ilike ? order by genre.genre_name 
      `,
        ['%' + query + '%'],
      );
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async searchBookByTitle(query: string, userId: number, pageNo) {
    try {
      let offestNum = pageNo * 10;
      const result = await this.knex.raw(
        `select ub.reading_status as readerstatus, x.* from (
          select distinct book.id, book.isbn, book.title, book.book_picture, book.info, 
          author.author_name, avg(user_book.rating) as rating, 
          publish_date, array_agg(distinct genre_name) as genre_name, publisher_name, pages from book 
          inner join author_book on book.id = author_book.book_id 
          inner join author on author_book.author_id = author.id 
          inner join user_book on book.id = user_book.book_id
          inner join book_genre on book.id = book_genre.book_id 
          inner join genre on book_genre.genre_id = genre.id
          inner join book_publisher on book.id = book_publisher.book_id
          inner join publisher on book_publisher.publisher_id = publisher.id
          where book.title ilike ? group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, 
          book.id, publisher_name, pages)
          as x 
          left outer join user_book as ub on x.id = ub.book_id
          and ub.user_id = ? limit 10 offset ?`,
        ['%' + query + '%', userId, offestNum],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async searchBookByISBN(query: string, userId: number, pageNo) {
    try {
      let offestNum = pageNo * 10;
      const result = await this.knex.raw(
        `select ub.reading_status as readerstatus, x.* from (
    select distinct book.id, book.isbn, book.title, book.book_picture, book.info, 
    author.author_name, avg(user_book.rating) as rating, 
    publish_date, array_agg(distinct genre_name) as genre_name, publisher_name, pages from book 
    inner join author_book on book.id = author_book.book_id 
    inner join author on author_book.author_id = author.id 
    inner join user_book on book.id = user_book.book_id
    inner join book_genre on book.id = book_genre.book_id 
    inner join genre on book_genre.genre_id = genre.id
    inner join book_publisher on book.id = book_publisher.book_id
    inner join publisher on book_publisher.publisher_id = publisher.id
    where isbn ilike ? group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, 
    book.id, publisher_name, pages)
    as x 
    left outer join user_book as ub on x.id = ub.book_id
    and ub.user_id = ? limit 10 offset ?;`,
        ['%' + query + '%', userId, offestNum],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async searchByAuthors(search: string, pageNo: number) {
    try {
      let page = pageNo * 10;
      const result = await this.knex.raw(
        `
        select (array_agg(distinct book.id))[1:6] as bookIds, 
        author_name, author.id,(array_agg(distinct isbn))[1:6], 
        (array_agg(distinct book_picture))[1:6] as bookpictures,
        array_agg(distinct genre_name) as genres, 
        (cast (count(distinct user_author.user_id) as int) )as numoffollowers from author 
        left join author_book on author.id = author_book.author_id 
        left join book on author_book.book_id = book.id 
        left join user_author on author.id = user_author.author_id 
        left join users on user_author.user_id = users.id 
        left join book_genre on book_genre.book_id = book.id 
        left join genre on book_genre.genre_id = genre.id 
        where author_name ilike ? 
        group by author_name,author.id limit 10 offset ? 
      `,
        ['%' + search + '%', page],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async searchByUser(query: string, pageNo: number) {
    try {
      let page = pageNo * 10
      const result = await this.knex.raw(
        `select users.id, users.username, users.gender,
        users.profile_picture, users.info, users.level, cast (count(follower_user_id) as INT), users.created_at from user_user 
        full join users on user_user.to_be_followed_user_id = users.id 
        where users.username ilike ? and users.active = true 
        group by users.id,users.username, users.gender,users.profile_picture, users.info, users.level, users.created_at
        order by users.created_at desc limit 10 offset ?`,
        ['%' + query + '%', page],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'Internal Server Error' }];
    }
  }

  async booklistBySearch(query: string, pageNo: number) {
    try {
      let page = pageNo * 10;
      const result = await this.knex.raw(
        `select distinct booklist.title, booklist_creator_id, booklist.private, booklist.id, booklist.active, array_agg(distinct genre_name) as genre, 
        count(distinct user_follow_booklist.user_id) as NumOfFollowers, 
        array_agg(distinct book.book_picture) as book_picture,array_agg(distinct book.id) as book_id from booklist 
        left join booklist_book on booklist.id = booklist_book.booklist_id 
        left join book on booklist_book.book_id = book.id 
        left join book_genre on book.id = book_genre.book_id 
        left join genre on book_genre.genre_id = genre.id
        left join user_follow_booklist on booklist.id = user_follow_booklist.follow_booklist_id 
        left join users on booklist.booklist_creator_id = users.id
        where booklist.title ilike ? and booklist.private is false and booklist.active is true
        group by booklist.title, booklist_creator_id, booklist.id, booklist.private, booklist.active
        order by NumOfFollowers desc limit 10 offset ?
        `,
        ['%' + query + '%', page],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }
}

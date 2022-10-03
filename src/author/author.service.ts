import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  async author(authorId: number) {
    try {
      const result = await this.knex.raw(
        `
      select (array_agg(distinct book.id))[1:6] as bookIds, author_name, author.id, (array_agg(distinct isbn))[1:6], (array_agg(distinct book_picture))[1:6] as bookpictures,array_agg(distinct genre_name) as genres, 
      (cast (count(distinct user_author.user_id) as int)) as numoffollowers from author 
      left join author_book on author.id = author_book.author_id 
      left join book on author_book.book_id = book.id 
      left join user_author on author.id = user_author.author_id 
      left join users on user_author.user_id = users.id 
      left join book_genre on book_genre.book_id = book.id 
      left join genre on book_genre.genre_id = genre.id 
      where author.id = ? 
      group by author_name, author.id
      `,
        [authorId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async checkfollow(authorId: number, userId:number) {
    try {
      const result = await this.knex('user_author').select('id').where('user_id', userId).where('author_id', authorId)
      return result;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async authorBooklist(authorId: number, userId: number){
    try{
      const result = await this.knex.raw(
        `
        select ub.reading_status, x.* from (
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
          where author_id = ? group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, 
          book.id, publisher_name, pages)
          as x 
          left outer join user_book as ub on x.id = ub.book_id
          and ub.user_id = ?
        `,
        [authorId, userId]
      );

      return result.rows
    }catch(e){
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async searchAuthor(search: string) {
    try {
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
        group by author_name,author.id
      `,
        ['%' + search + '%'],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async followedAuthors(userId: number) {
    try {
      const result = await this.knex.raw(
        `select x.*, cast (count(ua.user_id) as INT) as followers from 
        (select (array_agg(distinct book.id))[1:6] as bookId, author_name,  author.id, 
        (array_agg(distinct book_picture))[1:6] as bookpictures, array_agg(distinct genre_name) as genres from author 
        inner join user_author on user_author.author_id = author.id 
        inner join author_book on author.id = author_book.author_id 
        inner join book on author_book.book_id = book.id 
        inner join book_genre on book.id = book_genre.book_id 
        inner join genre on book_genre.genre_id = genre.id 
        where user_author.user_id = ?
        group by author_name,author.id
        ) as x inner join user_author as ua on x.id = ua.author_id 
        group by x.bookid, x.author_name, x.genres, x.id, x.bookpictures
        `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async followAuthor(userId: number, authorId: number) {
    try {
      const result = await this.knex.raw(
        `insert into user_author (user_id, author_id, created_at, updated_at ) values (?, ?, now(), now() )`,
        [userId, authorId],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async unfollowAuthor(userId: number, authorId: number) {
    try {
      const result = await this.knex.raw(
        `delete from user_author where user_id = ? and author_id = ?`,
        [userId, authorId],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async getUserFollowedAuthorList(userId:number){
    try {
      const result = await this.knex.raw(
        `
        select (array_agg(distinct book.id))[1:6] as bookIds, user_author.updated_at,
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
        where users.id = ? 
        group by author_name,author.id,user_author.updated_at
        order by user_author.updated_at desc
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  
}

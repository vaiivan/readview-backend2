import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { use } from 'passport';
import {
  CreateBooklistDto,
  InsertBookIntoBooklistDto,
} from './dto/create-booklist.dto';
import { UpdateBooklistDto } from './dto/update-booklist.dto';

@Injectable()
export class BooklistService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private readonly logger = new Logger();

  async createBooklist(userId: number, createBooklistDto: CreateBooklistDto) {
    try {
      let { title, privateStatus } = createBooklistDto;
      await this.knex.raw(
        `
      insert into booklist (title, booklist_creator_id, private) 
      values 
      (?, ?, ?)
      `,
        [title, userId, privateStatus],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async addBookIntoBooklist(createBooklistDto: InsertBookIntoBooklistDto) {
    try {
      let { book_id, booklists } = createBooklistDto;
      for (const booklist of booklists) {
        if (booklist == 0){
          continue
        }
        await this.knex.raw(
          `
           insert into booklist_book (booklist_id, book_id) values (?, ?)
          `,
          [booklist, book_id[0]],
        );
      }

      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async checkBookInsideBooklist(bookId: number, booklistId: number) {
    try {
      const result = await this.knex('booklist_book')
        .select('*')
        .where('booklist_id', booklistId)
        .where('book_id', bookId);
      
      if(result.length != 0){
        return [{status: 200, result: true}]
      } else {
        return [{status: 200, result: false}]
      }

    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async booksfromBooklist(booklist_id: number) {
    try {
      const result = await this.knex.raw(
        `select distinct book.id, book.isbn, book.title, book.book_picture, book.info, 
        author.author_name, avg(user_book.rating) as rating, 
        publish_date, array_agg(distinct genre_name) as genre_name, publisher_name, pages from booklist 
        inner join booklist_book on booklist_book.booklist_id = booklist.id
        inner join book on booklist_book.book_id = book.id
        inner join book_genre on book_genre.book_id = book.id 
        inner join genre on book_genre.genre_id = genre.id
        inner join author_book on author_book.book_id = book.id 
        inner join author on author_book.author_id = author.id 
        inner join book_publisher on book.id = book_publisher.book_id 
        inner join publisher on book_publisher.publisher_id = publisher.id
        inner join user_book on user_book.book_id = book.id
        where booklist.id = ?
        group by book.isbn, book.title, book.book_picture, book.info, author.author_name, publish_date, book.id, publisher_name, pages
      `,
        [booklist_id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async followedBooklist(userId: number) {
    try {
      const result = await this.knex.raw(
        `
          select x.*, count(distinct ufb.user_id) as NumOfFollowers from 
          (select distinct booklist.title,booklist.updated_at, booklist_creator_id, booklist.private, booklist.id, array_agg(distinct book.isbn) as isbn, array_agg(distinct genre_name) as genre, 
          array_agg(distinct book.book_picture) as book_picture,array_agg(distinct book.id) as book_id from booklist 
          inner join booklist_book on booklist.id = booklist_book.booklist_id 
          inner join book on booklist_book.book_id = book.id 
          inner join book_genre on book.id = book_genre.book_id 
          inner join genre on book_genre.genre_id = genre.id
          inner join user_follow_booklist on booklist.id = user_follow_booklist.follow_booklist_id 
          inner join users on booklist.booklist_creator_id = users.id
          where user_follow_booklist.user_id = ? and booklist.private is false and booklist.active is true
          group by booklist.title, booklist_creator_id, booklist.id, booklist.private, booklist.updated_at)
          as x inner join user_follow_booklist as ufb on x.id = ufb.follow_booklist_id 
          group by x.title, x.booklist_creator_id, x.private, x.id, x.isbn, x.genre, x.book_picture, x.book_id, x.updated_at
          order by NumOfFollowers, x.updated_at desc 
      `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async checkOwnerBooklist(userId: number) {
    try {
      const result = await this.knex.raw(
        `select distinct booklist.id,booklist.updated_at, booklist.title, booklist_creator_id, booklist.private, booklist.id, array_agg(distinct genre_name) as genre, 
        count(distinct user_follow_booklist.user_id) as NumOfFollowers, 
        array_agg(distinct book.book_picture) as book_picture,array_agg(distinct book.id) as book_id from booklist 
        left join booklist_book on booklist.id = booklist_book.booklist_id 
        left join book on booklist_book.book_id = book.id 
        left join book_genre on book.id = book_genre.book_id 
        left join genre on book_genre.genre_id = genre.id
        left join user_follow_booklist on booklist.id = user_follow_booklist.follow_booklist_id 
        left join users on booklist.booklist_creator_id = users.id
        where booklist_creator_id = ? and booklist.active is true
        group by booklist.title, booklist_creator_id, booklist.id, booklist.private
        order by NumOfFollowers, booklist.updated_at desc 
        `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async checkUserBooklist(userId: number) {
    try {
      const result = await this.knex.raw(
        `select distinct booklist.id,booklist.updated_at, booklist.title, booklist_creator_id, booklist.private, booklist.id, array_agg(distinct genre_name) as genre, 
        count(distinct user_follow_booklist.user_id) as NumOfFollowers, 
        array_agg(distinct book.book_picture) as book_picture,array_agg(distinct book.id) as book_id from booklist 
        left join booklist_book on booklist.id = booklist_book.booklist_id 
        left join book on booklist_book.book_id = book.id 
        left join book_genre on book.id = book_genre.book_id 
        left join genre on book_genre.genre_id = genre.id
        left join user_follow_booklist on booklist.id = user_follow_booklist.follow_booklist_id 
        left join users on booklist.booklist_creator_id = users.id
        where booklist_creator_id = ? and booklist.active is true and booklist.private = false
        group by booklist.title, booklist_creator_id, booklist.id, booklist.private
        order by NumOfFollowers, booklist.updated_at desc 
        `,
        [userId],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async checkIfFollowed(userId: number, booklist_id: number) {
    try {
      const result = await this.knex.raw(
        `
        select * from user_follow_booklist where user_id = ? and follow_booklist_id = ?
      `,
        [userId, booklist_id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async followBooklist(userId: number, booklist_id: number) {
    try {
      await this.knex.raw(
        `
        insert into user_follow_booklist (user_id, follow_booklist_id, created_at, updated_at) values (?, ?, now(), now())
      `,
        [userId, booklist_id],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async booklistInfo(booklist_id: number) {
    try {
      const result = await this.knex.raw(
        `
        select username, title, booklist_creator_id, private from booklist
        inner join users on users.id = booklist_creator_id
         where booklist.id = ?
      `,
        [booklist_id],
      );
      return result.rows;
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async unfollowBooklist(userId: number, booklist_id: number) {
    try {
      await this.knex.raw(
        `
        delete from user_follow_booklist where user_id = ? and follow_booklist_id = ?
      `,
        [userId, booklist_id],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async removeBookFromBooklist(booklist_id: number, bookId: number) {
    try {
      await this.knex.raw(
        `
        delete from booklist_book where booklist_id = ? and book_id = ?
      `,
        [booklist_id, bookId],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async removeBooklist(booklist_id: number) {
    try {
      await this.knex.raw(
        `
      update booklist set active = false where booklist.id = ?
      `,
        [booklist_id],
      );
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }

  async updateBooklist(booklist_id: number, updated:UpdateBooklistDto) {
    try {
      const {title, privateStatus} = updated
      await this.knex('booklist').update({
        title: title,
        private:privateStatus
      }).where('id', booklist_id);
      return [{ status: 200, message: 'success' }];
    } catch (e) {
      this.logger.error(e);
      return [{ status: 400, message: 'internal Server Error' }];
    }
  }
}

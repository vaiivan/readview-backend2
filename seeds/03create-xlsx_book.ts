import { Logger } from '@nestjs/common';
import { Chance } from 'chance';
import { Knex } from 'knex';
import moment, { min } from 'moment';
import { workbookToJSON } from '../src/utilities/xlsx';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - xlsx_book');
moment().format();

interface Book {
  author: string;
  publisher: string;
  title: string;
  publish_date: Date;
  isbn: string;
  book_cover: string;
  genre: string;
}

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {

  // //-------------------------------------------------------------------------------------------
  // // functions
  // //-------------------------------------------------------------------------------------------

  // //function of checking the book if it exists in the database
  // async function checkingIfExists(type: string, value: string) {
  //   //settings
  //   let column;
  //   let table;

  //   //types and columns
  //   if (type == 'isbn') {
  //     column = 'isbn';
  //     table = 'book';
  //   } else if (type == 'author') {
  //     column = 'author_name';
  //     table = 'author';
  //   } else if (type == 'publisher') {
  //     column = 'publisher_name';
  //     table = 'publisher';
  //   } 

  //   //checking
  //   const result = await knex
  //     .select('id')
  //     .from(table)
  //     .where(column, '=', value);
  //   if (result.length != 0) {
  //     return result[0].id;
  //   } else {
  //     return false;
  //   }
  // }

  // //-------------------------------------------------------------------------------------------
  // // start
  // //-------------------------------------------------------------------------------------------

  // // convert xlsx into books
  // const books = (await workbookToJSON(
  //   './data/fake_books_in_print_raw_data.xlsx',
  //   'fake_books_in_print_raw_data',
  // )) as Book[];

  // //for Loop
  // for (const book of books) {
  //   logger.log(`start inserting ${book.title}`);
  //   let isbnResult = await checkingIfExists('isbn', book.isbn);
  //   if (isbnResult) {
  //     // select the genre id
  //     const genreResult = await knex
  //       .select('*')
  //       .from('genre')
  //       .where('genre_name', book.genre);

  //     if (genreResult.length == 0) {
  //       logger.error(
  //         `something wrong with isbn ${book.isbn} & book ${book.title}, genre is ${book.genre}`,
  //       );
  //     } else {
  //       const genreId = genreResult[0].id;
  //       // checking if book_genre relationship exits
  //       const result = await knex
  //         .select('*')
  //         .from('book_genre')
  //         .where('book_id', isbnResult)
  //         .where('genre_id', genreId);

  //       if (result.length == 0) {
  //         await knex('book_genre').insert({
  //           book_id: isbnResult,
  //           genre_id: genreId,
  //         });
  //       } else {
  //         continue;
  //       }
  //     }
  //   } else {
  //     // insert book
  //     const bookResult = await knex('book')
  //       .insert([
  //         {
  //           title: book.title,
  //           publish_date: moment(book.publish_date, 'DD/MM/YYYY').format(
  //             'YYYY/MM/DD',
  //           ),
  //           pages: chance.integer({ min: 100, max: 800 }),
  //           isbn: book.isbn,
  //           book_picture: book.book_cover,
  //           info: chance.paragraph({
  //             sentences: chance.integer({ min: 1, max: 4 }),
  //           }),
  //         },
  //       ])
  //       .returning('id');

  //     const bookId = bookResult[0].id;

  //     //insert user_book prefence
  //     const prefenceTimes = chance.integer({ min: 0, max: 60 });
  //     const mapping = [
  //       { status: 'read' },
  //       { status: 'reading' },
  //       { status: 'want to read' },
  //     ];

  //     for (let i = 0; i < prefenceTimes; i++) {

  //       let userId = chance.integer({ min: 1, max: 1001 })

  //       //check if the status exist
  //       const result = await knex
  //         .select('*')
  //         .from('user_book')
  //         .where('book_id', bookId)
  //         .where('user_id', userId);

  //         if (result.length != 0) {
  //           //skip
  //         } else {
  //           let status = mapping[chance.integer({ min: 0, max: 2 })].status;

  //           await knex('user_book').insert({
  //             user_id: userId,
  //             book_id: bookId,
  //             reading_status: status,
  //             rating: status == 'read' ? (chance.integer({ min: 1, max: 5 }))*2 : null,
  //             created_at: moment(
  //               chance.date({
  //                 year: chance.integer({ min: 2019, max: 2021 }),
  //                 string: true,
  //                 american: false,
  //               }),
  //               'DD/MM/YYYY',
  //             ).format('YYYY/MM/DD'),
  //           });
  //         }
  //     }

  //     //insert author
  //     let authorId = await checkingIfExists('author', book.author);

  //     if (!authorId) {
  //       let result = await knex('author')
  //         .insert({
  //           author_name: book.author,
  //           info: chance.sentence(),
  //         })
  //         .returning('id');

  //       authorId = result[0].id;
  //     }

  //     await knex('author_book').insert({
  //       author_id: authorId,
  //       book_id: bookId,
  //     });

  //     //insert publisher
  //     let publisherId = await checkingIfExists('publisher', book.publisher);

  //     if (!publisherId) {
  //       let result = await knex('publisher')
  //         .insert({
  //           publisher_name: book.publisher,
  //           info: chance.sentence(),
  //         })
  //         .returning('id');

  //       publisherId = result[0].id;
  //     }

  //     await knex('book_publisher').insert({
  //       publisher_id: publisherId,
  //       book_id: bookId,
  //     });

  //     //insert genres

  //     let genreResult = await knex
  //       .select('*')
  //       .from('genre')
  //       .where('genre_name', book.genre);

  //     if (genreResult.length == 0) {
  //       logger.error(
  //         `something wrong with isbn ${book.isbn} & book ${book.title}, genre is ${book.genre}`,
  //       );
  //     } else {
  //       let genreId = genreResult[0].id;

  //       await knex('book_genre').insert({
  //         book_id: bookId,
  //         genre_id: genreId,
  //       });
  //     }

  //     //insert quotes

  //     let quotesTimes = chance.integer({ min: 0, max: 5 });
  //     for (let i = 0; i < quotesTimes; i++) {
  //       let result = await knex('book_quote')
  //         .insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           book_id: bookId,
  //           content: chance.sentence({
  //             words: chance.integer({ min: 5, max: 15 }),
  //           }),
  //         })
  //         .returning('id');

  //       let quoteId = result[0].id;
  //       let likeTimes = chance.integer({ min: 0, max: 5 });

  //       for (let i = 0; i < likeTimes; i++) {
  //         let userId = chance.integer({ min: 1, max: 1001 });

  //         let result = await knex('user_quote')
  //           .select('*')
  //           .where('user_id', userId)
  //           .where('book_quote_id', quoteId);

  //         if (result.length != 0) {
  //           //skip
  //         } else {
  //           await knex('user_quote').insert({
  //             user_id: userId,
  //             book_quote_id: quoteId,
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

  // logger.log('inserted all xlsx book data');
}

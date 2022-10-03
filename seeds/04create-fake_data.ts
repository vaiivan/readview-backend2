import { Logger } from '@nestjs/common';
import Chance from 'chance';
import { Knex } from 'knex';
import moment from 'moment';
import jsonfile from 'jsonfile';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - fake_data');
moment().format();

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // //-------------------------------------------------------------------------------------------
  // // reviews
  // //-------------------------------------------------------------------------------------------

  // // get the raw data
  // const books = await jsonfile.readFile('./data/amazon_raw_data_20220906.json');

  // //start
  // for (const book of books) {
  //   try {
  //     //reviews
  //     let reviews = book.reviews;
  //     for (const review of reviews) {
  //       let result = await knex('book_review')
  //         .insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           book_id: chance.integer({ min: 1, max: 28564 }),
  //           content: review,
  //           private: chance.bool({ likelihood: 30 }),
  //           spoiler: chance.bool({ likelihood: 30 }),
  //           active: chance.bool({ likelihood: 80 }),
  //         })
  //         .returning('id');

  //       const reviewId = result[0].id;
  //       const commentTimes = chance.integer({ min: 0, max: 30 });

  //       //review's comment
  //       for (let i = 0; i < commentTimes; i++) {
  //         await knex('book_review_comment').insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           book_review_id: reviewId,
  //           content: chance.sentence({
  //             words: chance.integer({ min: 5, max: 13 }),
  //           }),
  //         });
  //       }

  //       const likeTimes = chance.integer({ min: 0, max: 200 });

  //       for (let i = 0; i < likeTimes; i++) {
  //         await knex('user_book_review').insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           book_review_id: reviewId,
  //           like: chance.bool({ likelihood: 99 }),
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     logger.error(e);
  //   }
  // }

  // logger.log('inserted all reviews');

  // //-------------------------------------------------------------------------------------------
  // // user_prefence
  // //-------------------------------------------------------------------------------------------

  // const prefenceTimes = 1000;

  // for (let i = 0; i < prefenceTimes; i++) {
  //   let userId = chance.integer({ min: 1, max: 1001 });
  //   let followId = chance.integer({ min: 1, max: 1001 });

  //   if (userId == followId) {
  //     //skip
  //   } else {
  //     let result = await knex('user_user')
  //       .select('id')
  //       .where(`to_be_followed_user_id`, followId)
  //       .where('follower_user_id', userId);

  //     if (result.length != 0) {
  //       //skip
  //     } else {
  //       await knex('user_user').insert({
  //         to_be_followed_user_id: followId,
  //         follower_user_id: userId,
  //       });
  //     }
  //   }

  //   userId = chance.integer({ min: 1, max: 1001 });
  //   let authorId = chance.integer({ min: 1, max: 11511 });

  //     let result = await knex('user_author')
  //       .select('id')
  //       .where(`author_id`, authorId)
  //       .where('user_id', userId);

  //     if (result.length != 0) {
  //       //skip
  //     } else {
  //       await knex('user_author').insert({
  //         user_id: userId,
  //         author_id: authorId,
  //       });
  //     }

  //   userId = chance.integer({ min: 1, max: 1001 });
  //   let genreId = chance.integer({ min: 1, max: 64 });

  //   result = await knex('user_genre_score')
  //     .select('*')
  //     .where('user_id', userId)
  //     .where('genre_id', genreId);

  //   if (result.length == 0) {
  //     await knex('user_genre').insert({
  //       user_id: userId,
  //       genre_id: genreId,
  //     });

  //     await knex('user_genre_score').insert({
  //       user_id: userId,
  //       genre_id: genreId,
  //       score: 1,
  //     });
  //   } else {
  //     let score = result[0].score;

  //     await knex('user_genre_score')
  //       .where('user_id', userId)
  //       .where('genre_id', genreId)
  //       .update('score', score + 1);
  //   }
  // }

  // logger.log('insert all user_prefence data');
}

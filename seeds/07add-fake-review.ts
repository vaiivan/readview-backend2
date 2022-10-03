import { Knex } from 'knex';
import { Chance } from 'chance';
import moment from 'moment';
import { Logger } from '@nestjs/common';

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - fake_data_booklist');
moment().format();

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // const bookNumber = 28564;
  // //start
  // for (let i = 1; i < bookNumber; i++) {

  //   const reviewNo = chance.integer({ min: 2, max: 7 });

  //   for (let j = 0; j < reviewNo; j++) {
  //     let result = await knex('book_review')
  //       .insert({
  //         user_id: chance.integer({ min: 1, max: 1001 }),
  //         book_id: i,
  //         content: chance.paragraph({
  //           sentences: chance.integer({ min: 4, max: 8 }),
  //         }),
  //         private: chance.bool({ likelihood: 30 }),
  //         spoiler: chance.bool({ likelihood: 30 }),
  //         active: chance.bool({ likelihood: 80 }),
  //       })
  //       .returning('id');

  //     const reviewId = result[0].id;
  //     const commentTimes = chance.integer({ min: 0, max: 5 });

  //     //review's comment
  //     for (let j = 0; j < commentTimes; j++) {
  //       await knex('book_review_comment').insert({
  //         user_id: chance.integer({ min: 1, max: 1001 }),
  //         book_review_id: reviewId,
  //         content: chance.sentence({
  //           words: chance.integer({ min: 5, max: 13 }),
  //         }),
  //       });
  //     }

  //     const likeTimes = chance.integer({ min: 0, max: 30 });

  //     for (let j = 0; j < likeTimes; j++) {
  //       await knex('user_book_review').insert({
  //         user_id: chance.integer({ min: 1, max: 1001 }),
  //         book_review_id: reviewId,
  //         like: chance.bool({ likelihood: 99 }),
  //       });
  //     }
  //   }
  //   logger.log(`${i} reviews added`);
  // }
  // logger.debug('extra reviews added');
}

import { Knex } from "knex";
import { Chance } from 'chance';
import moment from 'moment';
import jsonfile from 'jsonfile';
import { Logger } from "@nestjs/common";

//-------------------------------------------------------------------------------------------
// Settings
//-------------------------------------------------------------------------------------------

const chance = new Chance();
const logger = new Logger('seed file - fake_data_discussion');
moment().format();

//-------------------------------------------------------------------------------------------
// seed
//-------------------------------------------------------------------------------------------

export async function seed(knex: Knex): Promise<void> {
  // // get the raw data
  // const books = await jsonfile.readFile('./data/amazon_raw_data_20220906.json');

  // //start
  // for (const book of books) {
  //   try {
  //     //reviews
  //     let reviews = book.reviews;
  //     for (const review of reviews) {
  //       const result = await knex('discussion')
  //         .insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           title: review,
  //           info: chance.paragraph({sentences: chance.integer({min: 1, max: 4})}),
  //         })
  //         .returning('id');

  //       const discussionId = result[0].id;
  //       const commentTimes = chance.integer({ min: 0, max: 30 });

  //       //review's comment
  //       for (let i = 0; i < commentTimes; i++) {
  //         await knex('discussion_comment').insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           discussion_id: discussionId,
  //           content: chance.sentence({
  //             words: chance.integer({ min: 5, max: 13 }),
  //           }),
  //         });
  //       }

  //       const likeTimes = chance.integer({ min: 0, max: 50 });

  //       for (let i = 0; i < likeTimes; i++) {
  //         await knex('user_discussion').insert({
  //           user_id: chance.integer({ min: 1, max: 1001 }),
  //           discussion_id: discussionId,
  //         });
  //       }
  //     }
  //     logger.log('Disscussion added')
  //   } catch (e) {
  //     logger.error(e);
  //   }
  // }
};

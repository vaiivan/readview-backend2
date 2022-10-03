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
  //   // get the raw data
  //   const books = await jsonfile.readFile('./data/amazon_raw_data_20220906.json');
  //   const reviewNumbers = 133058;
  //   const insertingTimes = 33;
  //   let x = 1;
  //   //start
  //   //for Loop
  //   for (let i = 1; i < insertingTimes; i++) {
  //     for (const book of books) {
  //       let reviews = book.reviews;
  //       for (const review of reviews) {
  //         logger.log(`start inserting ${x}`);
  //         await knex('book_review')
  //           .update({
  //             content: review,
  //           })
  //           .where('id', x);
  //         x++
  //       }
  //     }
  //   }
  //   logger.log('inserted all reviews');
}

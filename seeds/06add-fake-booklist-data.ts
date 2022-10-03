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
  // const booklistNumber = 1000;
  // //start
  // for (let i = 0; i < booklistNumber; i++) {
  //   try {
  //     //booklist
  //     const result = await knex('booklist')
  //       .insert({
  //         booklist_creator_id: chance.integer({ min: 1, max: 1001 }),
  //         title: chance.sentence({ words: chance.integer({ min: 3, max: 6 }) }),
  //         private: false,
  //         active: true,
  //       })
  //       .returning('id');

  //     const booklistId = result[0].id;
  //     const bookNumber = chance.integer({ min: 1, max: 10 });

  //     //booklist-book
  //     for (let i = 0; i < bookNumber; i++) {
  //       let bookId = chance.integer({ min: 1, max: 28564 });
  //       let result = await knex('booklist_book')
  //         .select('id')
  //         .where('booklist_id', booklistId)
  //         .where('book_id', bookId);

  //       if (result.length != 0) {
  //         //skip
  //       } else {
  //         await knex('booklist_book').insert({
  //           booklist_id: booklistId,
  //           book_id: bookId,
  //         });
  //       }
  //     }

  //     //user_follow_booklist
  //     const likeTimes = chance.integer({ min: 0, max: 25 });

  //     for (let i = 0; i < likeTimes; i++) {
  //         let userId = chance.integer({min: 1, max: 1001})
  //         let result = await knex('user_follow_booklist')
  //         .select('id')
  //         .where('follow_booklist_id', booklistId)
  //         .where('user_id',userId);

  //         if(result.length != 0){
  //             //skip
  //         } else {
  //           await knex('user_follow_booklist').insert({
  //               follow_booklist_id: booklistId,
  //               user_id: userId,
  //             });
  //         }
  //     }
  //     logger.log('booklist added')
  //   } catch (e) {
  //     logger.error(e);
  //   }
  // }
}
